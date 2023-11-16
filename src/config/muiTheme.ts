import { ThemeOptions } from '@mui/material';
import { red } from '@mui/material/colors';

export const THEME: ThemeOptions = {
  palette: {
    mode: 'dark',
  },
  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: red[500],

            '&:hover': {
              backgroundColor: red[700],
            },
          },
        },
      },
    },
  },
};
