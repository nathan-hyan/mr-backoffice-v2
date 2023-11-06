import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Divider, TextField, Typography } from '@mui/material';
import { Product } from 'types/data';

import {
    DIMENSIONS_FORM,
    InputType,
} from '~components/AddProductModal/constants';

interface Props {
    control: Control<Product, unknown>;
    errors: FieldErrors<Product>;
}

function Dimensions({ control, errors }: Props) {
    return (
        <>
            <Typography sx={{ mt: 5 }} fontWeight="bold">
                Dimensiones
            </Typography>
            <Divider sx={{ my: 2 }} />
            {DIMENSIONS_FORM.map((item) => (
                <Controller
                    key={item.id}
                    name={`dimensions.${item.name}`}
                    control={control}
                    rules={{
                        validate: {
                            positiveWithNoRequired:
                                item.type === InputType.Number && !item.required
                                    ? (val) =>
                                          Number(val) >= 0 ||
                                          'El numero no puede ser negativo'
                                    : () => true,
                        },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            onChange={({ target: { value } }) =>
                                field.onChange(
                                    Number.isNaN(value) || Number(value) < 0
                                        ? 0
                                        : parseInt(value, 10)
                                )
                            }
                            value={field.value.toString()}
                            label={item.label}
                            type={InputType.Number}
                            variant="standard"
                            error={
                                errors.dimensions &&
                                !!errors.dimensions[item.name]
                            }
                            helperText={
                                errors.dimensions &&
                                errors.dimensions[item.name]?.message
                            }
                            fullWidth
                        />
                    )}
                />
            ))}
        </>
    );
}
export default Dimensions;
