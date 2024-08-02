import { LoaderFunctionArgs } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

import { productQuery } from '~services/products';

export const loader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);

    const term = url.searchParams.get('q');
    const criteria = url.searchParams.get('sc');
    const sort = url.searchParams.get('sb');

    const searchCriteria = !criteria || criteria === '' ? 'name' : criteria;
    const searchTerm = !term || term === '' ? null : term;
    const sortBy = !sort || sort === '' ? 'name' : sort;

    await queryClient.ensureQueryData(
      productQuery({
        searchCriteria,
        searchTerm,
        sortBy,
      })
    );

    return { searchCriteria, searchTerm, sortBy };
  };
