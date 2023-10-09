import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
import ProductList from '~screens/ProductList';

const root = document.getElementById('root');

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <UserContextProvider>
                <ProductProvider>
                    <NavbarWrapper />
                </ProductProvider>
            </UserContextProvider>
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

window.confirm(
    `Estas en el ambiente de prueba de la aplicacion, cualquier cambio que se haga en este entorno puede ser borrado como consecuencia de pruebas aleatorias, El ambiente de produccion estara listo dentro de poco :)

clickear un par de veces en ok o cancel para continuar :D
                    `
);
