import { FiberManualRecord } from '@mui/icons-material';

import addClient from '~assets/Agregar cliente.png';
import addProd from '~assets/Agregar producto.png';
import addProv from '~assets/Agregar Provedor.png';
import Banners from '~assets/Banners.png';
import belgrano from '~assets/Belgrano2846.png';
import Categorizacion from '~assets/Categorizacion.png';
import dashboard from '~assets/Dashboard.png';
import ecommerce from '~assets/Ecomerce.png';
import ticket from '~assets/Generador etiquetas.png';
import paginas from '~assets/LinkPagina.png';
import clientList from '~assets/Listado Clientes.png';
import ProdList from '~assets/Listado de Productos.png';
import exportProduct from '~assets/Listado producto.png';
import Marcas from '~assets/Marcas.png';
import lote from '~assets/Modificacion precio lote.png';
import Ofertas from '~assets/Ofertas.png';
import pedidos from '~assets/Pedidos Sitio.png';
import PosIcon from '~assets/POS.png';
import provedores from '~assets/Provedores.jpg';
import Ventas from '~assets/Ventas.png';
import AnalyticsScreen from '~screens/Analitycs/analitycs';
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
    icon: <img src={PosIcon} alt='P.O.S' style={{ width: 30, height: 30 }} />,
    title: 'P.O.S',
    description: '',
    path: '/budgetManager',
    element: <BudgetManager />,
  },
  {
    id: 16,
    icon: <img src={Ventas} alt='ventas' style={{ width: 30, height: 30 }} />,
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
    icon: (
      <img
        src={ProdList}
        alt='listado de productos'
        style={{ width: 30, height: 30 }}
      />
    ),
    path: '/products',
    element: <ProductList />,
  },
  {
    id: 19,
    title: 'Agregar Producto',
    description: 'Agregando Producto',
    icon: (
      <img
        src={addProd}
        alt='agregar producto'
        style={{ width: 30, height: 30 }}
      />
    ),
    path: '/add',
    element: <AddEditProduct />,
  },
  {
    id: 20,
    icon: (
      <img
        src={Categorizacion}
        alt='administrador de categorias'
        style={{ width: 30, height: 30 }}
      />
    ),
    title: 'Administrador de Categorias',
    description: '',
    path: '/categoryManager',
    element: <CategoryManager />,
  },
  {
    id: 21,
    icon: (
      <img
        src={Marcas}
        alt='administrador de marcas'
        style={{ width: 30, height: 30 }}
      />
    ),
    title: 'Administrador de Marcas',
    description: '',
    path: '/brandManager',
    element: <BrandManager />,
  },
  {
    id: 22,
    icon: (
      <img
        src={ticket}
        alt='generador de etiquetas'
        style={{ width: 30, height: 30 }}
      />
    ),
    title: 'Generador de etiquetas de precio',
    description: '',
    path: '/pricetaggenerator',
    element: <PriceTagGenerator />,
  },
  {
    id: 23,
    icon: (
      <img
        src={lote}
        alt='modificacion precio lote'
        style={{ width: 30, height: 30 }}
      />
    ),
    title: 'Modif. Precios en lote',
    description: '',
    path: '/priceModifier',
    element: <PriceModifier />,
  },
  {
    id: 24,
    icon: <img src={Ofertas} alt='ofertas' style={{ width: 30, height: 30 }} />,
    title: 'Ofertas',
    description: '',
    path: '/WorkInProgress',
    element: <WorkInProgress />,
  },
  {
    id: 25,
    icon: (
      <img
        src={exportProduct}
        alt='Exporta listado de productos'
        style={{ width: 30, height: 30 }}
      />
    ),
    title: 'Exporta Listado de productos',
    description: '',
    path: '/priceList',
    element: <PriceList />,
  },
];

export const ROUTESC = [
  {
    id: 26,
    icon: (
      <img
        src={clientList}
        alt='Listado de clientes'
        style={{ width: 30, height: 30 }}
      />
    ),
    title: 'Lista Clientes',
    description: '',
    path: '/WorkInProgress',
    element: <WorkInProgress />,
  },
  {
    id: 27,
    icon: (
      <img
        src={addClient}
        alt='Agregar cliente'
        style={{ width: 30, height: 30 }}
      />
    ),
    title: 'Agregar Cliente',
    description: '',
    path: '/WorkInProgress',
    element: <WorkInProgress />,
  },
];

export const ROUTESD = [
  {
    id: 28,
    icon: (
      <img
        src={provedores}
        alt='Provedores'
        style={{ width: 30, height: 30 }}
      />
    ),
    title: 'Proveedores',
    description: '',
    path: '/providers',
    element: <Providers />,
  },
  {
    id: 29,
    icon: (
      <img
        src={addProv}
        alt='agregar provedor'
        style={{ width: 30, height: 30 }}
      />
    ),
    title: 'Agregar Proveedores',
    description: '',
    path: '/WorkInProgress',
    element: <WorkInProgress />,
  },
];

export const ROUTESE = [
  {
    id: 30,
    icon: <img src={Banners} alt='banners' style={{ width: 30, height: 30 }} />,
    title: 'Banners',
    description: '',
    path: '/WorkInProgress',
    element: <WorkInProgress />,
  },
  {
    id: 31,
    icon: <img src={pedidos} alt='pedidos' style={{ width: 30, height: 30 }} />,
    title: 'Pedidos',
    description: '',
    path: '/WorkInProgress',
    element: <WorkInProgress />,
  },
  {
    id: 32,
    icon: (
      <img src={paginas} alt='link paginas' style={{ width: 30, height: 30 }} />
    ),
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
    icon: (
      <img
        src={dashboard}
        alt='Dashboard general'
        style={{ width: 30, height: 30 }}
      />
    ),
    title: 'Dash board General',
    description: '',
    path: '/analytics',
    element: <AnalyticsScreen />,
  },
  {
    id: 35,
    icon: (
      <img
        src={belgrano}
        alt='retal belgrano 2846'
        style={{ width: 30, height: 30 }}
      />
    ),
    title: 'Retail Belgrano 2846',
    description: '',
    path: '/WorkInProgress',
    element: <WorkInProgress />,
  },
  {
    id: 36,
    icon: (
      <img src={ecommerce} alt='Ecommerce' style={{ width: 30, height: 30 }} />
    ),
    title: 'Ecommerce',
    description: '',
    path: '/WorkInProgress',
    element: <WorkInProgress />,
  },
];
