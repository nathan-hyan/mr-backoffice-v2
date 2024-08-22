import { describe, expect, it } from 'vitest';

import { generateBarcode } from './utils';

describe('generateBarcode', () => {
  it('should return a string', () => {
    const barcode = generateBarcode();
    expect(typeof barcode).toBe('string');
  });

  it('should return a string of 12 digits', () => {
    const barcode = generateBarcode();
    expect(barcode).toHaveLength(12);
  });

  it('should return a string of digits only', () => {
    const barcode = generateBarcode();
    expect(barcode).toMatch(/^\d{12}$/);
  });

  it('should return different barcodes on subsequent calls', () => {
    const barcode1 = generateBarcode();
    const barcode2 = generateBarcode();
    expect(barcode1).not.toBe(barcode2);
  });
});
