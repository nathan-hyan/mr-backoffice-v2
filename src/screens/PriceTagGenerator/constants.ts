import { Product } from 'types/data';

export interface ControlPanelValues {
  variant: 'yellow' | 'green' | 'pink';
  showPrices: boolean;
  generatorType: 'all' | 'individual';
  individualProducts: Product[];
}

export const TAG_VARIANTS = [
  {
    optionName: 'Amarillo',
    value: 'yellow',
  },
  {
    optionName: 'Rosa',
    value: 'pink',
  },
  {
    optionName: 'Verde',
    value: 'green',
  },
];

export const FORM_CONFIG: { defaultValues: ControlPanelValues } = {
  defaultValues: {
    variant: 'yellow',
    showPrices: true,
    generatorType: 'all',
    individualProducts: [],
  },
};
