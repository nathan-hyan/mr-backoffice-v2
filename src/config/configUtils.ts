export const flattenToNested = <T extends object>(obj: T) => {
  return Object.keys(obj).reduce((acc, key) => {
    key.split('.').reduce((nested, part, index, array) => {
      if (index === array.length - 1) {
        nested[part] = obj[key];
      } else {
        // Check if the next part is a number to create an array if necessary
        const nextPart = array[index + 1];
        if (!isNaN(nextPart)) {
          nested[part] = nested[part] || [];
        } else {
          nested[part] = nested[part] || {};
        }
      }
      return nested[part];
    }, acc);
    return acc;
  }, {});
};
