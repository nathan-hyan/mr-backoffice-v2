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
  const collectionRef = collection(database, 'categories');

  try {
    const res = await addDoc(collectionRef, newDocument as Category);
    enqueueSnackbar('Categoría creada correctamente', {
      variant: 'success',
    });

    return res;
  } catch (err) {
    throw new Error(`Ocurrió un error inesperado. ${JSON.stringify(err)}`);
  }
};

export const deleteCategory = async (id: string) => {
  const collectionRef = collection(database, 'categories');

  try {
    await deleteDoc(doc(collectionRef, id));
    enqueueSnackbar('Categoría eliminada correctamente', {
      variant: 'success',
    });
  } catch (err) {
    throw new Error(`Ocurrió un error inesperado. ${JSON.stringify(err)}`);
  }
};

export const updateCategory = async (id: string, data: Category) => {
  const collectionRef = collection(database, 'categories');

  try {
    await updateDoc(
      doc(collectionRef, id),
      data as Category & { [key: string]: string }
    );
    enqueueSnackbar('Categoría editada correctamente', {
      variant: 'info',
    });
  } catch (err) {
    throw new Error(`Ocurrió un error inesperado. ${JSON.stringify(err)}`);
  }
};

export const categoryQuery = (id?: string) =>
  queryOptions({
    queryKey: ['categories', id],
    queryFn: () => fetchCategories(id),
  });
