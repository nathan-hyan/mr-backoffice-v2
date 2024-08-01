import { LoaderFunctionArgs } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

import { brandQuery } from '~services/brands';
import { categoryQuery } from '~services/categories';
import { productQuery } from '~services/products';

export const loader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);

    const searchTerm = url.searchParams.get('q');
    const searchCriteria = url.searchParams.get('sc');
    const sortBy = url.searchParams.get('sb');

    const categoryData = await queryClient.ensureQueryData(categoryQuery());
    const brandData = await queryClient.ensureQueryData(brandQuery());

    await queryClient.ensureQueryData(
      productQuery({
        searchCriteria: searchCriteria || undefined,
        searchTerm: searchTerm || undefined,
        sortBy: sortBy || undefined,
        categoryData,
        brandData,
      })
    );

    return { searchCriteria, searchTerm, sortBy };
  };
