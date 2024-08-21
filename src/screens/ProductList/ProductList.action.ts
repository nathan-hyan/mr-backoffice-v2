import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { Timestamp } from 'firebase/firestore';

import { productQuery, updateProduct } from '~services/products';
export const action =
  (queryClient: QueryClient) =>
  async ({ params }: ActionFunctionArgs) => {
    const searchParams = new URLSearchParams();

    const productData = await queryClient.ensureQueryData(
      productQuery({
        productId: params.id,
        searchCriteria: searchParams.get('searchCriteria') || 'name',
        sortBy: searchParams.get('sortBy') || 'name',
        searchTerm: searchParams.get('searchTerm') || null,
      })
    );

    const body = Array.isArray(productData) ? productData[0] : productData;

    await updateProduct({
      ...body,
      showInStore: !body.showInStore,
      updatedAt: new Timestamp(
        new Date().getSeconds(),
        new Date().getMilliseconds()
      ),
    });

    await queryClient?.invalidateQueries({ queryKey: ['products'] });
    return redirect('/products');
  };
