import { useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';

import { productQuery } from '~services/products';

export const useProductData = () => {
  const { id } = useParams();
  const { data } = useSuspenseQuery(
    productQuery({
      productId: id,
      searchCriteria: 'name',
      searchTerm: null,
      sortBy: 'name',
    })
  );

  const editMode = id !== undefined;

  return { data, editMode };
};
