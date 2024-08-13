import { queryOptions } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
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

  if (searchTerm) {
    filteredData = data.filter((brand) => brand.name.includes(searchTerm));
  }

  console.log({ searchTerm, filteredData, data });

  return searchTerm ? filteredData : data;
};

export const brandQuery = ({ searchTerm }: { searchTerm: Nullable<string> }) =>
  queryOptions({
    queryKey: ['brands', searchTerm],
    queryFn: () => fetchBrands({ searchTerm }),
  });
