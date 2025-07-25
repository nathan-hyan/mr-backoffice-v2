import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { Product } from 'types/data';
import { Nullable } from 'vite-env';

import { ROUTES } from '~config/routes';
import { FirestoreCollections } from '~constants/firebase';
import { useProducts } from '~contexts/Products';
import useFirestore from '~hooks/useFirestore';
import getLatestInternalId from '~utils/getLatestInternalId';

import { EMPTY_FORM } from './constants';
import { fabricateFakeData } from './utils';

interface Props {
  productIdToEdit?: Nullable<string>;
}

function useProductModal({ productIdToEdit }: Props) {
  const navigate = useNavigate();
  const { productList } = useProducts();
  const { handleSubmit, control, watch, reset, formState, setValue } =
    useForm<Product>({
      defaultValues: EMPTY_FORM,
      mode: 'onChange',
    });

  const { errors } = formState;

  const { addDocument, updateDocument, creatingLoading } =
    useFirestore<Product>(FirestoreCollections.Products);

  const checkForErrors = () => {
    const errorsArray = Object.keys(errors);
    if (errorsArray.length !== 0) {
      const input =
        document.querySelector(`input[name=${errorsArray[0]}]`) ||
        document.querySelector(`textarea[name=${errorsArray[0]}]`);

      if (input) {
        input?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
      }
    }
  };

  const onSubmit = (data: Product) => {
    let stock = { ...data.stock };

    if (productIdToEdit) {
      updateDocument(productIdToEdit, data, () => {
        reset();

        navigate('/');
      });
      return;
    }

    if (data.stock.noPhysicalStock) {
      stock = {
        current: 0,
        maxStock: 0,
        minStock: 0,
        noPhysicalStock: true,
      };
    }

    addDocument({
      ...data,
      stock,
      internalId: getLatestInternalId(productList) + 1,
    }).then(() => {
      reset();

      navigate('/add');
    });
  };

  const handleCancel = () => {
    reset();
    navigate(ROUTES[4].path);
  };

  const fillFakeData = () => {
    fabricateFakeData().forEach(({ field, value }) => {
      setValue(field as keyof Product, value);
    });
  };

  useEffect(() => {
    if (productIdToEdit) {
      const productToEdit = productList.find(
        (product) => product.id === productIdToEdit
      );

      if (!productToEdit) {
        enqueueSnackbar(
          `No se encontró el producto con id ${productIdToEdit}`,
          {
            variant: 'error',
          }
        );

        return;
      }

      const keys = Object.keys(productToEdit) as (keyof Product)[];

      keys.forEach((field) => {
        setValue(field, productToEdit[field]);
      });
      setValue('internalId', productToEdit.internalId || 0);
    }
  }, [productList, productIdToEdit, setValue]);

  return {
    fillFakeData,
    handleCancel,
    onSubmit,
    checkForErrors,
    handleSubmit,
    setValue,
    watch,
    control,
    creatingLoading,
    errors,
  };
}
export default useProductModal;
