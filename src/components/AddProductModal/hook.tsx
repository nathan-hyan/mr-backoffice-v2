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
  show: boolean;
  onClose: () => void;
  productToEdit?: Nullable<Product>;
}

function useProductModal({ show, onClose, productToEdit }: Props) {
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

      return;
    }

    if (watch('imageURL').filter(Boolean).length === 0) {
      enqueueSnackbar(`Elija una imágen antes de continuar`, {
        variant: 'error',
      });

      const imageButton = document.getElementById('upload-button');

      imageButton?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'start',
      });
    }
  };

  const onSubmit = (data: Product) => {
    let stock = { ...data.stock };

    if (productToEdit) {
      updateDocument(productToEdit.id, data, () => {
        reset();
        onClose();
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

    if (data.imageURL.filter(Boolean).length < 1) {
      enqueueSnackbar(`Elija una imágen antes de continuar`, {
        variant: 'error',
      });

      return;
    }

    addDocument({
      ...data,
      stock,
      internalId: getLatestInternalId(productList) + 1,
    }).then(() => {
      reset();
      navigate(ROUTES[4].path);
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
