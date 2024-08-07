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

    const currentSubCategories = category.subCategories;

    if (currentSubCategories?.length && currentSubCategories?.length > 0) {
      const latestSubCategoryId = currentSubCategories?.sort(
        (a, b) => Number(b.internalId) - Number(a.internalId)
      )[0].internalId;

      body.subCategories?.forEach((item, index) => {
        item.internalId = Number(latestSubCategoryId) + index + 1;

        currentSubCategories.push(item);
      });
    }

    category.subCategories = currentSubCategories;

    await updateCategory(category.id!, category);

    await queryClient.invalidateQueries({
      queryKey: ['categories', params.id],
    });

    return redirect(`/categoryManager/${params.id}`);
  };
