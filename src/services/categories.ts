import { queryOptions } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import type { Category } from 'types/data';

import { database } from '~config/firebase';

export const fetchCategories = async () => {
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

  return data;
};

export const categoryQuery = () =>
  queryOptions({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
  });
