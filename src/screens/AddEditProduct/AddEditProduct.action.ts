import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { Timestamp } from 'firebase/firestore';
// import { enqueueSnackbar } from 'notistack';
import { Product } from 'types/data';

import { addProduct, updateProduct } from '~services/products';
import { prepareFormData } from '~utils/prepareFormData';

import { dummyProduct } from './constants';

export const action =
  (queryClient: QueryClient) =>
  async ({ request, params }: ActionFunctionArgs) => {
    const body = (await prepareFormData<Product>({
      request,
      params,
    })) as Product;

    // TODO: Re-enable when testing is ready

    // if (
    //   !JSON.parse(String(flattenedBody.imageURL) || 'undefined') ||
    //   JSON.parse(String(flattenedBody.imageURL))?.length < 1
    // ) {
    //   enqueueSnackbar(`No se puede crear un producto sin imagen`, {
    //     variant: 'error',
    //   });

    //   return null;
    // }

    let stock = { ...body.stock };

    if (stock.noPhysicalStock) {
      stock = {
        current: 0,
        maxStock: 0,
        minStock: 0,
        noPhysicalStock: true,
      };
    }

    await addProduct({
      ...dummyProduct,
      ...body,
      imageURL: JSON.parse(String(body.imageURL)),
      createdAt: new Timestamp(
        new Date().getSeconds(),
        new Date().getMilliseconds()
      ),
      updatedAt: new Timestamp(
        new Date().getSeconds(),
        new Date().getMilliseconds()
      ),
      stock,
    });

    await queryClient?.invalidateQueries({ queryKey: ['products'] });
    return redirect('/products');
  };

export const editAction =
  (queryClient: QueryClient) =>
  async ({ request, params }: ActionFunctionArgs) => {
    const body = (await prepareFormData<Product>({
      request,
      params,
    })) as Product;

    await updateProduct({
      ...body,
      imageURL: JSON.parse(String(body.imageURL)),
      updatedAt: new Timestamp(
        new Date().getSeconds(),
        new Date().getMilliseconds()
      ),
    });

    await queryClient?.invalidateQueries({ queryKey: ['products'] });
    return redirect('/products');
  };
