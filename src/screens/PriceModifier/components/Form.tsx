import { Control, Controller, FieldErrors } from 'react-hook-form';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';

import { PriceModifierForm } from '../constants';

interface Props {
    control: Control<PriceModifierForm, unknown>;
    errors: FieldErrors<PriceModifierForm>;
}

function Form({ control, errors }: Props) {
    return (
        <>
            <Controller
                name="type"
                control={control}
                render={({ field, formState: { defaultValues } }) => (
                    <FormControl fullWidth error={!!errors.type}>
                        <InputLabel id="type">Tipo de modificacion</InputLabel>
                        <Select
                            {...field}
                            defaultValue={defaultValues?.type}
                            labelId="type"
                            label="Tipo de modificacion"
                        >
                            <MenuItem value="incr">Aumentar</MenuItem>
                            <MenuItem value="decr">Bajar</MenuItem>
                        </Select>
                        {!!errors.type && (
                            <FormHelperText>
                                {errors.type?.message}
                            </FormHelperText>
                        )}
                    </FormControl>
                )}
            />

            <Box
                sx={{
                    mt: '1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Controller
                    name="cost"
                    control={control}
                    rules={{
                        validate: {
                            positive: (val) =>
                                Number(val) >= 0 ||
                                'El numero no puede ser negativo',
                        },
                    }}
                    render={({ field, formState: { defaultValues } }) => (
                        <TextField
                            {...field}
                            onChange={({ target: { value } }) =>
                                field.onChange(
                                    Number.isNaN(value) ? 0 : Number(value)
                                )
                            }
                            defaultValue={defaultValues?.cost}
                            error={!!errors.cost}
                            helperText={errors.cost?.message}
                            label="Costo"
                            type="number"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        %
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                />

                <Controller
                    name="list"
                    control={control}
                    rules={{
                        validate: {
                            positive: (val) =>
                                Number(val) >= 0 ||
                                'El numero no puede ser negativo',
                        },
                    }}
                    render={({ field, formState: { defaultValues } }) => (
                        <TextField
                            {...field}
                            onChange={({ target: { value } }) =>
                                field.onChange(
                                    Number.isNaN(value) ? 0 : Number(value)
                                )
                            }
                            error={!!errors.list}
                            helperText={errors.list?.message}
                            defaultValue={defaultValues?.list}
                            label="Lista"
                            type="number"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        %
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                />

                <Controller
                    name="cash"
                    control={control}
                    rules={{
                        validate: {
                            positive: (val) =>
                                Number(val) >= 0 ||
                                'El numero no puede ser negativo',
                        },
                    }}
                    render={({ field, formState: { defaultValues } }) => (
                        <TextField
                            {...field}
                            onChange={({ target: { value } }) =>
                                field.onChange(
                                    Number.isNaN(value) ? 0 : Number(value)
                                )
                            }
                            error={!!errors.cash}
                            helperText={errors.cash?.message}
                            defaultValue={defaultValues?.cash}
                            label="Contado"
                            type="number"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        %
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                />

                <Controller
                    name="web"
                    control={control}
                    rules={{
                        validate: {
                            positive: (val) =>
                                Number(val) >= 0 ||
                                'El numero no puede ser negativo',
                        },
                    }}
                    render={({ field, formState: { defaultValues } }) => (
                        <TextField
                            {...field}
                            onChange={({ target: { value } }) =>
                                field.onChange(
                                    Number.isNaN(value) ? 0 : Number(value)
                                )
                            }
                            error={!!errors.web}
                            helperText={errors.web?.message}
                            defaultValue={defaultValues?.web}
                            label="Web"
                            type="number"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        %
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                />
            </Box>
            <Box
                sx={{
                    mt: '1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Button variant="outlined">Cancelar y volver</Button>
                <Button variant="contained" color="error" type="submit">
                    Cambiar todos los precios
                </Button>
            </Box>
        </>
    );
}

export default Form;
