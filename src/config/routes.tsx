import {
  AllInbox,
  AttachMoney,
  AutoFixHigh,
  FormatListNumbered,
  LocalOffer,
  PlusOne,
} from '@mui/icons-material';
import { QueryClient } from '@tanstack/react-query';
import { Category } from 'types/data';

import {
  AddEditProduct,
  addEditProductLoader,
  addProductAction,
  BrandManager,
  brandManagerLoader,
  CategoryManager,
  categoryManagerLoader,
  editProductAction,
  Login,
  Playground,
  PriceModifier,
  PriceTagGenerator,
  ProductList,
  productListAction,
  productListLoader,
  UserFeedbackTesting,
  userFeedbackTestingAction,
  UserInfo,
} from '~screens';
import {
  CurrentCategory,
  currentCategoryLoader,
} from '~screens/CategoryManager/components';

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
    id: 98,
    title: 'uft',
    description: "You're not supposed to be here",
    path: 'uft',
    element: <UserFeedbackTesting />,
    children: [
      {
        path: 'add',
        action: queryClient
          ? userFeedbackTestingAction(queryClient)
          : undefined,
      },
    ],
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
    children: [
      {
        path: 'tsis/:id',
        action: queryClient ? productListAction(queryClient) : undefined,
      },
    ],
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
        action: queryClient ? addProductAction(queryClient) : undefined,
      },
    ],
  },
  {
    id: 9,
    title: 'Editar Producto',
    description: 'Editando Producto',
    path: 'edit/:id',
    loader: queryClient ? addEditProductLoader(queryClient) : undefined,
    element: <AddEditProduct />,
    children: [
      {
        path: 'editProduct',
        action: queryClient ? editProductAction(queryClient) : undefined,
      },
    ],
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
    children: [
      {
        path: ':id',
        loader: queryClient ? currentCategoryLoader(queryClient) : undefined,
        element: (
          <CurrentCategory
            currentCategory={{} as Category}
            removeSubcategory={function (arg0: Category[]): void {
              console.log(arg0);
              throw new Error('Function not implemented.');
            }}
            openModal={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        ),
      },
    ],
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
