import { ActionFunctionArgs } from 'react-router-dom';
import {
  AllInbox,
  AttachMoney,
  AutoFixHigh,
  FormatListNumbered,
  LocalOffer,
  PlusOne,
} from '@mui/icons-material';
import { QueryClient } from '@tanstack/react-query';
import { Product } from 'types/data';

import {
  AddEditProduct,
  addEditProductLoader,
  BrandManager,
  brandManagerLoader,
  CategoryManager,
  categoryManagerLoader,
  Login,
  Playground,
  PriceModifier,
  PriceTagGenerator,
  ProductList,
  productListLoader,
  UserInfo,
} from '~screens';

import App from '../App';

export const ROUTES = (queryClient?: QueryClient) => [
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
    path: 'playground',
    element: <Playground />,
  },
  {
    id: 1,
    title: 'Iniciar sesión',
    description: '',
    path: 'login',
    element: <Login />,
  },
  {
    id: 2,
    title: 'Perfil del usuario',
    description: '',
    path: 'profile',
    element: <UserInfo />,
  },
  {
    id: 3,
    title: 'Listado de Productos',
    description: '',
    icon: <FormatListNumbered />,
    path: 'products',
    loader: queryClient ? productListLoader(queryClient) : undefined,
    element: <ProductList />,
  },
  {
    id: 8,
    title: 'Agregar Producto',
    description: 'Agregando Producto',
    icon: <PlusOne />,
    path: 'add',
    loader: queryClient ? addEditProductLoader(queryClient) : undefined,
    element: <AddEditProduct />,
    children: [
      {
        path: 'addProduct',
        action: async ({ request }: ActionFunctionArgs) => {
          const formData = await request.formData();
          let body: Product = {} as Product;
          formData.forEach((value, key) => {
            body = { ...body, [key]: value };
          });

          let stock = { ...body.stock };

          if (body.stock.noPhysicalStock) {
            stock = {
              current: 0,
              maxStock: 0,
              minStock: 0,
              noPhysicalStock: true,
            };
          }

          console.log({ ...body, stock });
          return null;
        },
      },
    ],
  },
  {
    id: 9,
    title: 'Editar Producto',
    description: 'Editando Producto',
    path: 'edit/:id',
    loader: queryClient ? addEditProductLoader(queryClient) : undefined,
    element: <AddEditProduct editMode />,
  },
  {
    id: 4,
    icon: <AttachMoney />,
    title: 'Modif. Precios en lote',
    description: '',
    path: 'priceModifier',
    element: <PriceModifier />,
  },
  {
    id: 5,
    icon: <AllInbox />,
    title: 'Administrador de Categorias',
    description: '',
    path: 'categoryManager',
    loader: queryClient ? categoryManagerLoader(queryClient) : undefined,
    element: <CategoryManager />,
  },
  {
    id: 6,
    icon: <LocalOffer />,
    title: 'Administrador de Marcas',
    description: '',
    path: 'brandManager',
    loader: queryClient ? brandManagerLoader(queryClient) : undefined,
    element: <BrandManager />,
  },
  {
    id: 7,
    icon: <AutoFixHigh />,
    title: 'Generador de etiquetas de precio',
    loader: queryClient ? productListLoader(queryClient) : undefined,
    description: '',
    path: 'pricetaggenerator',
    element: <PriceTagGenerator />,
  },
];
