import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Divider, TextField, Typography } from '@mui/material';
import { Product } from 'types/data';

import { InputType, PRICE_FORM } from '~components/AddProductModal/constants';

interface Props {
    control: Control<Product, unknown>;
    errors: FieldErrors<Product>;
}

function Prices({ control, errors }: Props) {
    return (
        <>
            <Typography sx={{ mt: 5 }} fontWeight="bold">
                Precios
            </Typography>
            <Divider sx={{ my: 2 }} />
            {PRICE_FORM.map((item) => (
                <Controller
                    key={item.id}
                    name={`prices.${item.name}.value`}
                    control={control}
                    rules={{
                        required: {
                            value: item.required,
                            message: 'Este campo es obligatorio',
                        },
                        validate: {
                            positive:
                                item.type === InputType.Number
                                    ? (val) =>
                                          Number(val) > 0 ||
                                          'El numero no puede ser cero o negativo'
                                    : () => true,
                        },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={item.label}
                            type={item.type}
                            required={item.required}
                            error={
                                errors.prices
                                    ? !!errors.prices[item.name]
                                    : undefined
                            }
                            helperText={
                                errors.prices
                                    ? errors.prices[item.name]?.value?.message
                                    : undefined
                            }
                            onChange={({ target: { value } }) =>
                                field.onChange(
                                    Number.isNaN(value) || Number(value) < 0
                                        ? 0
                                        : parseInt(value, 10)
                                )
                            }
                            value={field.value?.toString()}
                            fullWidth
                            variant="standard"
                        />
                    )}
                />
            ))}
        </>
    );
}
export default Prices;
