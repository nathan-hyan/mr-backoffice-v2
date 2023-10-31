import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import './index.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import NavbarWrapper from '~components/NavbarWrapper';
import { THEME } from '~config/muiTheme';
import { ROUTES } from '~config/routes';
import ProductProvider from '~contexts/Products';
import { UserContextProvider } from '~contexts/User';

const root = document.getElementById('root');

const theme = createTheme(THEME);

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <HelmetProvider>
                <UserContextProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline enableColorScheme />
                        <ProductProvider>
                            <NavbarWrapper />
                        </ProductProvider>
                    </ThemeProvider>
                </UserContextProvider>
            </HelmetProvider>
        ),
        children: ROUTES.map(({ path, element }) => ({ path, element })),
    },
]);

if (root) {
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}
