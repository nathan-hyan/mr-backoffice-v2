import { queryOptions } from '@tanstack/react-query';
import { getDocs, collection } from 'firebase/firestore';
import type { Brand } from 'types/data';
import { database } from '~config/firebase';

export const fetchBrands = async () => {
  const querySnap = await getDocs(collection(database, 'brands'));
  const data: Brand[] = [];

  if (querySnap.empty) {
    return data;
  }

  querySnap.forEach((doc) =>
    data.push({
      ...(doc.data() as Brand),
      id: doc.id,
    })
  );

  return data;
};

export const brandQuery = () =>
  queryOptions({
    queryKey: ['brands'],
    queryFn: () => fetchBrands(),
  });
