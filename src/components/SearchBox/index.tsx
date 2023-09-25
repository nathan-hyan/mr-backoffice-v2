import { ChangeEventHandler, MouseEvent, useState } from 'react';
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

function SearchBox() {
    const [inputField, setInputField] = useState('');
    const [searchCriteria, setSearchCriteria] = useState(0);

    const handleChangeValue: ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (e) => {
        const { value } = e.target;

        setInputField(value);
    };

    const handleClearInput = () => {
        setInputField('');
    };

    const handleChangeSearch: (
        event: MouseEvent<HTMLElement, globalThis.MouseEvent>,
        value: number
    ) => void = (_, newValue) => {
        setSearchCriteria(newValue);
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
                value={inputField}
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
