import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { Timestamp } from 'firebase/firestore';
import { enqueueSnackbar } from 'notistack';
import { Product } from 'types/data';

import { flattenToNested } from '~config/configUtils';
import { addProduct } from '~services/products';

import { dummyProduct } from './constants';

export const action =
  (queryClient: QueryClient) =>
  async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    let body: Product = {} as Product;

    formData.forEach((value, key) => {
      body = { ...body, [key]: value };
    });

    const flattenedBody = flattenToNested(body) as Product;

    if (
      !JSON.parse(String(flattenedBody.imageURL) || 'undefined') ||
      JSON.parse(String(flattenedBody.imageURL))?.length < 1
    ) {
      enqueueSnackbar(`No se puede crear un producto sin imagen`, {
        variant: 'error',
      });

      return null;
    }

    let stock = { ...flattenedBody.stock };

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
      ...flattenedBody,
      imageURL: JSON.parse(String(flattenedBody.imageURL)),
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
