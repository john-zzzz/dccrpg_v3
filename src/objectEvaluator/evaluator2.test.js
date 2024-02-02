import { evaluate, setValue } from './evaluator2';

describe('setValue', () => {
	it('sets a _ref value on the model', () => {
		let model = {
			employee: { state: { _ref: 'states.ma' } },
			states: { ma: { name: 'Massachusetts' }, nh: { name: 'New Hampshire' } }
		};

		model = setValue(model, 'employee.state._ref', 'states.nh');

		let values = evaluate(model);

		expect(values.employee.state.name).toBe('New Hampshire');
	});

	it('sets a "pure" value on the model', () => {
		let model = {
			employee: { state: { _ref: 'states.ma' } },
			states: { ma: { name: 'Massachusetts' }, nh: { name: 'New Hampshire' } }
		};

		model = setValue(model, 'employee.state', { name: 'Maine' });

		let values = evaluate(model);

		expect(values.employee.state.name).toBe('Maine');
	});
});
describe('evaluate _ref', () => {
	it('get a "_ref" value on the same object', () => {
		const model = {
			employee: { state: { _ref: 'states.ma' } },
			states: { ma: { name: 'Massachusetts' } }
		};

		let values = evaluate(model);
		expect(values.employee.state.name).toBe('Massachusetts');
		expect(values.employee.state._ref).not.toBeDefined();
	});

	it('get a "_ref" value on a reference object', () => {
		const data = {
			employee: { state: { _ref: 'states.ma' } }
		};
		const referenceObjects = {
			states: { ma: { name: 'Massachusetts' } }
		};

		let values = evaluate(data, referenceObjects);
		expect(values.employee.state.name).toBe('Massachusetts');
	});
});

describe('evaluate _sum', () => {
	it('sets the value to the _min if the value is more than min', () => {
		const model = { min: { _sum: [10], _min: 20 } };

		let values = evaluate(model);
		expect(values.min).toBe(20);
	});

	it('keeps the value to the _min if the value is less than min', () => {
		const model = { min: { _sum: [20], _min: 10 } };

		let values = evaluate(model);
		expect(values.min).toBe(20);
	});
});

describe('evaluate _first', () => {
	it('sets the value to the first value that is not undefined', () => {
		const model = {first: { _first: [undefined, 10, 20] } };

		let values = evaluate(model);
		expect(values.first).toBe(10);
	});
});

// describe('evaluate _clone', () => {
// 	it('get a "_clone" value on the same object', () => {
// 		const data = {
// 			employee: { state: { _clone: 'states.ma' } },
// 			states: { ma: { name: 'Massachusetts' } }
// 		};

// 		let values = evaluate(data);
// 		expect(values.employee.state.name).toBe('Massachusetts');
// 	});
// });

// describe('evaluate _default', () => {
// 	it('get a "_default" value if there is no value on the object', () => {
// 		const data = {
// 			employee: { state: { _ref: 'states.ma', _default: { code: 'nh', name: 'New Hampshire' } } }
// 			// states: { ma: { name: 'Massachusetts' } }
// 		};

// 		evaluate(data);
// 		expect(data.employee.state.name).toBe('New Hampshire');
// 	});

// 	it('get a "_ref" value when a default is defined, but the _ref is valid', () => {
// 		const data = {
// 			employee: { state: { _ref: 'states.ma', _default: { code: 'nh', name: 'New Hampshire' } } },
// 			states: { ma: { name: 'Massachusetts' } }
// 		};

// 		evaluate(data);
// 		expect(data.employee.state.name).toBe('Massachusetts');
// 	});

// 	it('get a "_default" value if there is no value on the object and the default is a _ref', () => {
// 		const data = {
// 			employee: { state: { _ref: 'states.ma', _default: { _ref: 'states.nh' } } },
// 			states: {
// 				// ma: { name: 'Massachusetts' }
// 				nh: { name: 'New Hampshire' }
// 			}
// 		};

// 		evaluate(data);
// 		expect(data.employee.state.name).toBe('New Hampshire');
// 	});

