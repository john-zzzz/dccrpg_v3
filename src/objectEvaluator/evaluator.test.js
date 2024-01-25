import { setValue, getValues } from './evaluator';

describe('setValue', () => {
	it('sets a "top level" value on the object', () => {
		const data = {
			status: 'active'
		};

		setValue(data, 'status', 'inactive');
		expect(data.status).toBe('inactive');
	});

	it('sets a "lower level" value on the object', () => {
		const data = {
			current: {
				status: 'active'
			}
		};

		setValue(data, 'current.status', 'inactive');
		expect(data.current.status).toBe('inactive');
	});

	it('creates a shallow property if it doesnt exist on the object', () => {
		const data = {
			employee: {}
		};

		setValue(data, 'employee.status', 'active');
		expect(data.employee.status).toBe('active');
	});

	it('creates a deep property if it doesnt exist on the object', () => {
		const data = {
			employee: {}
		};

		setValue(data, 'employee.address.line1', '123 Main St');
		expect(data.employee.address.line1).toBe('123 Main St');
	});
});

describe('getValues refs', () => {
	it('get a "ref" value on the same object with a propertyPath', () => {
		const data = {
			employee: { state: { ref: { propertyPath: 'states.ma' } } },
			states: { ma: { name: 'Massachusetts' } }
		};

		getValues(data);
		expect(data.employee.state.name).toBe('Massachusetts');
	});

	it('get a "ref" value on the same object with a propertyPath that is an array', () => {
		const data = {
			employee: { state: { ref: { propertyPath: ['states', 'ma'] } } },
			states: { ma: { name: 'Massachusetts' } }
		};

		getValues(data);
		expect(data.employee.state.name).toBe('Massachusetts');
	});

	// it('get a "ref" value on the same object with a propertyPath that is an array with refs', () => {
	// 	const data = {
	// 		employee: { state: { ref: { propertyPath: ['states.ref.value', {clone: {propertyPath: 'employee.stateCode'}}] } }, 
	// 		stateCode: 'ma' 
	// 	},
	// 		states: { ma: { name: 'Massachusetts' } }
	// 	};

	// 	getValues(data);
	// 	expect(data.employee.state.name).toBe('Massachusetts');
	// });

	it('get a "ref" value on a reference object', () => {
		const data = {
			employee: { state: { ref: { propertyPath: 'states.ma' } } }
		};
		const referenceObjects = {
			states: { ma: { name: 'Massachusetts' } }
		};

		getValues(data, referenceObjects);
		expect(data.employee.state.name).toBe('Massachusetts');
		expect(data.states).toBeUndefined();
	});

	it('get an array "ref" value if the propertyPath is an array', () => {
		const data = {
			employee: { state: { ref: { propertyPath: 'states' } } }
		};
		const referenceObjects = {
			states: [{ name: 'Massachusetts' }, { name: 'New Hampshire' }]
		};

		getValues(data, referenceObjects);
		expect(data.employee.state[0].name).toBe('Massachusetts');
		expect(data.employee.state[1].name).toBe('New Hampshire');
	});

	it('get an array "ref" value if the propertyPath is an array with an array property', () => {
		const data = {
			employee: { state: { ref: { propertyPath: 'states.[].name' } } }
		};
		const referenceObjects = {
			states: [{ name: 'Massachusetts' }, { name: 'New Hampshire' }]
		};

		getValues(data, referenceObjects);
		expect(data.employee.state[0]).toBe('Massachusetts');
		expect(data.employee.state[1]).toBe('New Hampshire');
	});

	it('get a property on a "ref" value on a reference object', () => {
		const data = {
			employee: { state: { ref: { propertyPath: 'states.ma.name.full' } } }
		};
		const referenceObjects = {
			states: { ma: { name: { full: 'Massachusetts', short: 'Mass' } } }
		};

		getValues(data, referenceObjects);
		expect(data.employee.state.value).toBe('Massachusetts');
		expect(data.states).toBeUndefined();
	});

	it('gets a "ref" value on the object using an array reference on a referece array', () => {
		const data = {
			employee: { state: { ref: { propertyPath: 'states.1' } } }
		};
		const referenceObjects = {
			states: [{ name: 'Massachusetts' }, { name: 'New Hampshire' }]
		};
		getValues(data, referenceObjects);
		expect(data.employee.state.name).toBe('New Hampshire');
	});

	it('gets a "ref" value on the object using an array reference on a referece object', () => {
		const data = {
			employee: { state: { ref: { propertyPath: 'states.1' } } }
		};
		const referenceObjects = {
			states: { ma: { name: 'Massachusetts' }, nh: { name: 'New Hampshire' } }
		};

		getValues(data, referenceObjects);
		expect(data.employee.state.name).toBe('New Hampshire');
	});

	it('gets a nested "ref" value on the object', () => {
		const data = {
			employee: { state: { ref: { propertyPath: 'states.ma' } } },
			states: {
				ma: { name: 'Massachusetts', region: { ref: { propertyPath: 'regions.northeast' } } },
				ca: { name: 'California', region: { ref: { propertyPath: 'regions.westcoast' } } }
			},
			regions: { northeast: { name: 'North East' }, westcoast: { name: 'West Coast' } }
		};

		getValues(data);
		expect(data.employee.state.region.name).toBe('North East');
	});

	it('generates a warning and does not set a value if the ref does not have a propertyPath', () => {
		const data = {
			employee: { state: { ref: {} } }
		};
		getValues(data);
		expect(data.employee.state).toStrictEqual({ ref: {} });
	});
	it('generates a warning and does not set a value if the reference object does not exist', () => {
		const data = {
			employee: { state: { ref: { propertyPath: 'states.nh' } } }
		};
		getValues(data);
		expect(data.employee.state).toStrictEqual({ ref: { propertyPath: 'states.nh' }});
	});

	it('generates a warning and does not set a value if the key on the reference object does not exist', () => {
		const data = {
			employee: { state: { ref: { propertyPath: 'states.nh' } } },
			states: { ma: { name: 'Massachusetts' } }
		};
		getValues(data);
		expect(data.employee.state).toStrictEqual({ ref: { propertyPath: 'states.nh' }});
	});
});

