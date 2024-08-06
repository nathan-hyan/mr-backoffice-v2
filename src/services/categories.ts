import { queryOptions } from '@tanstack/react-query';
import {
  addDoc,
  collection,
  DocumentData,
  DocumentReference,
  getDocs,
} from 'firebase/firestore';
import { enqueueSnackbar } from 'notistack';
import type { Category } from 'types/data';

import { database } from '~config/firebase';

export const fetchCategories = async (id?: string) => {
  const querySnap = await getDocs(collection(database, 'categories'));
  const data: Category[] = [];

  if (querySnap.empty) {
    return data;
  }

  querySnap.forEach((doc) =>
    data.push({
      ...(doc.data() as Category),
      id: doc.id,
    })
  );

  return id
    ? data.filter(({ internalId }) => String(internalId) === String(id))[0]
    : data;
};

export const addCategory: (
  newDocument: Category
) => Promise<
  DocumentReference<Record<string, unknown>, DocumentData> | Category[]
> = async (newDocument) => {
  const collectionRef = collection(database, 'products');

  try {
    const res = await addDoc(collectionRef, newDocument as Category);
    enqueueSnackbar('Item creado correctamente', {
      variant: 'success',
    });

    return res;
  } catch (err) {
    console.log(err);
    throw new Error('Ocurrió un error inesperado.');
  }
};

export const categoryQuery = (id?: string) =>
  queryOptions({
    queryKey: ['categories', id],
    queryFn: () => fetchCategories(id),
  });
