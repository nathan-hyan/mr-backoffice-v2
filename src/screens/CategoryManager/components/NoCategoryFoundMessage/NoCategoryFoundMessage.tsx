import { ListItemText, Typography } from '@mui/material';

import { styles } from './NoCategoryFoundMessage.styles';

function NoCategoryFoundMessage() {
  return (
    <>
      <ListItemText sx={styles.noSubcategoriesText}>
        <Typography variant='h4'>No se encontraron sub-categorias</Typography>
      </ListItemText>
      <ListItemText sx={styles.addCategoryButton}>
        <Typography variant='body1'>
          Por favor, agregue una categoría para continuar
        </Typography>
      </ListItemText>
    </>
  );
}
export default NoCategoryFoundMessage;
