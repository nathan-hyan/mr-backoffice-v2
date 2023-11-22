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
