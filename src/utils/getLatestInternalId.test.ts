/* eslint-disable @typescript-eslint/no-explicit-any */
import getLatestInternalId from './getLatestInternalId';

describe('getLatestInternalId', () => {
  it('returns 0 for an empty collection', () => {
    const collection: any[] = [];
    expect(getLatestInternalId(collection)).toBe(0);
  });

  it('returns the latest internalId from the collection', () => {
    const collection = [
      { internalId: 1 },
      { internalId: 3 },
      { internalId: 2 },
    ];
    expect(getLatestInternalId(collection)).toBe(3);
  });

  it('returns 0 if the internalId is not a number', () => {
    const collection = [{ internalId: 'abc' }, { internalId: 'def' }];
    expect(getLatestInternalId(collection)).toBe(0);
  });

  it('returns 0 if the internalId is NaN', () => {
    const collection = [{ internalId: NaN }, { internalId: NaN }];
    expect(getLatestInternalId(collection)).toBe(0);
  });
});
