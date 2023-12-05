import { DeleteOutline, Edit } from '@mui/icons-material';
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  TableCell,
  TableRow,
} from '@mui/material';
import { Brand } from 'types/data';
import { Nullable, StateDispatch } from 'vite-env';

import CustomMenu from '~components/CustomMenu';

interface Props {
  brand: Nullable<Brand & { id: string }>;
  setMarkedForDeletion: StateDispatch<Nullable<Brand & { id: string }>>;
  toggleModal: (arg0: Nullable<Brand & { id: string }>) => void;
}

function BrandTableRow({ brand, toggleModal, setMarkedForDeletion }: Props) {
  return (
    <TableRow>
      <TableCell align='left'>{brand?.internalId}</TableCell>
      <TableCell width='80%'>{brand?.name}</TableCell>
      <TableCell align='right'>
        <CustomMenu>
          <MenuItem onClick={() => toggleModal(brand)}>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText>Modificar</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setMarkedForDeletion(brand || null);
            }}
          >
            <ListItemIcon>
              <DeleteOutline />
            </ListItemIcon>
            <ListItemText>Eliminar Marca</ListItemText>
          </MenuItem>
        </CustomMenu>
      </TableCell>
    </TableRow>
  );
}
export default BrandTableRow;
