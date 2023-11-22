import { ChangeEvent } from 'react';
import { Path, PathValue, Validate } from 'react-hook-form';

import { InputType } from './constants';

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

export function validatePositive<T>(
  val: PathValue<T, Path<T>>,
  type: InputType,
  required?: boolean
) {
  if (type === InputType.Number && required) {
    return Number(val) > 0 || 'El numero no puede ser cero o negativo';
  }
  return true;
}

export function validatePositiveWithNoRequired<T>(
  val: PathValue<T, Path<T>>,
  type: InputType,
  required?: boolean
) {
  if (type === InputType.Number && !required) {
    return Number(val) >= 0 || 'El numero no puede ser negativo';
  }
  return true;
}

export const validate = <T>(type: InputType, required?: boolean) =>
  ({
    positive: (val) => validatePositive(val, type, required),
    positiveWithNoRequired: (val) =>
      validatePositiveWithNoRequired(val, type, required),
  }) as
    | Validate<PathValue<T, Path<T>>, T>
    | Record<string, Validate<PathValue<T, Path<T>>, T>>
    | undefined;
