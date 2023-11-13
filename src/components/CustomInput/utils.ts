import { ChangeEvent } from 'react';

export function parseOnlyNumbers({
    target: { value },
}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const sanitizedValue = value
        .split('')
        .filter((character) => /[0-9,.]/.test(character))
        .join('');

    return Number.isNaN(sanitizedValue) || Number(sanitizedValue) <= 0
        ? 0
        : parseFloat(sanitizedValue);
}

// ({ target: { value } }) =>
//                         type === 'number'
//                             ? field.onChange(
//                                   Number.isNaN(value) ? 0 : parseInt(value, 10)
//                               )
//                             : field.onChange(value)
