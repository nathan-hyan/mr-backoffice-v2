import { Add, Delete, Edit } from '@mui/icons-material';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';

import { CustomMenu as Menu } from '~components';
import useModal from '~hooks/useModal';
import { AddSubCategory } from '~screens/CategoryManager/components';
import RenameCategory from '~screens/CategoryManager/components/RenameCategory/RenameCategory';

interface Props {
  onDeleteCategory: () => void;
}

function CustomMenu({ onDeleteCategory }: Props) {
  const [show, toggleShow] = useModal();
  const [showModifyName, toggleShowModifyName] = useModal();

  return (
    <>
      <AddSubCategory show={show} handleClose={toggleShow} />
      <RenameCategory
        show={showModifyName}
        handleClose={toggleShowModifyName}
      />

      <Menu>
        <MenuItem onClick={toggleShowModifyName}>
          <ListItemIcon>
            <Edit fontSize='small' />
          </ListItemIcon>
          <ListItemText>Editar nombre de la categoría</ListItemText>
        </MenuItem>
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
