import {
    Control,
    Controller,
    FieldErrors,
    UseFormWatch,
} from 'react-hook-form';
import {
    Button,
    Divider,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { Product } from 'types/data';

import { InputType, PRODUCT_FORM } from '~components/AddProductModal/constants';
import CircularProgressWithLabel from '~components/CircularProgressWithLabel';
import useFileUpload from '~hooks/useFileUpload';

interface Props {
    control: Control<Product, unknown>;
    watch: UseFormWatch<Product>;
    errors: FieldErrors<Product>;
}

function Information({ control, watch, errors }: Props) {
    const { handleFileUpload, isUploading, uploadProgress } =
        useFileUpload(watch);

    return (
        <>
            <Typography sx={{ mt: 5 }} fontWeight="bold">
                Información
            </Typography>
            <Divider sx={{ my: 2 }} />
            {PRODUCT_FORM.map((item) => (
                <Controller
                    key={item.id}
                    name={item.name}
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
                            multiline={item.multiline}
                            label={item.label}
                            type={item.type}
                            required={item.required}
                            error={!!errors[item.name]}
                            helperText={errors[item.name]?.message}
                            fullWidth
                            variant="standard"
                        />
                    )}
                />
            ))}
            <Controller
                name="category"
                control={control}
                defaultValue=""
                rules={{
                    required: {
                        value: true,
                        message: 'Por favor, elija una categoria',
                    },
                }}
                render={({ field }) => (
                    <FormControl
                        fullWidth
                        variant="standard"
                        error={!!errors.category}
                    >
                        <InputLabel id="demo-simple-select-label">
                            Categoria
                        </InputLabel>
                        <Select {...field} labelId="category">
                            <MenuItem value="libreria">Librería</MenuItem>
                            <MenuItem value="imprenta">Imprenta</MenuItem>
                            <MenuItem value="servicios">Servicios</MenuItem>
                            <MenuItem value="regaleria">Regalería</MenuItem>
                            <MenuItem value="biju-cosmetica">
                                Bijú / Cosmética
                            </MenuItem>
                            <MenuItem value="electronica">Electrónica</MenuItem>
                            <MenuItem value="cotillon">Cotillón</MenuItem>
                        </Select>
                        {!!errors.category && (
                            <FormHelperText>
                                {errors.category?.message}
                            </FormHelperText>
                        )}
                    </FormControl>
                )}
            />
            <Controller
                name="subCategory"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Subcategoria"
                        variant="standard"
                        error={!!errors.subCategory}
                        helperText={errors.subCategory?.message}
                    />
                )}
            />

            <Divider sx={{ mt: 3 }} />
            <label htmlFor="upload-image">
                <Button
                    variant="contained"
                    component="span"
                    fullWidth
                    disabled={isUploading}
                    startIcon={
                        uploadProgress !== null && isUploading ? (
                            <CircularProgressWithLabel
                                color="primary"
                                value={uploadProgress}
                            />
                        ) : null
                    }
                >
                    Subir imágenes
                </Button>
                <input
                    id="upload-image"
                    hidden
                    accept="image/*"
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                />
            </label>
        </>
    );
}
export default Information;
