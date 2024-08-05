import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

import { productQuery, updateProduct } from '~services/products';
import { prepareFormData } from '~utils/index';

export const action =
  (queryClient: QueryClient) =>
  async ({ request, params }: ActionFunctionArgs) => {
    const body = (await prepareFormData({
      request,
      params,
    })) as { productId: string; comment: string; rating: number };

    const productData = await queryClient.ensureQueryData(
      productQuery({
        productId: String(body.productId),
        searchCriteria: 'name',
        sortBy: 'name',
        searchTerm: null,
      })
    );
    const arrayData = Array.isArray(productData) ? productData[0] : productData;
    arrayData.userFeedback.push({
      id: Math.random() * 1000,
      comment: body.comment,
      rating: body.rating,
    });

    await updateProduct(arrayData);

    await queryClient?.invalidateQueries({ queryKey: ['products'] });
    return redirect('/products');
  };
