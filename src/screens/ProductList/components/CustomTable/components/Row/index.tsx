/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/destructuring-assignment */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch, TableCell, TableRow } from '@mui/material';
import { Product } from 'types/data';
import { Nullable } from 'vite-env';

import defaultProduct from '~assets/defaultProduct.jpg';
import edit from '~assets/editar-texto.svg';
import mas from '~assets/mas2.svg';
import ojo from '~assets/ojo.svg';
import DeleteAlert from '~components/DeleteAlert';
import { FirestoreCollections } from '~constants/firebase';
import useCategoryTranslator from '~hooks/useCategoryTranslator';
import useFirestore from '~hooks/useFirestore';
import calculateNumberWithPercentage from '~utils/addPercentage';

import styles from './styles.module.scss';

type Props =
  | {
      header: 'hidden';
      data?: Product;
    }
  | { header: 'show' };

function Row(props: Props) {
  const { header } = props;

  const [markedForDeletion, setMarkedForDeletion] =
    useState<Nullable<Product>>(null);
  const navigate = useNavigate();
  const { removeDocument, updateDocument } = useFirestore(
    FirestoreCollections.Products
  );
  const { translateCategories } = useCategoryTranslator();

  const handleOnClick = (id: number) => () => {
    return id;
  };

  if (header === 'hidden' && props.data) {
    const {
      id,
      internalId,
      name,
      stock,
      prices,
      category: untranslatedCategory,
      subCategory: untranslatedSubCategory,
      barcode,
      imageURL,
    } = props.data;

    const { translatedCategory: category, translatedSubCategory: subCategory } =
      translateCategories(untranslatedCategory, untranslatedSubCategory);

    const deleteProduct = () => {
      removeDocument(id, () => {
        setMarkedForDeletion(null);
      });
    };

    const handleToggle = (field: 'isActive' | 'isEcom', value: boolean) => {
      if (!props.data) return;
      updateDocument(props.data.id, { id: props.data.id, [field]: value });
    };

    const sliced = (id: string) => id.slice(0, 6);

    const defaultImage = defaultProduct;
    const imageSrc =
      imageURL?.[0] && imageURL[0].trim() !== '' ? imageURL[0] : defaultImage;

    const date = prices.cost.lastModified
      ? prices.cost.lastModified.toDate()
      : null;

    return (
      <>
        <DeleteAlert
          open={Boolean(markedForDeletion)}
          onClose={() => setMarkedForDeletion(null)}
          onDelete={deleteProduct}
          stringToMatch={markedForDeletion ? name : ''}
        />

        <TableRow
          selected={stock.current <= stock.minStock && !stock.noPhysicalStock}
          hover
          onClick={handleOnClick(internalId)}
          sx={{
            cursor: 'pointer',
          }}
        >
          <TableCell>{sliced(id)}</TableCell>
          <TableCell>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img
                src={imageSrc}
                alt={name}
                style={{
                  width: '32px',
                  height: '32px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                }}
              />
              <span>{name}</span>
            </div>
          </TableCell>

          <TableCell>{barcode}</TableCell>
          <TableCell>
            {category?.name} / {subCategory?.name}
          </TableCell>

          <TableCell>
            <Switch
              checked={props.data?.isActive ?? false}
              onChange={(e) => handleToggle('isActive', e.target.checked)}
              color='primary'
              sx={{
                '& .MuiSwitch-thumb': {
                  backgroundColor: props.data?.isActive
                    ? '#7B61FF'
                    : '#d8d7d7ff',
                },
                '& .MuiSwitch-track': {
                  backgroundColor: props.data?.isActive
                    ? '#D6DCFF'
                    : '#000000ff',
                },
              }}
            />
          </TableCell>
          <TableCell>
            <Switch
              checked={props.data?.isEcom ?? false}
              onChange={(e) => handleToggle('isEcom', e.target.checked)}
              color='success'
              sx={{
                '& .MuiSwitch-thumb': {
                  backgroundColor: props.data?.isEcom
                    ? '#61ff7bff'
                    : '#fc3f3fff',
                },
                '& .MuiSwitch-track': {
                  backgroundColor: props.data?.isEcom
                    ? '#f3f3f3ff'
                    : '#ff0000ff',
                },
              }}
            />
          </TableCell>

          <TableCell>${(Number(prices.cost.value) || 0).toFixed(2)}</TableCell>
          <TableCell>
            $
            {(
              Number(
                calculateNumberWithPercentage(
                  prices.cost?.value,
                  prices.retail1?.value ?? prices.retail?.value,
                  'incr'
                )
              ) || 0
            ).toFixed(2)}
          </TableCell>
          <TableCell>{stock.current}</TableCell>
          <TableCell>{date ? date.toLocaleDateString('es-ES') : '-'}</TableCell>
          <TableCell>
            <div className={styles.actionButton}>
              <button className={styles.button} type='button'>
                <img src={ojo} alt='ver' />
              </button>
              <button
                className={styles.button}
                type='button'
                onClick={() => {
                  navigate(`/edit/${id}`);
                }}
              >
                <img src={edit} alt='edit' />
              </button>
              <button
                className={styles.button}
                type='button'
                onClick={() => {
                  setMarkedForDeletion(props.data || null);
                }}
              >
                <img src={mas} alt='ver mas' />
              </button>
            </div>
          </TableCell>
        </TableRow>
      </>
    );
  }

  if (props.header === 'show') {
    return (
      <TableRow sx={{ backgroundColor: '#D6DCFF' }}>
        <TableCell>ID</TableCell>
        <TableCell>Nombre</TableCell>
        <TableCell>Codigo de barras</TableCell>
        <TableCell>Categoria</TableCell>
        <TableCell>Activ</TableCell>
        <TableCell>Ecom</TableCell>
        <TableCell>Costo</TableCell>
        <TableCell>Retail</TableCell>
        <TableCell>Stock</TableCell>
        <TableCell>Ult. Mod. Precio Costo</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    );
  }
}

export default Row;
