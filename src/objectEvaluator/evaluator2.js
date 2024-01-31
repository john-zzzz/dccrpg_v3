import { current } from '@reduxjs/toolkit';

export const deepFind = (object, propertyPath) => {
	if (Array.isArray(propertyPath)) {
		propertyPath = propertyPath.join('.');
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
						if (currentObject[itemKey][filterProperty] && currentObject[itemKey][filterProperty].toString() === filterValue.toString()) {
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
			currentObject = currentObject[Object.keys(currentObject)[property]];
		} else {
			return undefined;
		}
	}

	return currentObject;
};

export const evaluate = (object, referenceObjects, rootObject) => {
	rootObject = rootObject || object;
	let currentObject = object;
	referenceObjects = { ...rootObject, ...referenceObjects };

	for (let property in object) {
		if (typeof object[property] === 'object' && object[property] !== null) {
			evaluate(object[property], referenceObjects, rootObject);
		}
		if (!currentObject[property]) {
			continue;
		}
	}

	if (object._ref !== undefined) {
		object.value = deepFind(referenceObjects, object._ref);
	}

    if (object._default !== undefined) {
		if (object.value === undefined) {
			object.value = object._default.value || object._default;
		}
	}
	if (object._min != undefined) {
		object.value = Math.max(object._min, object.value);
	}

	if (object._max != undefined) {
		object.value = Math.min(object._max, object.value);
	}

	if (object._sum != undefined) {
		if (!Array.isArray(object._sum)) {
			throw new Error('The _sum property must be an array');
		}
		object.value = object._sum.reduce((acc, currentValue) => {
			if (currentValue.value) {
				if (Array.isArray(currentValue.value)) {
					acc += currentValue.value.reduce((a, b) => a + b, 0);
				} else {
					acc += currentValue.value;
				}
			} else {
				acc += currentValue;
			}
			return acc;
		}, 0);
	}
};
