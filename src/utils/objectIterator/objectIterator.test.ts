import objectIterator from './objectIterator';

describe('objectIterator', () => {
  it('returns an empty array for an empty object', () => {
    const object = {};
    expect(objectIterator(object)).toEqual([]);
  });

  it('returns an array of key-value pairs for a non-empty object', () => {
    const object = { a: 1, b: 2, c: 3 };
    const expected = [
      { key: 'a', value: 1 },
      { key: 'b', value: 2 },
      { key: 'c', value: 3 },
    ];
    expect(objectIterator(object)).toEqual(expected);
  });

  it('returns an array of key-value pairs for an object with nested properties', () => {
    const object = { a: { b: 1 }, c: { d: 2 } };
    const expected = [
      { key: 'a', value: { b: 1 } },
      { key: 'c', value: { d: 2 } },
    ];
    expect(objectIterator(object)).toEqual(expected);
  });
});
