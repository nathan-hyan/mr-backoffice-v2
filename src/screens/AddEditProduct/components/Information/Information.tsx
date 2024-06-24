import {
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import CachedIcon from '@mui/icons-material/Cached';
import { Divider, IconButton, InputAdornment, Typography } from '@mui/material';
import { Product } from 'types/data';

import { PRODUCT_FORM } from '~components/AddProductModal/constants';
import { InputType } from '~components/CustomInput/constants';
import CustomInput from '~components/CustomInput/CustomInput';
import CustomSelect from '~components/CustomSelect';
import { useProducts } from '~contexts/Products';

import ImageSelection from './components/ImageSelection/ImageSelection';

interface Props {
  control: Control<Product, unknown>;
  watch: UseFormWatch<Product>;
  errors: FieldErrors<Product>;
  setValue: UseFormSetValue<Product>;
}

function Information({ control, watch, errors, setValue }: Props) {
  const { categories, getSubcategories } = useProducts();
  const subCategories = getSubcategories(watch('category'));
  const images = watch('imageURL').filter(Boolean);

  const handleGenerateBarcode = () => {
    const barcode = Math.floor(Math.random() * 1000000000000).toString();
    setValue('barcode', barcode);
  };

  return (
    <>
      <Typography sx={{ mt: 5 }} fontWeight='bold'>
        Información
      </Typography>

      <Divider sx={{ my: 2 }} />

      {PRODUCT_FORM.map((item) => (
        <CustomInput key={item.id} control={control} {...item} />
      ))}

      <CustomInput
        control={control}
        label='Código de barras'
        name='barcode'
        type={InputType.Text}
        inputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleGenerateBarcode}
                edge='end'
              >
                <CachedIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <CustomSelect
        data={categories.map(({ id, name }) => ({
          value: id || '',
          optionName: name,
        }))}
        label='Categoria'
        name='category'
        control={control}
        defaultValue=''
        error={errors.category}
        required
      />

      <CustomSelect
        data={subCategories.map(({ internalId, name }) => ({
          value: internalId,
          optionName: name,
        }))}
        label='Sub-Categoria'
        name='subCategory'
        control={control}
        defaultValue=''
        error={errors.subCategory}
        required
      />

      <Divider sx={{ mt: 3 }} />

      <ImageSelection data={images} setValue={setValue} watch={watch} />
    </>
  );
}
export default Information;
