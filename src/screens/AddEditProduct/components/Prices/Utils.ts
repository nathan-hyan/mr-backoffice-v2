import type { Form } from '../../constants';
import { PRICE_FORM, PriceInputName } from '../../constants';

export function getPriceFormByName(
  name: PriceInputName
): Form<PriceInputName> | undefined {
  return PRICE_FORM.find((item) => item.name === name);
}

export function getRetailPrices() {
  return PRICE_FORM.filter((item) =>
    ['retail1', 'retail2', 'retail3', 'retail4'].includes(item.name)
  );
}

export function getWholesalePrices() {
  return PRICE_FORM.filter((item) =>
    ['mayo1', 'mayo2', 'mayo3', 'mayo4'].includes(item.name)
  );
}

export function getResellerPrice() {
  return PRICE_FORM.find((item) => item.name === 'reseller');
}
export function getOnlinePrices() {
  return PRICE_FORM.filter((item) => item.name === 'online');
}

export function formatPrice(value: number): string {
  if (Number.isNaN(value)) return '';
  const fixed = value.toFixed(2);
  return fixed.endsWith('.00') ? parseInt(fixed, 10).toString() : fixed;
}
