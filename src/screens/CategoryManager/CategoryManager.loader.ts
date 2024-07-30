import { QueryClient } from '@tanstack/react-query';

import { categoryQuery } from '~services/categories';

export const loader = (queryClient: QueryClient) => async () => {
  console.log('CategoryManager Loader Called');
  const categoryData = await queryClient.ensureQueryData(categoryQuery());

  return categoryData;
};
