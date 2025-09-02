import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Brand, Category, Department, Product } from 'types/data';

import { FirestoreCollections } from '~constants/firebase';
import useFirestore from '~hooks/useFirestore';

import { INITIAL_CONTEXT, SearchCriteria, SortBy } from './constants';
import { compare } from './utils';

interface Props {
  children: ReactNode;
}

const ProductContext = createContext(INITIAL_CONTEXT);

export default function ProductProvider({ children }: Props) {
  const [productList, setProductList] = useState<Product[]>([]);
  const [productListCopy, setProductListCopy] = useState<Product[]>([]);

  const [categories, saveCategories] = useState<Category[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const [brands, saveBrands] = useState<Brand[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>(
    SearchCriteria.ProductName
  );
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Name);

  const saveProducts = useCallback((products: Product[]) => {
    setProductList(products);
    setProductListCopy(products);
  }, []);
  const { subscribeToData: subscribeToDepartments } = useFirestore<Department>(
    FirestoreCollections.Departments
  );

  useEffect(() => {
    const unsubscribe = subscribeToDepartments((deps) => {
      setDepartments(deps);
    });
    return () => unsubscribe();
  }, [subscribeToDepartments]);

  const performSearch = useCallback(
    (query: string, criteria: SearchCriteria) => {
      setSearchQuery(query);
      setSearchCriteria(criteria);

      const normalizeText = (text: string) =>
        text
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase();

      const normalizedQuery = normalizeText(query);
      const queryWords = normalizedQuery.split(' ').filter(Boolean);

      const filteredProducts = productListCopy.filter(
        ({ name, barcode, id }) => {
          let targetText = '';

          switch (criteria) {
            case SearchCriteria.ProductName:
              targetText = normalizeText(name);
              break;
            case SearchCriteria.BarCode:
              targetText = normalizeText(barcode);
              break;
            case SearchCriteria.id:
              targetText = normalizeText(id);
              break;
            default:
              return false;
          }

          return queryWords.every((word) => targetText.includes(word));
        }
      );

      setProductList(filteredProducts);
    },
    [productListCopy]
  );

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchCriteria(SearchCriteria.ProductName);
    setProductList(productListCopy);
  }, [productListCopy]);

  const handleSort = useCallback(
    (newSorting: SortBy) => {
      setSortBy(newSorting);

      const sortedItems = productList.sort(compare(newSorting));

      setProductList(sortedItems);
    },
    [productList]
  );

  const saveDepartments = useCallback((deps: Department[]) => {
    setDepartments(deps);
  }, []);

  const getCategories = useCallback(
    (departmentId: string) => {
      const dep = departments.find(({ id }) => id === departmentId);
      return dep?.categories || [];
    },
    [departments]
  );

  const getSubcategories: (categoryId: string) => Category[] = useCallback(
    (categoryId) => {
      const result = categories.find(({ id }) => id === categoryId);

      if (result && result.subCategories) {
        return result.subCategories;
      }
      return [];
    },
    [categories]
  );

  const getSubSubcategories: (
    categoryId: string,
    subCategoryId: string | number
  ) => Category[] = useCallback(
    (categoryId, subCategoryId) => {
      if (!categoryId || !subCategoryId) {
        return [];
      }

      const category = categories.find(({ id }) => id === categoryId);

      if (!category || !category.subCategories) {
        return [];
      }

      const subCategory = category.subCategories.find(
        ({ internalId }) => internalId === Number(subCategoryId)
      );

      if (subCategory && subCategory.subSubCategories) {
        return subCategory.subSubCategories;
      }

      return [];
    },
    [categories]
  );

  const value = useMemo(
    () => ({
      productList,
      categories,
      brands,
      saveBrands,
      saveProducts,
      saveCategories,
      getSubcategories,
      getSubSubcategories,
      performSearch,
      searchQuery,
      clearSearch,
      searchCriteria,
      sortBy,
      handleSort,
      departments,
      saveDepartments,
      getCategories,
    }),
    [
      productList,
      categories,
      brands,
      saveBrands,
      saveProducts,
      getSubcategories,
      getSubSubcategories,
      performSearch,
      searchQuery,
      clearSearch,
      searchCriteria,
      sortBy,
      handleSort,
      departments,
      saveDepartments,
      getCategories,
    ]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export const useProducts = () => {
  const ctx = useContext(ProductContext);

  if (!ctx) {
    throw new Error("You're not using the correct context!");
  }

  return ctx;
};
