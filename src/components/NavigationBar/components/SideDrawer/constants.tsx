import {
    AllInbox,
    AttachMoney,
    FormatListNumbered,
    Print,
    ShoppingCartCheckout,
} from '@mui/icons-material';

export const OPTIONS = [
    {
        id: 0,
        title: 'Listado de Productos',
        icon: <FormatListNumbered />,
        whereTo: '/products',
    },
    {
        id: 1,
        title: 'Punto de venta',
        icon: <ShoppingCartCheckout />,
        whereTo: '/cart',
    },
    {
        id: 2,
        title: 'Imprimir list. productos',
        icon: <Print />,
        whereTo: '/printProducts',
    },
    {
        id: 3,
        title: 'Modif. precios en lote',
        icon: <AttachMoney />,
        whereTo: '/priceModifier',
    },
    {
        id: 3,
        title: 'Administrador de Categorias',
        icon: <AllInbox />,
        whereTo: '/categoryManager',
    },
];
