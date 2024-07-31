import { Form } from 'react-router-dom';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { CustomInputAdornment } from './components';
import { styles } from './SearchBox.styles';

function SearchBox() {
  const queryClient = useQueryClient();
  return (
    <Form
      method='get'
      action='/products'
      onSubmit={() => queryClient.invalidateQueries({ queryKey: ['products'] })}
    >
      <Paper sx={{ p: 3 }}>
        <TextField
          sx={styles.textField}
          name='q'
          id='standard-basic'
          label='Buscar un producto (Dejar vacío para ver todos)...'
          variant='standard'
          InputProps={{
            endAdornment: <CustomInputAdornment />,
          }}
        />
        <FormControl sx={styles.toggleButtonGroup}>
          <FormLabel id='search-criteria'>Criteria:</FormLabel>
          <RadioGroup
            row
            aria-labelledby='search-criteria'
            defaultValue='name'
            name='sc'
          >
            <FormControlLabel
              value='name'
              control={<Radio />}
              label='Nombre de producto'
            />
            <FormControlLabel
              value='barcode'
              control={<Radio />}
              label='Código de barras'
            />
          </RadioGroup>
        </FormControl>
      </Paper>
      <Paper sx={styles.sortBy}>
        <FormControl fullWidth>
          <InputLabel id='sort-by'>Ordenar por:</InputLabel>
          <Select
            labelId='sort-by'
            id='sort-by'
            name='sb'
            defaultValue='name'
            label='Seleccione una opcion...'
          >
            <MenuItem value='name'>Nombre alfabético</MenuItem>
            <MenuItem value='lastModified'>Última modificación</MenuItem>
            <MenuItem value='internalId'>ID Interno</MenuItem>
          </Select>
        </FormControl>
      </Paper>
    </Form>
  );
}
export default SearchBox;
