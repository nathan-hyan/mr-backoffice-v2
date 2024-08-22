import { Timestamp } from 'firebase/firestore';
import { Product, UserFeedback } from 'types/data';
import { describe, expect, it } from 'vitest';

import {
  getAverageRating,
  prepareDataForDisplay,
  translateFields,
  translateStock,
} from './ProductDetail.utils';

describe('translateStock', () => {
  it('should translate stock fields correctly', () => {
    expect(translateStock('minStock')).toBe('Stock minimo');
    expect(translateStock('current')).toBe('Stock actual');
    expect(translateStock('maxStock')).toBe('Stock maximo');
    expect(translateStock('noPhysicalStock')).toBe('Sin stock fisico');
  });

  it('should return an error string for unknown stock fields', () => {
    expect(translateStock('unknown' as keyof Product['stock'])).toBe(
      'ERROR: unknown'
    );
  });
});

describe('translateFields', () => {
  it('should translate product fields correctly', () => {
    expect(translateFields('barcode')).toBe('Codigo de barras');
    expect(translateFields('brand')).toBe('Marca');
    expect(translateFields('stockOwner')).toBe('Dueño de stock');
    expect(translateFields('internalId')).toBe('ID Interno');
    expect(translateFields('id')).toBe('ID Base de datos');
    expect(translateFields('weight')).toBe('Peso');
    expect(translateFields('stock')).toBe('Stock disponible');
    expect(translateFields('createdAt')).toBe('Fecha de creación');
    expect(translateFields('updatedAt')).toBe('Fecha de modificación');
    expect(translateFields('storePosition')).toBe('Ubicación en el local');
  });

  it('should return an error string for unknown product fields', () => {
    expect(translateFields('unknown' as keyof Product)).toBe('ERROR: unknown');
  });
});

describe('prepareDataForDisplay', () => {
  const mockProduct: Product = {
    barcode: '123456789012',
    name: 'Product Name',
    imageURL: ['image.url'],
    description: 'Product Description',
    category: 'Category',
    subCategory: 'SubCategory',
    prices: {
      cost: { value: 100, lastModified: new Timestamp(0, 0) },
      mayo1: { value: 150, lastModified: new Timestamp(0, 0) },
      mayo2: { value: 120, lastModified: new Timestamp(0, 0) },
      mayo3: { value: 120, lastModified: new Timestamp(0, 0) },
      mayo4: { value: 120, lastModified: new Timestamp(0, 0) },
      online: { value: 130, lastModified: new Timestamp(0, 0) },
      reseller: { value: 130, lastModified: new Timestamp(0, 0) },
      retail: { value: 130, lastModified: new Timestamp(0, 0) },
    },
    createdAt: new Timestamp(0, 0),
    updatedAt: new Timestamp(0, 0),
    providerProductCode: [],
    specifications: [],
    variants: [],
    id: '123',
    showInStore: true,
    userFeedback: [],
    stock: {
      current: 10,
      minStock: 1,
      maxStock: 100,
      noPhysicalStock: false,
    },
    brand: 'Brand ID',
    internalId: 0,
    stockOwner: 'Stock Owner',
    weight: 2,
    dimensions: { width: 10, height: 20, depth: 30 },
    storePosition: 'Aisle 3',
  };

  it('should prepare data for display excluding certain fields', () => {
    const translateBrand = (brand: string) =>
      brand === 'Brand ID' ? 'Translated Brand' : '';
    const result = prepareDataForDisplay(mockProduct, translateBrand);

    expect(result).toEqual([
      { title: 'Codigo de barras', value: '123456789012' },
      { title: 'Marca', value: 'Translated Brand' },
      { title: 'ID Interno', value: '0' },
      { title: 'Dueño de stock', value: 'Stock Owner' },
      { title: 'Peso', value: '2kg' },
      {
        title: 'Dimensiones',
        value: 'Alto: 20cm, Ancho: 10cm, Profundidad: 30cm',
      },
      { title: 'Ubicación en el local', value: 'Aisle 3' },
    ]);
  });
});

describe('getAverageRating', () => {
  const feedbackArray: UserFeedback[] = [
    { rating: 4, comment: 'Good', id: 0 },
    { rating: 5, comment: 'Excellent', id: 1 },
    { rating: 3, comment: 'Average', id: 2 },
  ];

  it('should calculate the average rating correctly', () => {
    const averageRating = getAverageRating(feedbackArray);
    expect(averageRating).toBe(4);
  });

  it('should return NaN if the array is empty', () => {
    const averageRating = getAverageRating([]);
    expect(averageRating).toBe(NaN);
  });
});
