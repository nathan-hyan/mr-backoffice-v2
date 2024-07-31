import { Product } from 'types/data';

export const flattenToNested = (obj: Product) => {
  return Object.keys(obj).reduce((acc, key) => {
    key
      .split('.')
      .reduce(
        (nested, part, index, array) =>
          (nested[part] =
            index === array.length - 1 ? obj[key] : nested[part] || {}),
        acc
      );
    return acc;
  }, {});
};
