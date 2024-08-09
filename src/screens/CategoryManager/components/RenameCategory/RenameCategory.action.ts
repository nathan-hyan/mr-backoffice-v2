import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { Category, Product } from 'types/data';

import { categoryQuery, updateCategory } from '~services/categories';
import { prepareFormData } from '~utils/index';

export const action =
  (queryClient: QueryClient) =>
  async ({ request, params }: ActionFunctionArgs) => {
    const body = (await prepareFormData<Product>({
      request,
      params,
    })) as Category;

    const category = (await queryClient.ensureQueryData(
      categoryQuery(params.id)
    )) as Category;

    if (!category.id) {
      throw new Error('Invalid category id');
    }

    await updateCategory(category.id, { ...category, name: body.name });
    await queryClient.invalidateQueries({
      queryKey: ['categories'],
    });

    return redirect(`/categoryManager/${params.id}`);
  };
