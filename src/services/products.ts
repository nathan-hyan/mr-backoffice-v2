import { queryOptions } from '@tanstack/react-query';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { enqueueSnackbar } from 'notistack';
import type { Brand, Category, Product } from 'types/data';
import { Nullable } from 'vite-env';

import { database } from '~config/firebase';
import {
  filterProducts,
  sortProducts,
} from '~screens/ProductList/ProductList.utils';

export interface ProductQuery {
  searchTerm: Nullable<string>;
  searchCriteria: Nullable<string>;
  sortBy: Nullable<string>;
  productId?: string;
}

export const fetchProducts = async ({
  searchTerm = null,
  searchCriteria = 'name',
  sortBy = 'name',
  productId,
}: ProductQuery) => {
  const querySnapProducts = await getDocs(collection(database, 'products'));
  const querySnapBrands = await getDocs(collection(database, 'brands'));
  const querySnapCategories = await getDocs(collection(database, 'categories'));

  console.count(`fetching products`);

  const data: Product[] = [];
  const brands: Brand[] = [];
  const categories: Category[] = [];

  if (querySnapProducts.empty) {
    return data;
  }

  querySnapBrands.forEach((doc) =>
    brands.push({
      ...(doc.data() as Product),
      id: doc.id,
    })
  );

  querySnapCategories.forEach((doc) =>
    categories.push({
      ...(doc.data() as Product),
      id: doc.id,
    })
  );

  querySnapProducts.forEach((doc) =>
    data.push({
      ...(doc.data() as Product),
      id: doc.id,
    })
  );

  const filteredProducts = filterProducts(
    data,
    searchTerm || undefined,
    searchCriteria || 'name'
  );
  const sortedProducts = sortProducts(filteredProducts, sortBy || undefined);

  sortedProducts.forEach((product) => {
    const category = categories?.find(({ id }) => id === product.category);
    const subCategory = category?.subCategories?.find(
      ({ internalId }) => internalId === Number(product.subCategory)
    );
    const brand = brands?.find(({ id }) => id === product.brand);

    product.translatedBrand = brand?.name || '';
    product.translatedCategory = category;
    product.translatedSubCategory = subCategory;
  });

  const product = sortedProducts.find(({ id }) => id === productId);

  return productId && product ? product : sortedProducts;
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
    throw new Error(`Ocurrió un error inesperado. ${JSON.stringify(err)}`);
  }
};

export const updateProduct = async (newData: Product) => {
  const docRef = doc(database, 'products', newData.id);

  await updateDoc(docRef, newData as Product & { [key: string]: string })
    .then(() => {
      enqueueSnackbar('Item editado correctamente', {
        variant: 'info',
      });
    })
    .catch(() => {
      throw new Error('Ocurrió un error inesperado.');
    });
};

export const deleteProduct = async (id: string) => {
  const collectionRef = collection(database, 'products');

  try {
    await deleteDoc(doc(collectionRef, id));
    enqueueSnackbar('Producto eliminado correctamente', {
      variant: 'success',
    });
  } catch (err) {
    throw new Error(`Ocurrió un error inesperado. ${JSON.stringify(err)}`);
  }
};

export const productQuery = ({
  searchTerm = null,
  searchCriteria = 'name',
  sortBy = 'name',
  productId = undefined,
}: ProductQuery) =>
  queryOptions({
    queryKey: ['products', { searchTerm, searchCriteria, sortBy, productId }],
    queryFn: () =>
      fetchProducts({
        searchTerm,
        searchCriteria,
        sortBy,
        productId,
      }),
  });
