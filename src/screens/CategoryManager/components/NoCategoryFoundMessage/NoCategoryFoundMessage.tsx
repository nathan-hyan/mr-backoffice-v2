import { Button, ListItemText } from '@mui/material';

import { styles } from './NoCategoryFoundMessage.styles';

interface Props {
  action: () => void;
}

function NoCategoryFoundMessage({ action }: Props) {
  return (
    <>
      <ListItemText sx={styles.noSubcategoriesText}>
        No se encontraron sub-categorias
      </ListItemText>
      <ListItemText sx={styles.addCategoryButton}>
        <Button variant='contained' onClick={action}>
          Agregar sub-categorías
        </Button>
      </ListItemText>
    </>
  );
}
export default NoCategoryFoundMessage;
