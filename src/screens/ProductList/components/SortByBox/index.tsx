import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { GACategories, GATypes } from '~constants/gaTagTypes';
import { useProducts } from '~contexts/Products';
import { SortBy } from '~contexts/Products/constants';
import useGATag from '~hooks/useGATag';

import styles from './styles.module.scss';

function SortByBox() {
  const { tagAction } = useGATag(true);
  const { sortBy, handleSort } = useProducts();
  const navigate = useNavigate();

  const handleSortBy = (event: SelectChangeEvent<SortBy>) => {
    const { value } = event.target;

    tagAction(GACategories.Event, GATypes.SubmittedForm, `Sorted by ${value}`);
    handleSort(value as SortBy);
  };

  const handlePriceList = () => {
    navigate('/priceList');
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
      <button onClick={handlePriceList} type='button' className={styles.button}>
        {' '}
        Lista de Precios
      </button>
    </Paper>
  );
}
export default SortByBox;
