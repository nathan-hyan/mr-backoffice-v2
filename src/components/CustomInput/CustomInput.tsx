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
  endAdornment?: React.ReactNode;
  inputProps?:
    | Partial<FilledInputProps>
    | Partial<OutlinedInputProps>
    | Partial<InputProps>;
  className?: string;
}

function CustomInput<T extends FieldValues>({
  name,
  control = undefined,
  defaultValue = undefined,
  disabled = false,
  required = false,
  type,
  label,
  error = undefined,
  rules = {},
  multiline = false,
  inputProps = undefined,
  variant = 'outlined',
  className = '',
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
          className={className}
          onBlur={(event) =>
            field.onChange(
              type === 'number' ? parseOnlyNumbers(event) : event.target.value
            )
          }
          onFocus={type === 'number' ? (e) => e.target.select() : undefined}
          value={type === 'number' ? field.value?.toString() : field.value}
          fullWidth
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
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#000',
              '& .MuiInputBase-root': {
                height: 42,
                minHeight: 42,
              },
              '& fieldset': {
                borderColor: '#000',
              },
              '&:hover fieldset': {
                borderColor: '#000',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#000',
              },
              '&.Mui-disabled': {
                color: '#000',
              },
              '&.Mui-disabled fieldset': {
                borderColor: '#000',
              },
            },
            '& .MuiInputBase-input': {
              color: '#000',
              height: 42,
              minHeight: 42,
              padding: '0 8px',
              WebkitTextFillColor: '#000',
            },
            '& .MuiInputBase-input.Mui-disabled': {
              color: '#000',
              WebkitTextFillColor: '#000',
            },
            '& .MuiInputLabel-root': {
              color: '#000',
            },
            '& .MuiInputLabel-root.Mui-disabled': {
              color: '#000',
            },
            '& .Mui-focused': {
              color: '#000',
            },
            '& input[type=number]': {
              MozAppearance: 'textfield',
            },
            '& input[type=number]::-webkit-outer-spin-button': {
              WebkitAppearance: 'none',
              margin: 0,
            },
            '& input[type=number]::-webkit-inner-spin-button': {
              WebkitAppearance: 'none',
              margin: 0,
            },
          }}
        />
      )}
    />
  );
}

export default CustomInput;
