import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { Category } from 'types/data';

import {
  categoryQuery,
  deleteCategory,
  updateCategory,
} from '~services/categories';

export const action =
  (queryClient: QueryClient) =>
  async ({ params, request }: ActionFunctionArgs) => {
    const url = new URL(request.url);
    const subCategoryId = url.searchParams.get('sc');

    const categories = (await queryClient.ensureQueryData(
      categoryQuery()
    )) as Category[];

    const categoryToDelete = categories.find(
      ({ internalId }) => internalId === Number(params.id)
    );

    if (categoryToDelete && subCategoryId) {
      const subCategoryToDelete = categoryToDelete?.subCategories?.find(
        ({ internalId }) => Number(internalId) === Number(subCategoryId)
      );

      if (subCategoryId && subCategoryToDelete) {
        categoryToDelete.subCategories = categoryToDelete.subCategories?.filter(
          ({ internalId }) => internalId !== subCategoryToDelete.internalId
        );

        await updateCategory(categoryToDelete.id!, categoryToDelete);
        await queryClient.invalidateQueries({
          queryKey: ['categories', params.id],
        });

        return redirect(`/categoryManager/${params.id}`);
      } else {
        throw new Error('No se encontró la subcategoría');
      }
    }

    if (categoryToDelete && categoryToDelete.id) {
      await deleteCategory(categoryToDelete.id);
      await queryClient.invalidateQueries({
        queryKey: ['categories', params.id],
      });
    }

    return redirect('/categoryManager');
  };
