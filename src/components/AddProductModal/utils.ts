import { faker } from '@faker-js/faker';
import {
  Dimensions,
  Prices,
  ProviderProductCode,
  Specifications,
  Variants,
} from 'types/data';

export function fabricateFakeData(): {
  field: string;
  value:
    | string
    | number
    | Date
    | Dimensions
    | ProviderProductCode[]
    | Specifications[]
    | Variants[]
    | Prices
    | string[]
    | undefined;
}[] {
  return [
    { field: 'name', value: faker.commerce.productName() },
    { field: 'description', value: faker.commerce.productDescription() },
    { field: 'stock', value: faker.number.int({ min: 0, max: 50 }) },
    {
      field: 'barcode',
      value: String(faker.number.int({ min: 11111111111, max: 99999999999 })),
    },
    { field: 'category', value: 'e9BRnXR1pXxOqFKVp81w' },
    { field: 'subCategory', value: '1' },
    {
      field: 'prices.cash.value',
      value: Number(faker.commerce.price({ min: 5, max: 300 })),
    },
    {
      field: 'prices.list.value',
      value: Number(faker.commerce.price({ min: 5, max: 300 })),
    },
    {
      field: 'prices.web.value',
      value: Number(faker.commerce.price({ min: 5, max: 300 })),
    },
    {
      field: 'prices.cost.value',
      value: Number(faker.commerce.price({ min: 5, max: 300 })),
    },
    { field: 'brand', value: faker.commerce.product() },
    { field: 'businessOwner', value: faker.person.fullName() },
    { field: 'storePosition', value: faker.location.countryCode() },
    { field: 'weight', value: faker.number.int({ min: 2, max: 10 }) },
    {
      field: 'dimensions.width',
      value: faker.number.int({ min: 2, max: 10 }),
    },
    {
      field: 'dimensions.height',
      value: faker.number.int({ min: 2, max: 10 }),
    },
    {
      field: 'dimensions.depth',
      value: faker.number.int({ min: 2, max: 10 }),
    },
  ];
}
