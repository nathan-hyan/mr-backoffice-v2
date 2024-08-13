import { useSubmit } from 'react-router-dom';
import { DeleteOutline, Edit } from '@mui/icons-material';
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  TableCell,
  TableRow,
} from '@mui/material';
import type { Brand } from 'types/data';

import { CustomMenu } from '~components';

interface Props {
  brand?: Brand;
}

function BrandTableRow({ brand = undefined }: Props) {
  if (!brand) {
    return null;
  }

  const submit = useSubmit();

  const handleDeleteBrand = () => {
    const result = window.prompt(
      'Va a eliminar la marca, para confirmar presiona OK'
    );
    if (result?.toUpperCase() === 'OK') {
      submit(null, {
        method: 'delete',
        action: `/brandManager/destroy/${brand.id}`,
      });
    }
  };

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
          <MenuItem onClick={handleDeleteBrand}>
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
