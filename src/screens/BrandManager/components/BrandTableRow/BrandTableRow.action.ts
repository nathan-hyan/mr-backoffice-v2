import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

import { deleteBrand } from '~services/brands';

export const action =
  (queryClient: QueryClient) =>
  async ({ params }: ActionFunctionArgs) => {
    if (!params.id) {
      throw new Error('No se encontró la marca');
    }

    await deleteBrand(params.id);
    await queryClient?.invalidateQueries({ queryKey: ['brands', null] });

    return redirect('/brandManager');
  };
