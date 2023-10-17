import { red } from '@mui/material/colors';

export const THEME = {
    components: {
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: red[300],

                        '&:hover': {
                            backgroundColor: red[500],
                        },
                    },
                },
            },
        },
    },
};
