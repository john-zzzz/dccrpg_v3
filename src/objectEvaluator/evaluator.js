import { current } from '@reduxjs/toolkit';

export const setValue = (object, propertyPath, value, referenceObjects) => {
	const properties = propertyPath.split('.');
	let currentObject = object;

	let previousObject = JSON.parse(JSON.stringify(currentObject));

	for (let i = 0; i < properties.length - 1; i++) {
		const property = properties[i];
		previousObject = JSON.parse(JSON.stringify(currentObject));
		if (property === 'value' && properties[i - 1] && properties[i - 1] === 'ref') {
			console.info(
				`Value "${value}" at "${propertyPath}" cannot be set because it is a ref.  If you want to update values on a referenced object, clone it instead.`
			);
			continue;
		}
		if (!currentObject[property]) currentObject[property] = {};
		currentObject = currentObject[property];
	}

	const lastProperty = properties[properties.length - 1];

	if (currentObject.clone) {
		currentObject._values = currentObject._values || {};
		currentObject._values[lastProperty] = value;
	} else {
		currentObject[lastProperty] = value;
	}
};

export const getProperty = (object, propertyPath) => {
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
		} else if (property === '[]') {
			let arrayProperties = properties.slice(++i, properties.length);

			if (Array.isArray(currentObject)) {
				currentObject = currentObject.map((arrayItem) => {
					return getProperty(arrayItem, arrayProperties.join('.'));
				});
			} else {
				currentObject = Object.keys(currentObject).map((itemKey) => {
					return getProperty(currentObject[itemKey], arrayProperties.join('.'));
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

export const getValues = (object, referenceObjects, rootObject) => {
	rootObject = rootObject || object;
	let currentObject = object;
	referenceObjects = { ...rootObject, ...referenceObjects };

	for (let property in object) {
		if (typeof object[property] === 'object' && object[property] !== null) {
			getValues(object[property], referenceObjects, rootObject);
		}
		if (!currentObject[property]) {
			continue;
		}

		currentObject = currentObject[property];
		//TODO: need to figure out how to clear out properties when we're evaluating a [].  Once it's set once, it's "sticking"
		if (object.ref || object.clone || object.copy) {
			if (currentObject.propertyPath) {
				let refValues;
				if (Array.isArray(currentObject.propertyPath)) {
					let evaluatedPathParts = [];
					currentObject.propertyPath.forEach((pathPart) => {
						evaluatedPathParts.push(pathPart.value !== undefined ? pathPart.value : pathPart);
					});
					refValues = getProperty(referenceObjects, evaluatedPathParts.join('.'));
				} else {
					refValues = getProperty(referenceObjects, currentObject.propertyPath);
				}
				getValues(refValues, referenceObjects, rootObject);
				if (refValues === undefined) {
					continue;
				}

				if (typeof refValues === 'string' || typeof refValues === 'number') {
					refValues = { value: refValues };
				}

				if (object.ref) {
					Object.keys(refValues).forEach((refValuesKey) => {
						object[refValuesKey] = refValues[refValuesKey];
					});
				}
				if (object.clone) {
					object.clone._values = {};
					//TODO: Clone is bronen somehow.  It's acting like a ref.
					// Object.keys(object).forEach((objectKey) => {
					// 	if (objectKey === 'clone') return;
					// 	delete object[objectKey];
					// });
					Object.keys(refValues).forEach((refValueKey) => {
						object.clone._values[refValueKey] = refValues[refValueKey];
						if (object._values && object._values[refValueKey]) {
							object[refValueKey] = object._values[refValueKey];
						} else {
							object[refValueKey] = refValues[refValueKey];
						}
					});
				}

				if (object.copy) {
					delete object.copy;
					Object.keys(refValues).forEach((refValueKey) => {
						object[refValueKey] = refValues[refValueKey];
					});
				}
			} else {
				// console.info(`"ref" does not have a propertyPath.  Inspect "${JSON.stringify(referenceObjects)}" for a "ref" property without a "propertyPath" value.`);
			}
		} else if (object.sum || object.sumClone) {
			if (property === 'sumClone' && object.value) continue;

			object.value = 0;
			currentObject.forEach((sumObject) => {
				if (typeof sumObject === 'number') {
					object.value += sumObject;
				} else if (sumObject.value && typeof sumObject.value === 'number') {
					object.value += sumObject.value;
				} else if (typeof sumObject === 'object') {
					Object.keys(sumObject).forEach((sumObjectKey) => {
						if (typeof sumObject[sumObjectKey] === 'number') {
							object.value += sumObject[sumObjectKey];
						} else if (sumObject[sumObjectKey] !== undefined && sumObject[sumObjectKey].value && typeof sumObject[sumObjectKey].value === 'number') {
							object.value += sumObject[sumObjectKey].value;
						}
					});
				}
			});
		} else if (object.mult) {
			currentObject.value = 1;
			currentObject.forEach((sumObject) => {
				if (typeof sumObject === 'number') {
					currentObject.value *= sumObject;
				} else if (sumObject.value && typeof sumObject.value === 'number') {
					currentObject.value *= sumObject.value;
				} else if (typeof sumObject === 'object') {
					Object.keys(sumObject).forEach((sumObjectKey) => {
						if (typeof sumObject[sumObjectKey] === 'number') {
							currentObject.value *= sumObject[sumObjectKey];
						} else if (sumObject[sumObjectKey].value && typeof sumObject[sumObjectKey].value === 'number') {
							currentObject.value *= sumObject[sumObjectKey].value;
						}
					});
				}
			});
		}
	}
};
