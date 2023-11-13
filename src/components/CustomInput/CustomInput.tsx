import {
    Control,
    Controller,
    FieldError,
    FieldValues,
    Path,
    PathValue,
} from 'react-hook-form';
import { TextField } from '@mui/material';

import { parseOnlyNumbers } from './utils';

interface Props<T> {
    control?: Control<T & FieldValues, unknown>;
    error?: FieldError;
    label: string;
    name: Path<T>;
    required?: boolean;
    defaultValue: PathValue<T, Path<T>>;
    type: 'text' | 'number';
}

function CustomInput<T extends FieldValues>({
    name,
    control,
    defaultValue,
    required,
    type,
    label,
    error,
}: Props<T>) {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            rules={{
                required: {
                    value: Boolean(required),
                    message: 'Este campo es obligatorio',
                },
                validate: {
                    positive: (val) =>
                        type === 'number'
                            ? Number(val) > 0 ||
                              'El numero no puede ser cero o negativo'
                            : true,
                },
            }}
            render={({ field }) => (
                <TextField
                    {...field}
                    fullWidth
                    onChange={(event) =>
                        field.onChange(
                            type === 'number'
                                ? parseOnlyNumbers(event)
                                : event.target.value
                        )
                    }
                    onFocus={
                        type === 'number' ? (e) => e.target.select() : undefined
                    }
                    value={
                        type === 'number'
                            ? field.value?.toString()
                            : field.value
                    }
                    onKeyDown={(event) =>
                        type === 'number' &&
                        event.code === 'KeyE' &&
                        event.preventDefault()
                    }
                    id="standard-basic"
                    label={label}
                    variant="standard"
                    required={required}
                    type={type}
                    error={Boolean(error)}
                    helperText={error ? error.message : undefined}
                />
            )}
        />
    );
}

CustomInput.defaultProps = {
    control: undefined,
    required: false,
    error: undefined,
};

export default CustomInput;
