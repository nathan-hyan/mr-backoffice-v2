import AddEditProduct from './AddEditProduct/AddEditProduct';
import { action as addProductAction } from './AddEditProduct/AddEditProduct.action';
import { editAction as editProductAction } from './AddEditProduct/AddEditProduct.action';
import { loader as addEditProductLoader } from './AddEditProduct/AddEditProduct.loader';
import BrandManager from './BrandManager/BrandManager';
import { loader as brandManagerLoader } from './BrandManager/BrandManager.loader';
import CategoryManager from './CategoryManager/CategoryManager';
import { loader as categoryManagerLoader } from './CategoryManager/CategoryManager.loader';
import Playground from './Playground/Playground';
import PriceModifier from './PriceModifier/PriceModifier';
import PriceTagGenerator from './PriceTagGenerator/PriceTagGenerator';
import ProductList from './ProductList/ProductList';
import { action as productListAction } from './ProductList/ProductList.action';
import { loader as productListLoader } from './ProductList/ProductList.loader';
import UserFeedbackTesting from './UserFeedbackTesting/UserFeedbackTesting';
import { action as userFeedbackTestingAction } from './UserFeedbackTesting/UserFeedbackTesting.action';
import UserInfo from './UserInfo/UserInfo';

export {
  AddEditProduct,
  addEditProductLoader,
  addProductAction,
  BrandManager,
  brandManagerLoader,
  CategoryManager,
  categoryManagerLoader,
  editProductAction,
  Playground,
  PriceModifier,
  PriceTagGenerator,
  ProductList,
  productListAction,
  productListLoader,
  UserFeedbackTesting,
  userFeedbackTestingAction,
  UserInfo,
};
