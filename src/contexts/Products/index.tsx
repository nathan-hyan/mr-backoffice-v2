import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { Brand, Category, Product } from 'types/data';

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

  const performSearch = useCallback(
    (query: string, criteria: SearchCriteria) => {
      setSearchQuery(query);
      setSearchCriteria(criteria);

      const filteredProducts = productListCopy.filter(({ name, barcode }) =>
        criteria === SearchCriteria.ProductName
          ? name.toLowerCase().includes(query.toLocaleLowerCase())
          : barcode.toLowerCase().includes(query.toLocaleLowerCase())
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

  const value = useMemo(
    () => ({
      productList,
      categories,
      brands,
      saveBrands,
      saveProducts,
      saveCategories,
      getSubcategories,
      performSearch,
      searchQuery,
      clearSearch,
      searchCriteria,
      sortBy,
      handleSort,
    }),
    [
      productList,
      categories,
      brands,
      saveBrands,
      saveProducts,
      getSubcategories,
      performSearch,
      searchQuery,
      clearSearch,
      searchCriteria,
      sortBy,
      handleSort,
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
