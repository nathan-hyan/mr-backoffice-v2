import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';

import { useProviders } from '~contexts/Providers';

import styles from './styles.module.scss';

import {
  Dimensions,
  KioskInformation,
  Prices,
  Specifications,
  Variants,
} from './components';
import ImageSelection from './components/Information/components/ImageSelection/ImageSelection';
import Information from './components/Information/Information';
import Stock from './components/Stock/Stock';
import useProductModal from './hook';

function AddEditProduct() {
  const { id } = useParams();

  const {
    fillFakeData,
    handleCancel,
    onSubmit,
    checkForErrors,
    handleSubmit,
    control,
    creatingLoading,
    errors,
    setValue,
    watch,
  } = useProductModal({
    productIdToEdit: id || null,
  });
  const { fetchProviders } = useProviders();

  useEffect(() => {
    const unsubscribe = fetchProviders();
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const images = watch('imageURL').filter(Boolean);

  function getTodayFormattedEs() {
    const meses = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ];
    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = meses[hoy.getMonth()];
    const anio = hoy.getFullYear();
    return `${dia} de ${mes} de ${anio}`;
  }

  const fechaHoy = getTodayFormattedEs();

  return (
    <div className={styles.container}>
      {import.meta.env.VITE_LOCAL_ENV && (
        <Button onClick={fillFakeData}>Fill with fake data</Button>
      )}

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.header}>
          <div>
            {' '}
            <h4>Formulario nuevo producto</h4>
            <p>{fechaHoy}</p>
          </div>
          <div className={styles.actions}>
            <button
              className={styles.cancelButton}
              type='button'
              onClick={handleCancel}
              disabled={creatingLoading}
            >
              Cancelar
            </button>
            <button
              className={styles.saveButton}
              type='submit'
              disabled={creatingLoading}
              onClick={checkForErrors}
            >
              Guardar
            </button>
          </div>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.formLeft}>
            <Information
              setValue={setValue}
              control={control}
              watch={watch}
              errors={errors}
            />
            <Stock
              control={control}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
            <Specifications control={control} errors={errors} />{' '}
            <Variants control={control} errors={errors} />
            <ImageSelection data={images} setValue={setValue} watch={watch} />
          </div>
          <div className={styles.formRight}>
            <Prices
              control={control}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
            <KioskInformation
              control={control}
              errors={errors}
              setValue={setValue}
            />
            <Dimensions control={control} errors={errors} />
          </div>
        </div>
      </form>
    </div>
  );
}
export default AddEditProduct;
