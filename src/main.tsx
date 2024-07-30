import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga4';
import { HelmetProvider } from 'react-helmet-async';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Analytics } from '@vercel/analytics/react';

import { NavbarWrapper } from '~components';
import { THEME } from '~config/muiTheme';
import { ROUTES } from '~config/routes';
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 15,
    },
  },
});

const router = createHashRouter([
  {
    path: '/',
    element: (
      <HelmetProvider>
        <UserContextProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <NavbarWrapper />
          </ThemeProvider>
        </UserContextProvider>
        <Analytics />
      </HelmetProvider>
    ),
    children: ROUTES(queryClient).map(({ path, element, loader }) => ({
      path,
      element,
      loader,
    })),
  },
]);

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools buttonPosition='bottom-right' />
      </QueryClientProvider>
    </React.StrictMode>
  );
}
