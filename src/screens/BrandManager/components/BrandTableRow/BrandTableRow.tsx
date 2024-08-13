import { DeleteOutline, Edit } from '@mui/icons-material';
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  TableCell,
  TableRow,
} from '@mui/material';
import type { Brand } from 'types/data';
import { Nullable, StateDispatch } from 'vite-env';

import { CustomMenu } from '~components';

interface Props {
  brand?: Brand;
  setMarkedForDeletion: StateDispatch<Nullable<Brand>>;
  toggleModal: (arg0: Nullable<Brand>) => void;
}

function BrandTableRow({ brand = undefined }: Props) {
  if (!brand) {
    return null;
  }

  return (
    <TableRow>
      <TableCell align='left'>{brand?.internalId}</TableCell>
      <TableCell width='80%'>{brand?.name}</TableCell>
      <TableCell align='right'>
        <CustomMenu>
          <MenuItem onClick={() => {}}>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText>Modificar</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => {}}>
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
