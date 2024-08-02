const objectIterator = <T extends object>(object: T) => {
  const keys = Object.keys(object);

  const result: { key: string; value: (typeof object)[keyof typeof object] }[] =
    [];
  keys.forEach((key) => result.push({ key, value: object[key as keyof T] }));

  return result;
};

export default objectIterator;
