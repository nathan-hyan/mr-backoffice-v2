import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga4';
import { HelmetProvider } from 'react-helmet-async';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Analytics } from '@vercel/analytics/react';

import NavbarWrapper from '~components/NavbarWrapper';
import { THEME } from '~config/muiTheme';
import {
  ROUTES,
  ROUTESA,
  ROUTESB,
  ROUTESC,
  ROUTESD,
  ROUTESE,
  ROUTESF,
} from '~config/routes';
import ProductProvider from '~contexts/Products';
import ProvidersProvider from '~contexts/Providers';
import VentasProvider from '~contexts/Sells';
import TagProvider from '~contexts/Tags';
import { UserContextProvider } from '~contexts/User';

import './index.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = document.getElementById('root');

const theme = createTheme(THEME);
ReactGA.initialize(import.meta.env.VITE_FIREBASE_MESSAGING_MEASURAMENT_ID, {
  gaOptions: { send_page_view: false },
});

const router = createHashRouter([
  {
    path: '/',
    element: (
      <HelmetProvider>
        <UserContextProvider>
          <ThemeProvider theme={theme}>
            <VentasProvider>
              <TagProvider>
                <ProvidersProvider>
                  <CssBaseline enableColorScheme />
                  <ProductProvider>
                    <NavbarWrapper />
                  </ProductProvider>
                </ProvidersProvider>
              </TagProvider>
            </VentasProvider>
          </ThemeProvider>
        </UserContextProvider>
        <Analytics />
      </HelmetProvider>
    ),
    children: [
      ...ROUTES.map(({ path, element }) => ({ path, element })),

      ...ROUTESA.map(({ path, element }) => ({ path, element })),

      ...ROUTESB.map(({ path, element }) => ({ path, element })),

      ...ROUTESC.map(({ path, element }) => ({ path, element })),

      ...ROUTESD.map(({ path, element }) => ({ path, element })),

      ...ROUTESE.map(({ path, element }) => ({ path, element })),

      ...ROUTESF.map(({ path, element }) => ({ path, element })),
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
