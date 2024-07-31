import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteOutline, Edit } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Collapse,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TableCell,
  TableRow,
} from '@mui/material';
import type { Product } from 'types/data';
import { Nullable } from 'vite-env';

import CustomMenu from '~components/CustomMenu/CustomMenu';
import DeleteAlert from '~components/DeleteAlert/DeleteAlert';
import { FirestoreCollections } from '~constants/firebase';
import { useFirestore } from '~hooks';
import calculateNumberWithPercentage from '~utils/addPercentage';

import { ProductDetail } from './components';

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
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { removeDocument } = useFirestore(FirestoreCollections.Products);

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
      translatedCategory,
      translatedSubCategory,
      barcode,
    } = props.data;

    const deleteProduct = () => {
      removeDocument(id, () => {
        setMarkedForDeletion(null);
      });
    };

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
          <TableCell>
            <IconButton size='small' onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{internalId}</TableCell>
          <TableCell>{name}</TableCell>
          <TableCell>{stock.current}</TableCell>
          <TableCell>${(Number(prices.cost.value) || 0).toFixed(2)}</TableCell>
          <TableCell>
            $
            {(
              Number(
                calculateNumberWithPercentage(
                  prices.cost?.value,
                  prices.retail?.value,
                  'incr'
                )
              ) || 0
            ).toFixed(2)}
          </TableCell>
          <TableCell>
            $
            {(
              Number(
                calculateNumberWithPercentage(
                  prices.cost?.value,
                  prices.online?.value,
                  'incr'
                )
              ) || 0
            ).toFixed(2)}
          </TableCell>
          <TableCell>
            {translatedCategory?.name} / {translatedSubCategory?.name}
          </TableCell>
          <TableCell>{barcode}</TableCell>
          <TableCell>{date ? date.toLocaleDateString('es-ES') : '-'}</TableCell>
          <TableCell>
            <CustomMenu>
              <MenuItem
                onClick={() => {
                  navigate(`/edit/${id}`);
                }}
              >
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
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <ProductDetail
                data={props.data}
                category={translatedCategory?.name}
                subCategory={translatedSubCategory?.name}
              />
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }
  if (props.header === 'show') {
    return (
      <TableRow>
        <TableCell />
        <TableCell>ID</TableCell>
        <TableCell>Nombre</TableCell>
        <TableCell>Stock</TableCell>
        <TableCell>Costo</TableCell>
        <TableCell>Retail</TableCell>
        <TableCell>Web</TableCell>
        <TableCell>Categoria</TableCell>
        <TableCell>Codigo de barras</TableCell>
        <TableCell>Ult. Mod. Precio Costo</TableCell>
        <TableCell />
      </TableRow>
    );
  }
}

export default Row;
