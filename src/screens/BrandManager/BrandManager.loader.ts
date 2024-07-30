import { QueryClient } from '@tanstack/react-query';
import { brandQuery } from '~services/brands';

export const loader = (queryClient: QueryClient) => async () => {
  console.log('CategoryManager Loader Called');
  const brandData = await queryClient.ensureQueryData(brandQuery());

  return brandData;
};
