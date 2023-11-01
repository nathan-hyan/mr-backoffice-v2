import {
    AllInbox,
    AttachMoney,
    FormatListNumbered,
    LocalOffer,
} from '@mui/icons-material';

import App from '../App';

import BrandManager from '~screens/BrandManager';
import CategoryManager from '~screens/CategoryManager';
import Login from '~screens/Login';
import PriceModifier from '~screens/PriceModifier';
import ProductList from '~screens/ProductList';
import UserInfo from '~screens/UserInfo';

export const ROUTES = [
    {
        id: 0,
        path: '/',
        title: 'Bienvenid@',
        description: '',
        element: <App />,
    },
    {
        id: 1,
        title: 'Iniciar sesión',
        description: '',
        path: '/login',
        element: <Login />,
    },
    {
        id: 2,
        title: 'Perfil del usuario',
        description: '',
        path: '/profile',
        element: <UserInfo />,
    },
    {
        id: 3,
        title: 'Listado de Productos',
        description: '',
        icon: <FormatListNumbered />,
        path: '/products',
        element: <ProductList />,
    },
    {
        id: 4,
        icon: <AttachMoney />,
        title: 'Modif. Precios en lote',
        description: '',
        path: '/priceModifier',
        element: <PriceModifier />,
    },
    {
        id: 5,
        icon: <AllInbox />,
        title: 'Administrador de Categorias',
        description: '',
        path: '/categoryManager',
        element: <CategoryManager />,
    },
    {
        id: 6,
        icon: <LocalOffer />,
        title: 'Administrador de Marcas',
        description: '',
        path: '/brandManager',
        element: <BrandManager />,
    },
];

/** {
        id: 0,
        title: 'Listado de Productos',
        description: '',
        icon: <FormatListNumbered />,
        whereTo: '/products',
    },
    {
        id: 1,
        title: 'Punto de venta',
        description: '',
        icon: <ShoppingCartCheckout />,
        whereTo: '/cart',
    },
    {
        id: 2,
        title: 'Imprimir list. productos',
        description: '',
        icon: <Print />,
        whereTo: '/printProducts',
    },
    {
        id: 3,
        title: 'Modif. precios en lote',
        description: '',
        icon: <AttachMoney />,
        whereTo: '/priceModifier',
    },
    {
        id: 3,
        title: 'Administrador de Categorias',
        description: '',
        icon: <AllInbox />,
        whereTo: '/categoryManager',
    }, */
