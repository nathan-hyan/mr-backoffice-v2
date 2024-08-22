import { Product } from 'types/data';

import { SortBy } from './constants';

export const compare =
  (sortBy: SortBy) => (first: Product, second: Product) => {
    switch (sortBy) {
      case 0:
        return first.name.toLowerCase() > second.name.toLowerCase() ? 1 : -1;

      case 1:
        return (first.prices.cost.lastModified || 0) >
          (second.prices.cost.lastModified || 0)
          ? 1
          : -1;

      case 2:
        return first.internalId > second.internalId ? 1 : -1;

      default:
        return 0;
    }
  };
