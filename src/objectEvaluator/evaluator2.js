export const deepFind = (object, propertyPath) => {
	if (Array.isArray(propertyPath)) {
		propertyPath = propertyPath.join('.');
	}
	if (typeof propertyPath !== 'string') {
		console.error('Property path must be a string. Received: "', propertyPath, '" of type "', typeof propertyPath, '"');
		return undefined;
	}
	const properties = propertyPath.split('.');
	let currentObject = object;

	for (let i = 0; i < properties.length; i++) {
		const property = properties[i];

		if (!currentObject) {
			// console.info(`Property "${propertyPath}" does not exist on object "${JSON.stringify(object)}".`);
			return undefined;
		}

		if (currentObject.hasOwnProperty(property)) {
			currentObject = currentObject[property];
		} else if (property.startsWith('[') && property.endsWith(']') && property.length > 2) {
			// value.[property=abc].otherProperty
			const [filterProperty, filterValue] = property.substring(1, property.length - 1).split('=');
			if (filterProperty && filterValue) {
				let arrayProperties = properties.slice(++i, properties.length);

				if (Array.isArray(currentObject)) {
					currentObject = currentObject.map((arrayItem) => {
						return deepFind(arrayItem, arrayProperties.join('.'));
					});
				} else {
					currentObject = Object.keys(currentObject).map((itemKey) => {
						// TODO: we can use getProperty on currentObject[itemKey][filterProperty] to support deeper properties
						if (
							currentObject[itemKey] &&
							currentObject[itemKey][filterProperty] &&
							currentObject[itemKey][filterProperty].toString() === filterValue.toString()
						) {
							return deepFind(currentObject[itemKey], arrayProperties.join('.'));
						}
					});
					currentObject = currentObject.filter((item) => item !== undefined);
				}
			}
		} else if (property === '[]') {
			let arrayProperties = properties.slice(++i, properties.length);

			if (Array.isArray(currentObject)) {
				currentObject = currentObject.map((arrayItem) => {
					return deepFind(arrayItem, arrayProperties.join('.'));
				});
			} else {
				currentObject = Object.keys(currentObject).map((itemKey) => {
					return deepFind(currentObject[itemKey], arrayProperties.join('.'));
				});
			}

			if (arrayProperties.length > 1) break;
		} else if (typeof currentObject === 'object' && !isNaN(property)) {
			//Selector is an index into an object.  Return the value of the object at that index.
			let key = Object.keys(currentObject)[property];
			currentObject = key && currentObject[key];
		} else {
			return undefined;
		}
	}

	return currentObject;
};

export const deepCopy = (object) => {
	return typeof object === 'object' ? JSON.parse(JSON.stringify(object)) : object;
};

export const evaluate = (object, referenceObjects, rootObject) => {
	let evaluated = _evaluate(object, referenceObjects, rootObject);
	let cleaned = _clean(evaluated);
	return cleaned;
};

export const setValue = (model, propertyPath, value) => {
	if (propertyPath === undefined) return model;

	let propertyPathParts = propertyPath.split('.');
	if (propertyPathParts.length === 1) {
		model[propertyPath] = value;
	} else {
		let parentProperty = deepFind(model, propertyPathParts.slice(0, -1));
		if (!parentProperty) {
			let bit;
			propertyPathParts.slice(0, -1).forEach((property) => {
				bit = bit || model;
				if (!bit[property]) {
					bit[property] = {};
				}
				bit = bit[property];
			});
			parentProperty = deepFind(model, propertyPathParts.slice(0, -1));

			// console.warn(`Property "${propertyPathParts.slice(0, -1).join('.')}" does not exist on object "${JSON.stringify(model)}".`);
			// return model;
		}
		parentProperty[propertyPathParts.slice(-1)] = value;
	}
	return model;
};

const deepMerge = (target, source) => {
	for (const key in source) {
		if (source.hasOwnProperty(key)) {
			const value = source[key];

			if (typeof value === 'object' && typeof target[key] === 'object') {
				target[key] = deepMerge(target[key], value);
			} else {
				if (target[key] === undefined) target[key] = value;
			}
		}
	}

	return target;
};
const _clean = (object) => {
	if (object === undefined) return undefined;

	for (let property in object) {
		if (typeof object[property] === 'object') {
			object[property] = _clean(object[property]);
		}
		if (property === '_value') {
			if (typeof object._value === 'object') {
				object = deepMerge(object, object._value);
			} else {
				if (!isEmptyObject(object._value)) {
					object = object._value;
				}
			}
		}
		if (property.startsWith('_')) {
			if (object !== undefined) delete object[property];
		}
	}

	return object;
};

export const _evaluate = (object, referenceObjects, rootObject) => {
	if (isEmptyObject(object)) {
		return undefined;
	}
	rootObject = rootObject || object;
	referenceObjects = { ...object, ...referenceObjects };

	for (let property in object) {
		if (typeof object[property] === 'object' && object[property] !== null) {
			evaluate(object[property], referenceObjects, object);
		}
		if (!object[property]) {
			continue;
		}
	}

	if (object._resetAttributes) {
		if (typeof object === 'object') {
			Object.keys(object).forEach((valueKey) => {
				if (!valueKey.startsWith('_')) {
					delete object[valueKey];
				}
			});
		}
	}

	if (object._ref !== undefined) {
		object._value = evaluate(deepFind(referenceObjects, object._ref), referenceObjects, rootObject);
	}

	if (object._sum != undefined) {
		if (!Array.isArray(object._sum)) {
			throw new Error('The _sum property must be an array');
		}
		object._value = object._sum.reduce((acc, currentValue) => {
			if (currentValue) {
				if (currentValue._value) {
					if (Array.isArray(currentValue._value)) {
						acc += currentValue._value.reduce((a, b) => a + b, 0);
					} else {
						acc += currentValue._value;
					}
				} else if (!isNaN(currentValue)) {
					acc += currentValue;
				}
			}
			return acc;
		}, 0);
	}

	if (object._default !== undefined) {
		if (object._value === undefined) {
			object._value = object._default._value || object._default;
		}
	}
	if (object._min != undefined) {
		object._value = Math.max(object._min && (object._min._value || object._min), object._value);
	}

	if (object._max != undefined) {
		object._value = Math.min(object._max && (object._max._value || object._max), object._value);
	}

	if (object._first != undefined) {
		if (Array.isArray(object._first)) {
			object._value = object._first.find((value) => {
				return value !== undefined && isEmptyObject(value) === false;
			});
		} else if (typeof object._first === 'object') {
			let evalObject = objectToArray(object._first);
			// if (evalObject.length > 0) {
				object._value = evalObject.find((value) => value !== undefined);
			// }
		} else {
			console.warn('The "_first" property must be an array');
		}
	}

	return object;
};
const objectToArray = (object) => {
	let array = [];
	for (let key in object) {
		array.push(object[key]);
	}
	return array;
};

const isEmptyObject = (object) => {
	if (object === undefined) return true;
	if (object === null) return true;
	return typeof object === 'object' && Object.keys(object).length === 0;
};
