import { queryOptions } from '@tanstack/react-query';
import { getDocs, collection } from 'firebase/firestore';
import type { Product } from 'types/data';
import { database } from '~config/firebase';

export const fetchProducts = async () => {
    const querySnap = await getDocs(collection(database, "products"));
    const data: Product[] = [];
      
    if (querySnap.empty) {
        return data
      }
    
      querySnap.forEach((doc) => data.push({
        ...doc.data() as Product,
        id: doc.id
      }));
    

    return data;
};
  
export const productQuery = () =>
  queryOptions({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
  })