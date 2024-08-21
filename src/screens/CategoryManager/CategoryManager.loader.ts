import { QueryClient } from '@tanstack/react-query';

import { categoryQuery } from '~services/categories';

export const loader = (queryClient: QueryClient) => async () => {
  const categoryData = await queryClient.ensureQueryData(categoryQuery());

  return categoryData;
};