it('keeps the value if it is set', () => {
	const data = {
		employee: { state: { _default: { _ref: 'states.nh' } } },
		states: {
			nh: { name: 'New Hampshire' }
		}
	};

	evaluate(data);

	data.employee.state = { name: 'Massachusetts' };

	evaluate(data);

	expect(data.employee.state.name).toBe('Massachusetts');
});

it('keeps a deep value if it is set', () => {
	const data = {
		employee: { state: { _default: { _ref: 'states.nh' } } },
		states: {
			nh: { name: 'New Hampshire', code: 'NH' }
		}
	};

	evaluate(data);

	data.employee.state.name = 'Massachusetts';

	evaluate(data);

	expect(data.employee.state.name).toBe('Massachusetts');
	expect(data.employee.state.code).toBe('NH');
});
// });

// describe('evaluate _min', () => {
// 	it('sets the value to a min value if the value is more than the min specified', () => {
// 		const data = {
// 			employee: { salary: { _ref: 'proposedSalary', _min: 200 } },
// 			proposedSalary: 100
// 		};

// 		evaluate(data);
// 		expect(data.employee.salary.value).toBe(200);
// 	});

// 	it('keeps the value if the value is less than the min specified', () => {
// 		const data = {
// 			employee: { salary: { _ref: 'proposedSalary', _min: 100 } },
// 			proposedSalary: 200
// 		};

// 		evaluate(data);
// 		expect(data.employee.salary.value).toBe(200);
// 	});
// });

// describe('evaluate _max', () => {
// 	it('sets the value to a max value if the value is more than the max specified', () => {
// 		const data = {
// 			employee: { salary: { _ref: 'proposedSalary', _max: 200 } },
// 			proposedSalary: 300
// 		};

// 		evaluate(data);
// 		expect(data.employee.salary.value).toBe(200);
// 	});

// 	it('keeps the value if the value is less than the max specified', () => {
// 		const data = {
// 			employee: { salary: { _ref: 'proposedSalary', _max: 100 } },
// 			proposedSalary: 200
// 		};

// 		evaluate(data);
// 		expect(data.employee.salary.value).toBe(100);
// 	});
// });

// describe('evaluate _sum', () => {
// 	it('sets the value sum of the values passed to _sum', () => {
// 		const data = {
// 			employee: { totalHours: { _sum: [1, 2, 3] } }
// 		};

// 		evaluate(data);
// 		expect(data.employee.totalHours.value).toBe(6);
// 	});
// 	it('sets the value sum of the values in the ref object', () => {
// 		const data = {
// 			employee: { totalHours: { _sum: [{ _ref: 'time' }] } },
// 			time: [1, 2, 3]
// 		};

// 		evaluate(data);
// 		expect(data.employee.totalHours.value).toBe(6);
// 	});

// 	it('sets the value sum of the values in the ref object and any other values', () => {
// 		const data = {
// 			employee: { totalHours: { _sum: [{ _ref: 'time' }, 4, 5, 6] } },
// 			time: [1, 2, 3]
// 		};

// 		evaluate(data);
// 		expect(data.employee.totalHours.value).toBe(21);
// 	});

// 	it('sets the value sum of the values if there are multiple refs', () => {
// 		const data = {
// 			employee: { totalHours: { _sum: [{ _ref: 'week1.[].hours' }, { _ref: 'week2.[].hours' }] } },
// 			week1: [{ hours: 1 }, { hours: 2 }, { hours: 3 }],
// 			week2: [{ hours: 4 }, { hours: 5 }, { hours: 6 }]
// 		};

// 		evaluate(data);
// 		expect(data.employee.totalHours.value).toBe(21);
// 	});

// 	it('sets the value sum of the values if the ref is to an object, not an array', () => {
// 		const data = {
// 			employee: { totalHours: { _sum: [{ _ref: 'week1.[].hours' }] } },
// 			week1: { mon: { hours: 1 }, tue: { hours: 2 }, weds: { hours: 3 } }
// 		};

// 		evaluate(data);
// 		expect(data.employee.totalHours.value).toBe(6);
// 	});
// });
