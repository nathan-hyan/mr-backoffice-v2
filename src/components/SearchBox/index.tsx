import { ChangeEventHandler, MouseEvent } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material';
import { Nullable } from 'vite-env';

import { useProducts } from '~contexts/Products';

function SearchBox() {
    const { performSearch, searchQuery, clearSearch, searchCriteria } =
        useProducts();

    const handleChangeValue: ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (e) => {
        const { value } = e.target;

        performSearch(value, searchCriteria);
    };

    const handleClearInput = () => {
        clearSearch();
    };

    const handleChangeSearch: (
        event: MouseEvent<HTMLElement, globalThis.MouseEvent>,
        value: Nullable<number>
    ) => void = (_, newValue) => {
        if (typeof newValue === 'number') {
            performSearch(searchQuery, newValue);
        }
    };

    return (
        <Paper
            sx={{
                p: 3,
            }}
        >
            <TextField
                sx={{
                    width: '100%',
                }}
                value={searchQuery}
                onChange={handleChangeValue}
                id="standard-basic"
                label="Buscar un producto..."
                variant="standard"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                color="warning"
                                onClick={handleClearInput}
                            >
                                <HighlightOffIcon />
                            </IconButton>
                            <IconButton color="primary">
                                <ArrowForwardIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <ToggleButtonGroup
                color="primary"
                value={searchCriteria}
                exclusive
                onChange={handleChangeSearch}
                size="small"
                fullWidth
                aria-label="Platform"
                sx={{
                    mt: 3,
                }}
            >
                <ToggleButton value={0}>Nombre Prod.</ToggleButton>
                <ToggleButton value={1}>Cod. Barras</ToggleButton>
            </ToggleButtonGroup>
        </Paper>
    );
}
export default SearchBox;
