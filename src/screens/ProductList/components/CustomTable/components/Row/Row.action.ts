import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

import { deleteProduct } from '~services/products';

export const action =
  (queryClient: QueryClient) =>
  async ({ params }: ActionFunctionArgs) => {
    if (!params.id) {
      throw new Error('No se encontró el producto');
    }

    await deleteProduct(params.id);
    await queryClient?.invalidateQueries({ queryKey: ['products'] });

    return redirect('/products');
  };
