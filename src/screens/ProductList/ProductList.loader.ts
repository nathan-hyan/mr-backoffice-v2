import { LoaderFunctionArgs } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

import { productQuery } from '~services/products';

export const loader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);

    const searchTerm = url.searchParams.get('q');
    const searchCriteria = url.searchParams.get('sc');
    const sortBy = url.searchParams.get('sb');

    await queryClient.ensureQueryData(
      productQuery({
        searchCriteria: searchCriteria || undefined,
        searchTerm: searchTerm || undefined,
        sortBy: sortBy || undefined,
      })
    );

    return { searchCriteria, searchTerm, sortBy };
  };
