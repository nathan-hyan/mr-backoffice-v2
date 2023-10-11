import { Product } from 'types/data';

import { PriceModifierForm } from './constants';

import calculateNumberWithPercentage from '~utils/addPercentage';

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
                    lastModified: new Date(),
                },
                list: {
                    value: newListPrice,
                    lastModified: new Date(),
                },
                cash: {
                    value: newCashPrice,
                    lastModified: new Date(),
                },
                web: {
                    value: newWebPrice,
                    lastModified: new Date(),
                },
            },
        };
    });

    return result;
};
