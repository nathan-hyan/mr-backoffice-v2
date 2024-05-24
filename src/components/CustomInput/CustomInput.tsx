import { useEffect, useRef } from 'react';
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from 'react-hook-form';
import {
  FilledInputProps,
  InputProps,
  OutlinedInputProps,
  TextField,
} from '@mui/material';

import { InputType } from './constants';
import { parseOnlyNumbers, validate } from './utils';

interface Props<T> {
  control?: Control<T & FieldValues, unknown>;
  error?: Partial<FieldError>;
  label: string;
  disabled?: boolean;
  name: Path<T>;
  required?: boolean;
  defaultValue?: PathValue<T, Path<T>>;
  type: InputType;
  rules?: RegisterOptions<T & FieldValues, Path<T & FieldValues>>;
  multiline?: boolean;
  variant?: 'standard' | 'outlined';
  inputProps?:
    | Partial<FilledInputProps>
    | Partial<OutlinedInputProps>
    | Partial<InputProps>;
}

function CustomInput<T extends FieldValues>({
  name,
  control,
  defaultValue,
  disabled,
  required,
  type,
  label,
  error,
  rules,
  multiline,
  inputProps,
  variant,
  ...props
}: Props<T>) {
  const numberFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const numberRef = numberFieldRef.current;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
    };

    if (type === InputType.Number) {
      numberRef?.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (type === InputType.Number) {
        numberRef?.removeEventListener('wheel', handleWheel);
      }
    };
  }, [type]);

  return (
    <Controller
      control={control}
      disabled={disabled}
      name={name}
      defaultValue={defaultValue}
      rules={{
        required: {
          value: Boolean(required),
          message: 'Este campo es obligatorio',
        },
        validate: validate(type, required),
        ...rules,
      }}
      render={({ field }) => (
        <TextField
          {...field}
          {...props}
          fullWidth
          onChange={(event) =>
            field.onChange(
              type === 'number' ? parseOnlyNumbers(event) : event.target.value
            )
          }
          onFocus={type === 'number' ? (e) => e.target.select() : undefined}
          value={type === 'number' ? field.value?.toString() : field.value}
          onKeyDown={(event) => {
            return (
              type === 'number' &&
              (event.code === 'KeyE' || event.code === 'Period') &&
              event.preventDefault()
            );
          }}
          id='standard-basic'
          label={label}
          variant={variant}
          required={required}
          type={type ?? 'text'}
          disabled={disabled}
          error={Boolean(error)}
          multiline={multiline}
          helperText={error ? error.message : undefined}
          InputProps={{ ...inputProps, disabled }}
          ref={numberFieldRef}
        />
      )}
    />
  );
}

CustomInput.defaultProps = {
  control: undefined,
  required: false,
  disabled: false,
  rules: {},
  multiline: false,
  error: undefined,
  defaultValue: undefined,
  inputProps: undefined,
  variant: 'outlined',
};

export default CustomInput;
