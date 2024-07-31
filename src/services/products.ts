import { queryOptions } from '@tanstack/react-query';
import {
  addDoc,
  collection,
  DocumentData,
  DocumentReference,
  getDocs,
} from 'firebase/firestore';
import { enqueueSnackbar } from 'notistack';
import type { Product } from 'types/data';

import { database } from '~config/firebase';

export const fetchProducts = async () => {
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

  return data;
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

export const productQuery = () =>
  queryOptions({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
  });
