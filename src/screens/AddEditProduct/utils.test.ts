import { faker } from '@faker-js/faker';
import { describe, expect, it, vi } from 'vitest';

import { fabricateFakeData } from './utils';

vi.mock('@faker-js/faker', () => {
  return {
    faker: {
      commerce: {
        productName: vi.fn(() => 'Fake Product Name'),
        productDescription: vi.fn(() => 'Fake Product Description'),
        price: vi.fn(() => '100.00'),
      },
      number: {
        int: vi.fn(({ min }) => min + 1),
      },
      person: {
        fullName: vi.fn(() => 'Fake Person Name'),
      },
      location: {
        countryCode: vi.fn(() => 'US'),
      },
    },
  };
});

describe('fabricateFakeData', () => {
  it('should return an array of fake data objects with correct fields and values', () => {
    const fakeData = fabricateFakeData();

    expect(fakeData).toEqual([
      { field: 'name', value: 'Fake Product Name' },
      { field: 'description', value: 'Fake Product Description' },
      { field: 'stock.current', value: 6 }, // min + 1
      { field: 'stock.minStock', value: 1 }, // min + 1
      { field: 'stock.maxStock', value: 51 }, // min + 1
      {
        field: 'barcode',
        value: '11111111112', // min + 1 converted to string
      },
      { field: 'category', value: 'e9BRnXR1pXxOqFKVp81w' },
      { field: 'subCategory', value: '1' },
      { field: 'prices.cash.value', value: 100.0 },
      { field: 'prices.list.value', value: 100.0 },
      { field: 'prices.web.value', value: 100.0 },
      { field: 'prices.cost.value', value: 100.0 },
      { field: 'brand', value: 'a2Cz7QoQVq1dVrKIpUm6' },
      { field: 'stockOwner', value: 'Fake Person Name' },
      { field: 'storePosition', value: 'US' },
      { field: 'weight', value: 3 }, // min + 1
      { field: 'dimensions.width', value: 3 }, // min + 1
      { field: 'dimensions.height', value: 3 }, // min + 1
      { field: 'dimensions.depth', value: 3 }, // min + 1
    ]);
  });

  it('should call faker methods with the correct arguments', () => {
    fabricateFakeData();

    expect(faker.commerce.productName).toHaveBeenCalled();
    expect(faker.commerce.productDescription).toHaveBeenCalled();
    expect(faker.number.int).toHaveBeenCalledWith({ min: 5, max: 50 });
    expect(faker.number.int).toHaveBeenCalledWith({ min: 0, max: 5 });
    expect(faker.number.int).toHaveBeenCalledWith({ min: 50, max: 50 });
    expect(faker.number.int).toHaveBeenCalledWith({
      min: 11111111111,
      max: 99999999999,
    });
    expect(faker.number.int).toHaveBeenCalledWith({ min: 2, max: 10 });
    expect(faker.commerce.price).toHaveBeenCalledWith({ min: 5, max: 300 });
    expect(faker.person.fullName).toHaveBeenCalled();
    expect(faker.location.countryCode).toHaveBeenCalled();
  });
});
