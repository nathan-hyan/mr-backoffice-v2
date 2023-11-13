import { InputType } from '~components/CustomInput/constants';

export interface PriceModifierForm {
    type: 'incr' | 'decr';
    cost: number;
    list: number;
    cash: number;
    web: number;
}

export const PRICE_INPUTS = [
    {
        id: 0,
        name: 'cost',
        label: 'Costo',
        type: InputType.Number,
    },
    {
        id: 1,
        name: 'list',
        label: 'Lista',
        type: InputType.Number,
    },
    {
        id: 2,
        name: 'cash',
        label: 'Contado',
        type: InputType.Number,
    },
    {
        id: 3,
        name: 'web',
        label: 'Web',
        type: InputType.Number,
    },
];
