/* eslint-disable react/destructuring-assignment */
import { useState } from 'react';
import { DeleteOutline, Edit } from '@mui/icons-material';
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  TableCell,
  TableRow,
} from '@mui/material';
import { Product } from 'types/data';
import { Nullable } from 'vite-env';

import AddProductModal from '~components/AddProductModal';
import CustomMenu from '~components/CustomMenu';
import DeleteAlert from '~components/DeleteAlert';
import { FirestoreCollections } from '~constants/firebase';
import { useProducts } from '~contexts/Products';
import useFirestore from '~hooks/useFirestore';

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
  const [showEditModal, setShowEditModal] = useState(false);

  const { getSubcategories, categories } = useProducts();
  const { removeDocument } = useFirestore(FirestoreCollections.Products);

  const handleOnClick = (id: number) => () => {
    return id;
  };

  const translateCategories = (category: string, subCategory: string) => {
    const translatedCategory = categories.find(({ id }) => category === id);
    const translatedSubCategory = getSubcategories(category).find(
      ({ internalId }) => internalId === Number(subCategory)
    );

    return { translatedCategory, translatedSubCategory };
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
    } = props.data;

    const date = prices.cost.lastModified
      ? prices.cost.lastModified.toDate()
      : null;

    const { translatedCategory: category, translatedSubCategory: subCategory } =
      translateCategories(untranslatedCategory, untranslatedSubCategory);

    const deleteProduct = () => {
      removeDocument(id, () => {
        setMarkedForDeletion(null);
      });
    };

    const toggleModal = () => {
      setShowEditModal((prevState) => !prevState);
    };

    return (
      <>
        <DeleteAlert
          open={Boolean(markedForDeletion)}
          onClose={() => setMarkedForDeletion(null)}
          onDelete={deleteProduct}
          stringToMatch={markedForDeletion ? name : ''}
        />

        {showEditModal && (
          <AddProductModal
            show={showEditModal}
            productToEdit={props.data}
            onClose={toggleModal}
          />
        )}

        <TableRow
          selected={stock <= 0}
          hover
          onClick={handleOnClick(internalId)}
          sx={{
            cursor: 'pointer',
          }}
        >
          <TableCell>{internalId}</TableCell>
          <TableCell>{name}</TableCell>
          <TableCell>{stock}</TableCell>
          <TableCell>${(Number(prices.cost.value) || 0).toFixed(2)}</TableCell>
          <TableCell>${(Number(prices.cash.value) || 0).toFixed(2)}</TableCell>
          <TableCell>${(Number(prices.list.value) || 0).toFixed(2)}</TableCell>
          <TableCell>${(Number(prices.web.value) || 0).toFixed(2)}</TableCell>
          <TableCell>
            {category?.name} / {subCategory?.name}
          </TableCell>
          <TableCell>{barcode}</TableCell>
          <TableCell>{date ? date.toLocaleDateString('es-ES') : '-'}</TableCell>
          <TableCell>
            <CustomMenu>
              <MenuItem onClick={toggleModal}>
                <ListItemIcon>
                  <Edit />
                </ListItemIcon>
                <ListItemText>Modificar</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setMarkedForDeletion(props.data || null);
                }}
              >
                <ListItemIcon>
                  <DeleteOutline />
                </ListItemIcon>
                <ListItemText>Eliminar Producto</ListItemText>
              </MenuItem>
            </CustomMenu>
          </TableCell>
        </TableRow>
      </>
    );
  }
  if (props.header === 'show') {
    return (
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Nombre</TableCell>
        <TableCell>Stock</TableCell>
        <TableCell>Costo</TableCell>
        <TableCell>Contado</TableCell>
        <TableCell>Lista</TableCell>
        <TableCell>Web</TableCell>
        <TableCell>Categoria</TableCell>
        <TableCell>Codigo de barras</TableCell>
        <TableCell>Ult. Mod. Precio Costo</TableCell>
        <TableCell />
      </TableRow>
    );
  }
}

Row.defaultProps = {
  data: {
    internalId: 'ID',
    name: 'Nombre',
    stock: 'Stock',
    prices: {
      cost: { value: 'Costo', lastModified: 'Ult. Mod. Precio Costo' },
      cash: { value: 'Contado' },
      list: { value: 'Lista' },
      web: { value: 'Web' },
    },
    category: 'Categoria',
    subCategory: 'Subcategoria',
    barcode: 'Codigo de barras',
  },
};

export default Row;
