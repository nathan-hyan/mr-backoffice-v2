import { useEffect } from 'react';
import {
    Control,
    Controller,
    FieldErrors,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';
import {
    Box,
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

import styles from './styles.module.scss';

import { InputType, PRODUCT_FORM } from '~components/AddProductModal/constants';
import CircularProgressWithLabel from '~components/CircularProgressWithLabel';
import useFileUpload from '~hooks/useFileUpload';

interface Props {
    control: Control<Product, unknown>;
    watch: UseFormWatch<Product>;
    errors: FieldErrors<Product>;
    setValue: UseFormSetValue<Product>;
}

function Information({ control, watch, errors, setValue }: Props) {
    const { handleFileUpload, isUploading, uploadProgress, imageURL } =
        useFileUpload(watch);

    useEffect(() => {
        setValue('imageURL', imageURL);
    }, [imageURL, setValue]);

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
                name="category.name"
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
            {/* <Controller
                name="category.subCategory[0].name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Subcategoria"
                        variant="standard"
                        error={!!errors.category?.subCategory}
                        helperText={errors.category?.subCategory?.message}
                    />
                )}
            /> */}

            <Divider sx={{ mt: 3 }} />
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                {watch('imageURL').length > 0 ? (
                    watch('imageURL').map((image) => (
                        <img
                            src={image}
                            alt="Product"
                            key={image}
                            className={styles.image}
                        />
                    ))
                ) : (
                    <Typography
                        variant="subtitle1"
                        color="error"
                        sx={{
                            width: '100%',
                            textAlign: 'center',
                        }}
                    >
                        No hay imagenes subidas, por favor ingrese una imágen
                    </Typography>
                )}
            </Box>
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
