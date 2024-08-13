import { LoaderFunctionArgs } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

import { categoryQuery } from '~services/categories';

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    if (!params.id) {
      throw new Error('No id provided');
    }

    await queryClient.ensureQueryData(categoryQuery(params.id));

    return params;
  };
