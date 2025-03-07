import {
  AllInbox,
  AttachMoney,
  AutoFixHigh,
  FormatListNumbered,
  LocalOffer,
  LocalShipping,
  PlusOne,
  PointOfSale,
  RequestQuote,
} from '@mui/icons-material';

import BudgetManager from '~screens/BudgetScreen/budgetManager';
import {
  AddEditProduct,
  BrandManager,
  CategoryManager,
  Login,
  Playground,
  PriceModifier,
  PriceTagGenerator,
  ProductList,
  UserInfo,
} from '~screens/index';
import Providers from '~screens/Providers';
import ProvidersDetails from '~screens/Providers/ProvidersDetails';
import BillsPreview from '~screens/Solds/Bills/billsPreview';
import SearchScreen from '~screens/Solds/searchScreen';

import App from '../App';

export const ROUTES = [
  {
    id: 0,
    path: '/',
    title: 'Bienvenid@',
    description: '',
    element: <App />,
  },
  {
    id: 99,
    title: 'Playground',
    description: "You're not supposed to be here",
    path: '/playground',
    element: <Playground />,
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
    id: 8,
    title: 'Agregar Producto',
    description: 'Agregando Producto',
    icon: <PlusOne />,
    path: '/add',
    element: <AddEditProduct />,
  },
  {
    id: 9,
    title: 'Editar Producto',
    description: 'Editando Producto',
    path: '/edit/:id',
    element: <AddEditProduct editMode />,
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
  {
    id: 7,
    icon: <AutoFixHigh />,
    title: 'Generador de etiquetas de precio',
    description: '',
    path: '/pricetaggenerator',
    element: <PriceTagGenerator />,
  },
  {
    id: 10,
    icon: <RequestQuote />,
    title: 'Administrador de Presupuestos',
    description: '',
    path: '/budgetManager',
    element: <BudgetManager />,
  },
  {
    id: 11,
    icon: <PointOfSale />,
    title: 'Ventas',
    description: '',
    path: '/sells',
    element: <SearchScreen />,
  },
  {
    id: 12,
    title: 'bills',
    description: '',
    path: '/bills',
    element: <BillsPreview />,
  },
  {
    id: 13,
    icon: <LocalShipping />,
    title: 'Proveedores',
    description: '',
    path: '/providers',
    element: <Providers />,
  },
  {
    id: 14,

    title: 'ProveedoresDetails',
    description: '',
    path: '/provider-details',
    element: <ProvidersDetails />,
  },
];
