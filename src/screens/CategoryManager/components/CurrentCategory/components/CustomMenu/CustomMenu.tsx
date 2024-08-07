import { Add, Delete } from '@mui/icons-material';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';

import { CustomMenu as Menu } from '~components';
import useModal from '~hooks/useModal';
import { AddSubCategory } from '~screens/CategoryManager/components';

interface Props {
  onDeleteCategory: () => void;
}

function CustomMenu({ onDeleteCategory }: Props) {
  const [show, toggleShow] = useModal();

  return (
    <>
      <AddSubCategory show={show} handleClose={toggleShow} />

      <Menu>
        <MenuItem onClick={toggleShow}>
          <ListItemIcon>
            <Add fontSize='small' />
          </ListItemIcon>
          <ListItemText>Agregar sub-categoría</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => onDeleteCategory()}>
          <ListItemIcon>
            <Delete fontSize='small' />
          </ListItemIcon>
          <ListItemText>Eliminar categoría</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
export default CustomMenu;
