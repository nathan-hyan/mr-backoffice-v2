import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { red } from '@mui/material/colors';

import App from './App';

import './index.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import NavbarWrapper from '~components/NavbarWrapper';
import ProductProvider from '~contexts/Products';
import { UserContextProvider } from '~contexts/User';
import Login from '~screens/Login';
import PriceModifier from '~screens/PriceModifier';
import ProductList from '~screens/ProductList';

const root = document.getElementById('root');

const theme = createTheme({
    components: {
        // Name of the component
        MuiTableRow: {
            styleOverrides: {
                // Name of the slot
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
});

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <ThemeProvider theme={theme}>
                <UserContextProvider>
                    <ProductProvider>
                        <NavbarWrapper />
                    </ProductProvider>
                </UserContextProvider>
            </ThemeProvider>
        ),
        children: [
            {
                path: '/',
                element: <App />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/products',
                element: <ProductList />,
            },
            {
                path: '/priceModifier',
                element: <PriceModifier />,
            },
        ],
    },
]);

if (root) {
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}
