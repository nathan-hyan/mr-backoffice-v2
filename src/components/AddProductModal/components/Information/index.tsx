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
    Typography,
} from '@mui/material';
import { Product } from 'types/data';

// import { isRequiredRule } from './constants';
import styles from './styles.module.scss';

import { PRODUCT_FORM } from '~components/AddProductModal/constants';
import CircularProgressWithLabel from '~components/CircularProgressWithLabel';
import CustomInput from '~components/CustomInput/CustomInput';
import CustomSelect from '~components/CustomSelect';
import { useProducts } from '~contexts/Products';
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

    const { categories, getSubcategories } = useProducts();

    useEffect(() => {
        if (imageURL.length) {
            setValue('imageURL', imageURL);
        }
    }, [imageURL, setValue]);

    return (
        <>
            <Typography sx={{ mt: 5 }} fontWeight="bold">
                Información
            </Typography>
            <Divider sx={{ my: 2 }} />
            {PRODUCT_FORM.map((item) => (
                <CustomInput
                    key={item.id}
                    name={item.name}
                    control={control}
                    multiline={item.multiline}
                    label={item.label}
                    type={item.type}
                />
            ))}
            <CustomSelect
                data={categories}
                label="Categoria"
                name="category"
                control={control}
                defaultValue=""
                error={errors.category}
                required
            />
            <CustomSelect
                data={getSubcategories(watch('category'))}
                label="Sub-Categoria"
                name="subCategory"
                control={control}
                defaultValue=""
                error={errors.subCategory}
                required
            />
            {/* <Controller
                name="category"
                control={control}
                defaultValue=""
                // rules={isRequiredRule}
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
                            {categories.map(({ name, id }) => (
                                <MenuItem key={id} value={id}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                        {!!errors.category && (
                            <FormHelperText>
                                {errors.category?.message}
                            </FormHelperText>
                        )}
                    </FormControl>
                )}
            /> */}
            {/* <Controller
                name="subCategory"
                control={control}
                defaultValue=""
                // rules={isRequiredRule}
                render={({ field }) => (
                    <FormControl
                        fullWidth
                        variant="standard"
                        error={!!errors.category}
                    >
                        <InputLabel id="demo-simple-select-label">
                            Sub-Categoria
                        </InputLabel>
                        <Select
                            {...field}
                            labelId="subCategory"
                            disabled={
                                getSubcategories(watch('category')).length === 0
                            }
                        >
                            {getSubcategories(watch('category')).map(
                                ({ name, internalId }) => (
                                    <MenuItem
                                        key={internalId}
                                        value={internalId}
                                    >
                                        {name}
                                    </MenuItem>
                                )
                            )}
                        </Select>
                        {!!errors.category && (
                            <FormHelperText>
                                {errors.category?.message}
                            </FormHelperText>
                        )}
                    </FormControl>
                )}
            /> */}

            <Divider sx={{ mt: 3 }} />
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                {watch('imageURL').filter(Boolean).length > 0 ? (
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
                    id="upload-button"
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
