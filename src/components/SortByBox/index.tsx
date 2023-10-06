import {
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import { SortBy } from './constants';
import { StateDispatch } from '~config/globalConstants';

interface Props {
    sortBy: SortBy;
    setSortBy: StateDispatch<SortBy>;
}

function SortByBox({ sortBy, setSortBy }: Props) {
    const handleSortBy = (event: SelectChangeEvent<SortBy>) => {
        const { value } = event.target;

        setSortBy(value as SortBy);
    };

    return (
        <Paper sx={{ p: 3 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                    Ordenar por:
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sortBy}
                    label="Seleccione una opcion..."
                    onChange={handleSortBy}
                >
                    <MenuItem value={SortBy.Name}>Nombre alfabético</MenuItem>
                    <MenuItem value={SortBy.LastModified}>
                        Última modificación
                    </MenuItem>
                    <MenuItem value={SortBy.InternalId}>ID Interno</MenuItem>
                </Select>
            </FormControl>
        </Paper>
    );
}
export default SortByBox;
