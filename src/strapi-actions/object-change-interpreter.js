function findModifiedFields(oldObj, newObj) {
  const modifiedFields = {};

  const compareValues = (oldVal, newVal, path) => {
    if (typeof oldVal !== typeof newVal) {
      modifiedFields[path] = { oldValue: oldVal, newValue: newVal };
    } else if (
      typeof oldVal === "object" &&
      oldVal !== null &&
      newVal !== null
    ) {
      if (Array.isArray(oldVal) && Array.isArray(newVal)) {
        if (oldVal.length !== newVal.length) {
          modifiedFields[path] = { oldValue: oldVal, newValue: newVal };
        } else {
          oldVal.forEach((item, index) => {
            compareValues(item, newVal[index], `${path}[${index}]`);
          });
        }
      } else if (typeof oldVal === "object" && !Array.isArray(oldVal)) {
        for (const key in oldVal) {
          if (Object.prototype.hasOwnProperty.call(newVal, key)) {
            compareValues(
              oldVal[key],
              newVal[key],
              path ? `${path}.${key}` : key
            );
          } else {
            modifiedFields[path ? `${path}.${key}` : key] = {
              oldValue: oldVal[key],
              newValue: undefined,
            };
          }
        }
        for (const key in newVal) {
          if (!Object.prototype.hasOwnProperty.call(oldVal, key)) {
            modifiedFields[path ? `${path}.${key}` : key] = {
              oldValue: undefined,
              newValue: newVal[key],
            };
          }
        }
      }
    } else if (oldVal !== newVal) {
      modifiedFields[path] = { oldValue: oldVal, newValue: newVal };
    }
  };

  compareValues(oldObj, newObj, "");

  return modifiedFields;
}

export { findModifiedFields };
