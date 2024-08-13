import { LoaderFunctionArgs } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

import { brandQuery } from '~services/brands';

export const loader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);

    const term = url.searchParams.get('q');
    const searchTerm = !term || term === '' ? null : term;

    await queryClient.ensureQueryData(brandQuery({ searchTerm }));

    return { searchTerm };
  };
