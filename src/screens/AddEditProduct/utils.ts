import { faker } from '@faker-js/faker';
import { Timestamp } from 'firebase/firestore';
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
    | Timestamp
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

    { field: 'stock.current', value: faker.number.int({ min: 5, max: 50 }) },
    { field: 'stock.minStock', value: faker.number.int({ min: 0, max: 5 }) },
    { field: 'stock.maxStock', value: faker.number.int({ min: 50, max: 50 }) },
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
    { field: 'brand', value: 'a2Cz7QoQVq1dVrKIpUm6' },
    { field: 'stockOwner', value: faker.person.fullName() },
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

export function formatTimestampEs(timestamp: Timestamp): string {
  const date = timestamp.toDate();
  return date.toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
