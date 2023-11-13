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
} from '@mui/material';

interface Props<T, K> {
    control?: Control<T & FieldValues, unknown>;
    error?: FieldError;
    label: string;
    name: Path<T>;
    required?: boolean;
    defaultValue?: PathValue<T, Path<T>>;
    rules?: RegisterOptions<T & FieldValues, Path<T & FieldValues>>;
    data: K & Array<{ id?: string; name: string }>;
}

function CustomSelect<T extends FieldValues, K>({
    name,
    control,
    defaultValue,
    required,
    label,
    error,
    rules,
    data,
}: Props<T, K>) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={{ ...rules }}
            render={({ field }) => (
                <FormControl
                    fullWidth
                    required={required}
                    variant="standard"
                    error={Boolean(error)}
                >
                    <InputLabel id={name}>{label}</InputLabel>
                    <Select {...field} labelId={name}>
                        {data.map((options) =>
                            options ? (
                                <MenuItem key={options.id} value={options.id}>
                                    {options.name}
                                </MenuItem>
                            ) : null
                        )}
                    </Select>
                    {error && <FormHelperText>{error.message}</FormHelperText>}
                </FormControl>
            )}
        />
    );
}

CustomSelect.defaultProps = {
    control: undefined,
    required: false,
    rules: {},
    error: undefined,
    defaultValue: undefined,
};

export default CustomSelect;
