import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { Category, Product } from 'types/data';

import { addCategory, categoryQuery } from '~services/categories';
import { prepareFormData } from '~utils';

export const action =
  (queryClient: QueryClient) =>
  async ({ request, params }: ActionFunctionArgs) => {
    const body = (await prepareFormData<Product>({
      request,
      params,
    })) as Category;

    const categories = (await queryClient.ensureQueryData(
      categoryQuery()
    )) as Category[];

    const internalId =
      categories.sort((a, b) => b.internalId - a.internalId)[0].internalId + 1;

    const result = { ...body, internalId };

    await addCategory(result);
    await queryClient?.invalidateQueries({ queryKey: ['categories'] });

    return redirect(`/categoryManager/${internalId}`);
  };
