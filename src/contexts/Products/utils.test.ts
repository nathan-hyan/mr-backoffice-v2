import { Timestamp } from 'firebase/firestore';
import { Product } from 'types/data';

import { SortBy } from './constants';
import { compare } from './utils';

describe('compare', () => {
  const productA: Product = {
    name: 'Alpha',
    prices: { cost: { lastModified: 1000 as Timestamp, value: 0 } },
    internalId: 123,
  };

  const productB: Product = {
    name: 'Beta',
    prices: { cost: { lastModified: 2000 as Timestamp, value: 1 } },
    internalId: 124,
  };

  it('should compare by name when sortBy is 0', () => {
    const result = compare(SortBy.Name)(productA, productB);
    expect(result).toBe(-1); // 'Alpha' < 'Beta'
  });

  it('should compare by lastModified cost when sortBy is 1', () => {
    const result = compare(SortBy.LastModified)(productA, productB);
    expect(result).toBe(-1); // 1000 < 2000
  });

  it('should compare by internalId when sortBy is 2', () => {
    const result = compare(SortBy.InternalId)(productA, productB);
    expect(result).toBe(-1); // '123' < '124'
  });

  it('should return 0 when sortBy is unrecognized', () => {
    const result = compare(999 as SortBy)(productA, productB);
    expect(result).toBe(0); // Unrecognized sortBy returns 0
  });
});
