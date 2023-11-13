import { useEffect } from 'react';
import {
    Control,
    FieldErrors,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';
import { Box, Divider, Typography } from '@mui/material';
import { Product } from 'types/data';

import { ImageDisplay, ImageUploader } from './components';

import { PRODUCT_FORM } from '~components/AddProductModal/constants';
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
    const subCategories = getSubcategories(watch('category'));
    const images = watch('imageURL').filter(Boolean);

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
                data={categories.map(({ id, name }) => ({
                    value: id || '',
                    optionName: name,
                }))}
                label="Categoria"
                name="category"
                control={control}
                defaultValue=""
                error={errors.category}
                required
            />
            <CustomSelect
                data={subCategories.map(({ internalId, name }) => ({
                    value: internalId,
                    optionName: name,
                }))}
                label="Sub-Categoria"
                name="subCategory"
                control={control}
                defaultValue=""
                error={errors.subCategory}
                required
            />

            <Divider sx={{ mt: 3 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <ImageDisplay data={images} />
                <ImageUploader
                    isUploading={isUploading}
                    uploadProgress={uploadProgress}
                    handleFileUpload={handleFileUpload}
                />
            </Box>
        </>
    );
}
export default Information;
