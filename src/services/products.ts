import { queryOptions } from '@tanstack/react-query';
import {
  addDoc,
  collection,
  DocumentData,
  DocumentReference,
  getDocs,
} from 'firebase/firestore';
import { enqueueSnackbar } from 'notistack';
import type { Brand, Category, Product } from 'types/data';

import { database } from '~config/firebase';
import {
  filterProducts,
  sortProducts,
} from '~screens/ProductList/ProductList.utils';

export interface ProductQuery {
  searchTerm?: string;
  searchCriteria?: string;
  sortBy?: string;
  categoryData?: Category[];
  brandData?: Brand[];
}

export const fetchProducts = async ({
  searchTerm,
  searchCriteria,
  sortBy,
  categoryData,
  brandData,
}: ProductQuery) => {
  const querySnap = await getDocs(collection(database, 'products'));
  const data: Product[] = [];

  if (querySnap.empty) {
    return data;
  }

  querySnap.forEach((doc) =>
    data.push({
      ...(doc.data() as Product),
      id: doc.id,
    })
  );

  const filteredProducts = filterProducts(data, searchTerm, searchCriteria);
  const sortedProducts = sortProducts(filteredProducts, sortBy);

  sortedProducts.forEach((product) => {
    const category = categoryData?.find(({ id }) => id === product.category);
    const subCategory = category?.subCategories?.find(
      ({ internalId }) => internalId === Number(product.subCategory)
    );
    const brand = brandData?.find(({ id }) => id === product.brand);

    product.translatedBrand = brand?.name || '';
    product.translatedCategory = category;
    product.translatedSubCategory = subCategory;
  });

  return sortedProducts;
};

export const addProduct: (
  newDocument: Product
) => Promise<
  DocumentReference<Record<string, unknown>, DocumentData> | Product[]
> = async (newDocument) => {
  const collectionRef = collection(database, 'products');

  try {
    const res = await addDoc(collectionRef, newDocument as Product);
    enqueueSnackbar('Item creado correctamente', {
      variant: 'success',
    });

    return res;
  } catch (err) {
    console.log(err);
    throw new Error('Ocurrió un error inesperado.');
  }
};

export const productQuery = ({
  searchTerm,
  searchCriteria,
  sortBy,
  categoryData = [],
  brandData = [],
}: ProductQuery) =>
  queryOptions({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['products', { searchTerm, searchCriteria, sortBy }],
    queryFn: () =>
      fetchProducts({
        searchTerm,
        searchCriteria,
        sortBy,
        categoryData,
        brandData,
      }),
  });
