export interface PriceModifierForm {
    type: 'incr' | 'decr';
    cost: number;
    list: number;
    cash: number;
    web: number;
}
