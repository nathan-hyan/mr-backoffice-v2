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
  sx = undefined,
  onChange = undefined,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{ ...rules }}
      disabled={disabled}
      render={({ field }) => (
        <FormControl
          fullWidth
          disabled={disabled}
          required={required}
          variant={variant}
          error={Boolean(error)}
          id={name}
          sx={sx}
        >
          <InputLabel id={name}>{label}</InputLabel>
          <Select
            {...field}
            disabled={disabled}
            labelId={name}
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
