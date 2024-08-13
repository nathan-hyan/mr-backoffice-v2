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
import type { Brand } from 'types/data';
import { Nullable } from 'vitest';

import { database } from '~config/firebase';

export const fetchBrands = async ({
  searchTerm,
}: {
  searchTerm: Nullable<string>;
}) => {
  const querySnap = await getDocs(collection(database, 'brands'));
  const data: Brand[] = [];
  let filteredData: Brand[] = [];

  if (querySnap.empty) {
    return data;
  }

  querySnap.forEach((doc) =>
    data.push({
      ...(doc.data() as Brand),
      id: doc.id,
    })
  );

  const sortedData = data.sort((a, b) => b.internalId - a.internalId);

  if (searchTerm) {
    filteredData = sortedData.filter((brand) =>
      brand.name.includes(searchTerm)
    );
  }

  return searchTerm ? filteredData : sortedData;
};

export const addBrand: (
  newDocument: Brand
) => Promise<
  DocumentReference<Record<string, unknown>, DocumentData> | Brand[]
> = async (newDocument) => {
  const collectionRef = collection(database, 'brands');

  try {
    const res = await addDoc(collectionRef, newDocument as Brand);
    enqueueSnackbar('Marca creada correctamente', {
      variant: 'success',
    });

    return res;
  } catch (err) {
    console.log(err);
    throw new Error('Ocurrió un error inesperado.');
  }
};

export const editBrand = async (data: Brand, id?: string) => {
  const collectionRef = collection(database, 'brands');

  if (!id) {
    throw new Error('No se puede editar una marca sin un id');
  }

  try {
    await updateDoc(
      doc(collectionRef, id),
      data as Brand & { [key: string]: string }
    );
    enqueueSnackbar('Marca editada correctamente', {
      variant: 'info',
    });
  } catch (err) {
    console.log(err);
    throw new Error('Ocurrió un error inesperado.');
  }
};

export const deleteBrand = async (id: string) => {
  const collectionRef = collection(database, 'brands');

  try {
    await deleteDoc(doc(collectionRef, id));
    enqueueSnackbar('Marca eliminada correctamente', {
      variant: 'success',
    });
  } catch (err) {
    console.log(err);
    throw new Error('Ocurrió un error inesperado.');
  }
};

export const brandQuery = ({ searchTerm }: { searchTerm: Nullable<string> }) =>
  queryOptions({
    queryKey: ['brands', searchTerm],
    queryFn: () => fetchBrands({ searchTerm }),
  });
