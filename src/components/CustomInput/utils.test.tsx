import React from 'react';

import { InputType } from './constants';
import {
  parseOnlyNumbers,
  validate,
  validatePositive,
  validatePositiveWithNoRequired,
} from './utils';

describe('Custom Input Utils', () => {
  describe('Parse only numbers', () => {
    it('works as expected', () => {
      const result = parseOnlyNumbers({
        target: { value: '2048' },
      } as React.ChangeEvent<HTMLInputElement>);

      expect(result).toBe(2048);
    });
  });

  it('returns 0 if an invalid number is passed', () => {
    const result = parseOnlyNumbers({
      target: { value: 'ThisWillBeBroken' },
    } as React.ChangeEvent<HTMLInputElement>);

    expect(result).toBe(0);
  });

  describe('Validate positive numbers with no required', () => {
    it('should return true if number is positive', () => {
      const result = validatePositiveWithNoRequired(
        '30' as never,
        InputType.Number,
        false
      );

      expect(result).toBe(true);
    });
  });

  it('should return true if number is zero', () => {
    const result = validatePositiveWithNoRequired(
      '0' as never,
      InputType.Number,
      false
    );

    expect(result).toBe(true);
  });

  it('shoud return error if number is negative', () => {
    const result = validatePositiveWithNoRequired(
      '-1' as never,
      InputType.Number,
      false
    );

    expect(result).toBe('El numero no puede ser negativo');
  });

  it('should return true if number is negative and required is passed', () => {
    const result = validatePositiveWithNoRequired(
      '-1' as never,
      InputType.Number,
      true
    );

    expect(result).toBe(true);
  });

  describe('Validate positive numbers with required', () => {
    it('should return true if number is positive', () => {
      const result = validatePositive('1' as never, InputType.Number, true);

      expect(result).toBe(true);
    });

    it('should return error if number is negative', () => {
      const result = validatePositive('-1' as never, InputType.Number, true);

      expect(result).toBe('El numero no puede ser cero o negativo');
    });

    it('should return error if number is zero', () => {
      const result = validatePositive('0' as never, InputType.Number, true);

      expect(result).toBe('El numero no puede ser cero o negativo');
    });

    it('should return true if required is false but value is invalid', () => {
      const result = validatePositive('0' as never, InputType.Number, false);

      expect(result).toBe(true);
    });
  });

  describe('validate', () => {
    it('should return both functions and work as expected', () => {
      const result = validate(InputType.Number, true) as {
        positive: typeof validatePositive;
        positiveWithNoRequired: typeof validatePositiveWithNoRequired;
      };

      expect(result.positive('1' as never, InputType.Number, true)).toBe(true);
      expect(
        result.positiveWithNoRequired('1' as never, InputType.Number, true)
      ).toBe(true);
    });
  });
});
