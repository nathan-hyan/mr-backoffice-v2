import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { Product } from 'types/data';
import { Nullable } from 'vite-env';

import { FirestoreCollections } from '~constants/firebase';
import { useProducts } from '~contexts/Products';
import useFirestore from '~hooks/useFirestore';
import getLatestInternalId from '~utils/getLatestInternalId';

import { EMPTY_FORM } from './constants';
import { fabricateFakeData } from './utils';

interface Props {
  show: boolean;
  onClose: () => void;
  productToEdit?: Nullable<Product>;
}

function useProductModal({ show, onClose, productToEdit }: Props) {
  const { handleSubmit, control, watch, reset, formState, setValue } =
    useForm<Product>({
      defaultValues: EMPTY_FORM,
      mode: 'onChange',
    });

  const { errors } = formState;

  const { productList } = useProducts();

  const { addDocument, updateDocument, creatingLoading } =
    useFirestore<Product>(FirestoreCollections.Products);

  const checkForErrors = () => {
    const errorsArray = Object.keys(errors);

    if (errorsArray.length !== 0) {
      const input =
        document.querySelector(`input[name=${errorsArray[0]}]`) ||
        document.querySelector(`textarea[name=${errorsArray[0]}]`);

      input?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      });

      return;
    }

    if (watch('imageURL').filter(Boolean).length === 0) {
      const imageButton = document.getElementById('upload-button');

      imageButton?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'start',
      });
    }
  };

  const onSubmit = (data: Product) => {
    if (productToEdit) {
      updateDocument(productToEdit.id, data, () => {
        reset();
        onClose();
      });

      return;
    }

    if (data.imageURL.length < 1) {
      enqueueSnackbar(`Elija una imágen antes de continuar`, {
        variant: 'error',
      });

      return;
    }

    addDocument(data).then(() => {
      reset();
      onClose();
    });
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const fillFakeData = () => {
    fabricateFakeData().forEach(({ field, value }) => {
      setValue(field as keyof Product, value);
    });
  };

  useEffect(() => {
    if (show && !productToEdit) {
      setValue('internalId', getLatestInternalId(productList) + 1);
    }

    if (productToEdit) {
      const keys = Object.keys(productToEdit) as (keyof Product)[];

      keys.forEach((field) => {
        setValue(field, productToEdit[field]);
      });
    }
  }, [productList, productToEdit, setValue, show]);

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