describe('getValues clones', () => {
	it('get a "clone" value on the same object', () => {
		const data = {
			employee: { state: { clone: { propertyPath: 'states.ma' } } },
			states: { ma: { name: 'Massachusetts' } }
		};

		getValues(data);
		expect(data.employee.state.name).toBe('Massachusetts');
	});
});

describe('getValues sum', () => {
	it('adds a ref values to a number', () => {
		const data = {
			employee: { level: { sum: [{ ref: { propertyPath: 'values.2.value' } }, 1] } },
			values: { 1: { value: 10 }, 2: { value: 20 } }
		};
		getValues(data);
		expect(data.employee.level.sum.value).toBe(21);
	});

	it('adds referenced propertyPath values if the ref is an array', () => {
		const data = {
			employee: { level: { sum: [{ ref: { propertyPath: 'values.[].value' } }] } },
			values: [{ value: 10 }, { value: 20 }]
		};
		getValues(data);
		expect(data.employee.level.sum.value).toBe(30);
	});

	it('adds referenced propertyPath values if the ref is an array and the array property is a path', () => {
		const data = {
			employee: { level: { sum: [{ ref: { propertyPath: 'values.[].value.subvalue' } }] } },
			values: [{ value: { subvalue: 10 } }, { value: { subvalue: 20 } }]
		};
		getValues(data);
		expect(data.employee.level.sum.value).toBe(30);
	});
});

describe('getValues mult', () => {
	it('multiplies a ref values to a number', () => {
		const data = {
			employee: { level: { mult: [{ ref: { propertyPath: 'values.2.value' } }, 2] } },
			values: { 1: { value: 10 }, 2: { value: 20 } }
		};

		getValues(data);
		expect(data.employee.level.mult.value).toBe(40);
	});

	it('multiplies referenced propertyPath values if the ref is an array', () => {
		const data = {
			employee: { level: { mult: [{ ref: { propertyPath: 'values.[].value' } }] } },
			values: [{ value: 20 }, { value: 30 }]
		};
		getValues(data);
		expect(data.employee.level.mult.value).toBe(600);
	});

	it('multiplies referenced propertyPath values if the ref is an array and the array property is a path', () => {
		const data = {
			employee: { level: { mult: [{ ref: { propertyPath: 'values.[].value.subvalue' } }] } },
			values: [{ value: { subvalue: 10 } }, { value: { subvalue: 20 } }]
		};
		getValues(data);
		expect(data.employee.level.mult.value).toBe(200);
	});
});


