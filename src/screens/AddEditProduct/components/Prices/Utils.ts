import type { Form } from '../../constants';
import { PRICE_FORM, PriceInputName } from '../../constants';

export function getPriceFormByName(
  name: PriceInputName
): Form<PriceInputName> | undefined {
  return PRICE_FORM.find((item) => item.name === name);
}

export function getRetailPrices() {
  return PRICE_FORM.filter((item) => item.name === 'retail');
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
