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
		} else if (property.startsWith('[') && property.endsWith(']') && property.length > 2) {
			// value.[property=abc].otherProperty
			const [filterProperty, filterValue] = property.substring(1, property.length - 1).split('=');
			if (filterProperty && filterValue) {
				let arrayProperties = properties.slice(++i, properties.length);

				if (Array.isArray(currentObject)) {
					currentObject = currentObject.map((arrayItem) => {
						return getProperty(arrayItem, arrayProperties.join('.'));
					});
				} else {
					currentObject = Object.keys(currentObject).map((itemKey) => {
						if (currentObject[itemKey][filterProperty] && currentObject[itemKey][filterProperty].toString() === filterValue.toString()) {
							return getProperty(currentObject[itemKey], arrayProperties.join('.'));
						}
					});
				}
			}
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
		if (object.ref || object.clone || object.copy) {
			currentObject = object.ref || object.clone || object.copy;

			if (currentObject.propertyPath) {
				let refValues;
				let skip = false;

				if (Array.isArray(currentObject.propertyPath)) {
					let evaluatedPathParts = [];
					currentObject.propertyPath.forEach((pathPart) => {
						evaluatedPathParts.push(pathPart.value !== undefined ? pathPart.value : pathPart);
					});
					refValues = getProperty(referenceObjects, evaluatedPathParts.join('.'));
				} else {
					refValues = getProperty(referenceObjects, currentObject.propertyPath);
				}

				if (refValues !== undefined) refValues = JSON.parse(JSON.stringify(refValues));
				getValues(refValues, referenceObjects, rootObject);
				if (refValues === undefined) {
					skip = true;
				}

				if (!skip) {
					if (typeof refValues === 'string' || typeof refValues === 'number') {
						refValues = { value: refValues };
					}

					if (object.ref) {
						Object.keys(object).forEach((objectKey) => {
							if (objectKey === 'ref') return;
							delete object[objectKey];
						});

						if (!refValues) skip = true;
						if (!skip) {
							Object.keys(refValues).forEach((refValuesKey) => {
								if (refValues[refValuesKey] === null || refValues[refValuesKey] === undefined) return;
								object[refValuesKey] = refValues[refValuesKey];
							});
						}
					}
					if (object.clone) {
						object.clone._values = {};
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
						Object.keys(refValues).forEach((refValueKey) => {
							object[refValueKey] = refValues[refValueKey];
						});
					}
				}

				if (object.copy) {
					delete object.copy;
				}
			} else {
				// console.info(`"ref" does not have a propertyPath.  Inspect "${JSON.stringify(referenceObjects)}" for a "ref" property without a "propertyPath" value.`);
			}
		} else if (object.sum) {
			object.value = 0;
			object.sum.forEach((sumObject) => {
				if (!isNaN(sumObject)) {
					object.value += parseInt(sumObject);
				} else if (sumObject.value && !isNaN(sumObject)) {
					object.value += parseInt(sumObject.value.value);
				} else if (typeof sumObject === 'object') {
					Object.keys(sumObject).forEach((sumObjectKey) => {
						if (!isNaN(sumObject[sumObjectKey])) {
							object.value += parseInt(sumObject[sumObjectKey]);
						} else if (sumObject[sumObjectKey] !== undefined && sumObject[sumObjectKey].value && !isNaN(sumObject[sumObjectKey].value)) {
							object.value += parseInt(sumObject[sumObjectKey].value);
						}
					});
				}
			});
		} else if (object.sumClone) {
			if (object.value) continue;

			object.value = 0;
			object.sumClone.forEach((sumObject) => {
				if (!isNaN(sumObject)) {
					object.value += parseInt(sumObject);
				} else if (sumObject.value && !isNaN(sumObject.value)) {
					object.value += parseInt(sumObject.value);
				} else if (typeof sumObject === 'object') {
					Object.keys(sumObject).forEach((sumObjectKey) => {
						if (!isNaN(sumObject[sumObjectKey])) {
							object.value += parseInt(sumObject[sumObjectKey]);
						} else if (sumObject[sumObjectKey] !== undefined && sumObject[sumObjectKey].value && !isNaN(sumObject[sumObjectKey].value)) {
							object.value += parseInt(sumObject[sumObjectKey].value);
						}
					});
				}
			});
		} else if (object.mult) {
			object.value = 0;
			object.sum.forEach((sumObject) => {
				if (!isNaN(sumObject)) {
					object.value *= parseInt(sumObject);
				} else if (sumObject.value && !isNaN(sumObject.value)) {
					object.value *= parseInt(sumObject.value);
				} else if (typeof sumObject === 'object') {
					Object.keys(sumObject).forEach((sumObjectKey) => {
						if (!isNaN(sumObject[sumObjectKey])) {
							object.value *= parseInt(sumObject[sumObjectKey]);
						} else if (sumObject[sumObjectKey] !== undefined && sumObject[sumObjectKey].value && !isNaN(sumObject[sumObjectKey].value)) {
							object.value *= parseInt(sumObject[sumObjectKey].value);
						}
					});
				}
			});
		} else if (object.rangeLimit) {
			let value = object.value !== undefined ? object.value : extractEvalValue(object, 'rangeLimit');
			let min = extractEvalValue(object.rangeLimit, 'min');
			let max = extractEvalValue(object.rangeLimit, 'max');

			if (!isNaN(value)) {
				value = parseInt(value);
			} else continue; //TODO: Warning

			if (!isNaN(min)) {
				min = parseInt(min);
			}

			if (!isNaN(max)) {
				max = parseInt(max);
			}

			object.value = value;
			if (min != undefined && value <= min) object.value = min;
			if (max != undefined && value >= max) object.value = max;
		}

		// TODO: minLimit has generic code to get the value.  Refactor the rest of the "math-y" code to use it.
		// } else if (object.minLimit || object.maxLimit) {
		// 	let evalObject = object.minLimit || object.maxLimit;
		// 	evalObject.forEach((evalValue) => {
		// 		let value;
		// 		if (!isNaN(evalValue)) {
		// 			value = parseInt(evalValue);
		// 		} else if (evalValue.value && !isNaN(evalValue.value)) {
		// 			value = parseInt(evalValue.value);
		// 		} else if (typeof evalValue === 'object') {
		// 			Object.keys(evalValue).forEach((evalValueKey) => {
		// 				if (!isNaN(evalValue[evalValueKey])) {
		// 					value = parseInt(evalValue[evalValueKey]);
		// 				} else if (evalValue[evalValueKey] !== undefined && evalValue[evalValueKey].value && !isNaN(evalValue[evalValueKey].value)) {
		// 					value = parseInt(evalValue[evalValueKey].value);
		// 				}
		// 			});
		// 		}

		// 		if (object.minLimit && (!object.value || object.value < value)) object.value = value;
		// 		if (object.maxLimit && (!object.value || object.value > value)) object.value = value;
		// 	});
		// }
	}
};

const extractEvalValue = (object, propertyName) => {
	if (propertyName === undefined) {
		if (object.value && object.value.value !== undefined) return object.value.value;
		if (object.value !== undefined) return object.value;
	} else if (object[propertyName] != undefined) {
		if (object[propertyName].value && object[propertyName].value.value !== undefined) return object[propertyName].value.value;
		if (object[propertyName].value !== undefined) return object[propertyName].value;
		return object[propertyName];
	}

	return undefined;
};
