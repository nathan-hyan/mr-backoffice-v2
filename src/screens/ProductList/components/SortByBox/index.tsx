import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { useProducts } from '~contexts/Products';
import { SortBy } from '~contexts/Products/constants';

function SortByBox() {
  const { sortBy, handleSort } = useProducts();

  const handleSortBy = (event: SelectChangeEvent<SortBy>) => {
    const { value } = event.target;

    handleSort(value as SortBy);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Ordenar por:</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={sortBy}
          label='Seleccione una opcion...'
          onChange={handleSortBy}
        >
          <MenuItem value={SortBy.Name}>Nombre alfabético</MenuItem>
          <MenuItem value={SortBy.LastModified}>Última modificación</MenuItem>
          <MenuItem value={SortBy.InternalId}>ID Interno</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
}
export default SortByBox;
