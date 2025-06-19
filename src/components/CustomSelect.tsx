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
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
  Theme,
} from '@mui/material';

interface Props<T> {
  control?: Control<T & FieldValues, unknown>;
  error?: FieldError;
  label: string;
  name: Path<T>;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: PathValue<T, Path<T>>;
  rules?: RegisterOptions<T & FieldValues, Path<T & FieldValues>>;
  variant?: 'outlined' | 'standard';
  data: { value: string | number; optionName: string }[];
  value?: string | number;
  onChange?: (e: SelectChangeEvent) => void;
  sx?: SxProps<Theme>;
  InputLabelProps?: object;
}

function CustomSelect<T extends FieldValues>({
  name,
  control = undefined,
  defaultValue = undefined,
  required = false,
  label,
  disabled = false,
  error = undefined,
  rules = {},
  variant = 'outlined',
  data,
  InputLabelProps = {},
  sx = {},
  onChange = undefined,
}: Props<T>) {
  const defaultSx: SxProps<Theme> = {
    '& .MuiOutlinedInput-root': {
      color: '#000',
      height: 42,
      minHeight: 42,
      boxSizing: 'border-box',
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
    '& .MuiSelect-select': {
      color: '#000',
      WebkitTextFillColor: '#000',
      height: 42,
      minHeight: 42,
      boxSizing: 'border-box',
      padding: '0 8px',
      display: 'flex',
      alignItems: 'center',
    },
    '& .MuiSelect-select.Mui-disabled': {
      color: '#000',
      WebkitTextFillColor: '#000',
      height: 42,
      minHeight: 42,
      boxSizing: 'border-box',
      padding: '0 8px',
    },
    '& .MuiSelect-icon': {
      color: '#000',
    },
    '& .MuiInputLabel-root': {
      color: '#000',
      backgroundColor: '#fff',
    },
    '& .MuiInputLabel-root.Mui-disabled': {
      color: '#000',
      backgroundColor: '#fff',
    },
    '& .Mui-focused': {
      color: '#000',
    },
    ...sx,
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{
        required: {
          value: Boolean(required),
          message: 'Este campo es obligatorio',
        },
        ...rules,
      }}
      disabled={disabled}
      render={({ field }) => (
        <FormControl
          fullWidth
          disabled={disabled}
          required={required}
          variant={variant}
          error={Boolean(error)}
          id={name}
          sx={defaultSx}
        >
          <InputLabel id={`${name}-label`} {...InputLabelProps}>
            {label}
          </InputLabel>
          <Select
            {...field}
            disabled={disabled}
            labelId={`${name}-label`}
            label={label}
            onChange={onChange ?? field.onChange}
          >
            {data.map(({ value, optionName }) => (
              <MenuItem key={value} value={value}>
                {optionName}
              </MenuItem>
            ))}
          </Select>
          {error && (
            <FormHelperText title='error-message'>
              {error.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}

export default CustomSelect;
