import { useState } from 'react';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
} from '@mui/material';

function SortByBox() {
    const [sortBy, setSortBy] = useState(0);

    const handleSortBy = (event: SelectChangeEvent<number>) => {
        const { value } = event.target;

        setSortBy(Number(value));
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
                    <MenuItem value={0}>Nombre alfabético</MenuItem>
                    <MenuItem value={1}>Última modificación</MenuItem>
                    <MenuItem value={2}>ID Interno</MenuItem>
                </Select>
            </FormControl>
        </Paper>
    );
}
export default SortByBox;
