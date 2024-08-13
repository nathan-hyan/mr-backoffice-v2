import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { Brand } from 'types/data';

import { addBrand, brandQuery } from '~services/brands';
import { prepareFormData } from '~utils/index';

export const action =
  (queryClient: QueryClient) =>
  async ({ request, params }: ActionFunctionArgs) => {
    const body = (await prepareFormData<Brand>({
      request,
      params,
    })) as Brand;

    const brand = (await queryClient.ensureQueryData(
      brandQuery({ searchTerm: null })
    )) as Brand[];

    const doesAlreadyExist = brand.find(
      (brand) => brand.name.toLowerCase() === body.name.toLowerCase()
    );

    if (doesAlreadyExist) {
      enqueueSnackbar('La marca ya existe', {
        variant: 'error',
      });

      return null;
    }

    const internalId =
      brand.sort((a, b) => b.internalId - a.internalId)[0].internalId + 1;

    const result = { ...body, internalId };

    await addBrand(result);
    await queryClient?.invalidateQueries({ queryKey: ['brands'] });

    return redirect(`/brandManager`);
  };

export const editAction =
  (queryClient: QueryClient) =>
  async ({ request, params }: ActionFunctionArgs) => {
    const body = (await prepareFormData<Brand>({
      request,
      params,
    })) as Brand;

    const brand = (await queryClient.ensureQueryData(
      brandQuery({ searchTerm: null })
    )) as Brand[];

    const internalId =
      brand.sort((a, b) => b.internalId - a.internalId)[0].internalId + 1;

    const result = { ...body, internalId };

    console.log(result);

    // await addCategory(result);
    // await queryClient?.invalidateQueries({ queryKey: ['brands'] });

    // return redirect(`/categoryManager/${internalId}`);
  };
