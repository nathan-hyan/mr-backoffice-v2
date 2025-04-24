import { FiberManualRecord } from '@mui/icons-material';

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
import PriceList from '~screens/PriceList/priceList';
import Providers from '~screens/Providers';
import ProvidersDetails from '~screens/Providers/ProvidersDetails';
import BillsPreview from '~screens/Solds/Bills/billsPreview';
import SearchScreen from '~screens/Solds/searchScreen';
import WorkInProgress from '~screens/WorkInProgress/WorkInProgress';

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
    id: 9,
    title: 'Editar Producto',
    description: 'Editando Producto',
    path: '/edit/:id',
    element: <AddEditProduct editMode />,
  },
  {
    id: 12,
    title: 'bills',
    description: '',
    path: '/bills',
    element: <BillsPreview />,
  },
  {
    id: 34,
    title: 'Detalles',
    description: '',
    path: '/provider-details',
    element: <ProvidersDetails />,
  },
  {
    id: 55,
    path: '/priceList',
    title: 'Lista de Precios',
    description: '',
    element: <PriceList />,
  },
];

export const ROUTESA = [
  {
    id: 15,
    icon: <FiberManualRecord fontSize='5px' />,
    title: 'P.O.S',
    description: '',
    path: '/budgetManager',
    element: <BudgetManager />,
  },
  {
    id: 16,
    icon: <FiberManualRecord fontSize='5px' />,
    title: 'Ventas',
    description: '',
    path: '/sells',
    element: <SearchScreen />,
  },
];

export const ROUTESB = [
  {
    id: 18,
    title: 'Listado de Productos',
    description: '',
    icon: <FiberManualRecord fontSize='5px' />,
    path: '/products',
    element: <ProductList />,
  },
  {
    id: 19,
    title: 'Agregar Producto',
    description: 'Agregando Producto',
    icon: <FiberManualRecord fontSize='5px' />,
    path: '/add',
    element: <AddEditProduct />,
  },
  {
    id: 20,
    icon: <FiberManualRecord fontSize='5px' />,
    title: 'Administrador de Categorias',
    description: '',
    path: '/categoryManager',
    element: <CategoryManager />,
  },
  {
    id: 21,
    icon: <FiberManualRecord fontSize='5px' />,
    title: 'Administrador de Marcas',
    description: '',
    path: '/brandManager',
    element: <BrandManager />,
  },
  {
    id: 22,
    icon: <FiberManualRecord fontSize='5px' />,
    title: 'Generador de etiquetas de precio',
    description: '',
    path: '/pricetaggenerator',
    element: <PriceTagGenerator />,
  },
  {
    id: 23,
    icon: <FiberManualRecord fontSize='5px' />,
    title: 'Modif. Precios en lote',
    description: '',
    path: '/priceModifier',
    element: <PriceModifier />,
  },
  {
    id: 24,
    icon: <FiberManualRecord fontSize='5px' />,
    title: 'Ofertas',
    description: '',
    path: '/WorkInProgress',
    element: <WorkInProgress />,
  },
  {
    id: 25,
    icon: <FiberManualRecord fontSize='5px' />,
    title: 'Exporta Listado de productos',
    description: '',
    path: '/WorkInProgress',
    element: <WorkInProgress />,
  },
];

export const ROUTESC = [
  {
    id: 26,
    icon: <FiberManualRecord fontSize='5px' />,
    title: 'Lista Clientes',
    description: '',
    path: '/WorkInProgress',
    element: <WorkInProgress />,
  },
  {
    id: 27,
    icon: <FiberManualRecord fontSize='5px' />,
    title: 'Agregar Cliente',
    description: '',
    path: '/WorkInProgress',
    element: <WorkInProgress />,
  },
];

export const ROUTESD = [
  {
    id: 28,
    icon: <FiberManualRecord fontSize='5px' />,
    title: 'Proveedores',
    description: '',
    path: '/providers',
    element: <Providers />,
  },
  {
    id: 29,
    icon: <FiberManualRecord fontSize='5px' />,
    title: 'Agregar Proveedores',
    description: '',
    path: '/WorkInProgress',
    element: <WorkInProgress />,
  },
];

export const ROUTESE = [
  {
    id: 30,
    icon: <FiberManualRecord fontSize='5px' />,
    title: 'Banners',
    description: '',
    path: '/WorkInProgress',
    element: <WorkInProgress />,
  },
  {
    id: 31,
    icon: <FiberManualRecord fontSize='5px' />,
    title: 'Pedidos',
    description: '',
    path: '/WorkInProgress',
    element: <WorkInProgress />,
  },
  {
    id: 32,
    icon: <FiberManualRecord fontSize='5px' />,
    title: 'Links Paginas',
    description: '',
    path: '/WorkInProgress',
    element: <WorkInProgress />,
  },
  {
    id: 33,
    icon: <FiberManualRecord fontSize='5px' />,
    title: 'Create filtered link',
    description: '',
    path: '/WorkInProgress',
    element: <WorkInProgress />,
  },
];

export const ROUTESF = [
  {
    id: 34,
    icon: <FiberManualRecord fontSize='5px' />,
    title: 'Dash board General',
    description: '',
    path: '/WorkInProgress',
    element: <WorkInProgress />,
  },
  {
    id: 35,
    icon: <FiberManualRecord fontSize='5px' />,
    title: 'Retail Belgrano 2846',
    description: '',
    path: '/WorkInProgress',
    element: <WorkInProgress />,
  },
  {
    id: 36,
    icon: <FiberManualRecord fontSize='5px' />,
    title: 'Ecommerce',
    description: '',
    path: '/WorkInProgress',
    element: <WorkInProgress />,
  },
];
