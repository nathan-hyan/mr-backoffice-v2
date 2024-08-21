import { Timestamp } from 'firebase/firestore';
import { Product } from 'types/data';

import calculateNumberWithPercentage from '~utils/addPercentage';

import { PriceModifierForm } from './constants';

export const batchUpdateData = (
  newData: PriceModifierForm,
  oldData: Product[]
) => {
  const result = oldData.map((item) => {
    const newCostPrice = calculateNumberWithPercentage(
      item.prices.cost.value,
      newData.cost,
      newData.type
    );
    const newListPrice = calculateNumberWithPercentage(
      item.prices.list.value,
      newData.list,
      newData.type
    );
    const newCashPrice = calculateNumberWithPercentage(
      item.prices.cash.value,
      newData.cash,
      newData.type
    );
    const newWebPrice = calculateNumberWithPercentage(
      item.prices.web.value,
      newData.web,
      newData.type
    );

    return {
      ...item,
      prices: {
        cost: {
          value: newCostPrice,
          lastModified: Timestamp.fromDate(new Date()),
        },
        list: {
          value: newListPrice,
          lastModified: Timestamp.fromDate(new Date()),
        },
        cash: {
          value: newCashPrice,
          lastModified: Timestamp.fromDate(new Date()),
        },
        web: {
          value: newWebPrice,
          lastModified: Timestamp.fromDate(new Date()),
        },
      },
    };
  });

  return result;
};
