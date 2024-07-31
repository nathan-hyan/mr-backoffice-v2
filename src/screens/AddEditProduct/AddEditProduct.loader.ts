import { LoaderFunctionArgs } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { Brand, Category, Product } from 'types/data';

import { brandQuery } from '~services/brands';
import { categoryQuery } from '~services/categories';
import { productQuery } from '~services/products';

export type LoaderData = {
  brand: Brand[];
  category: Category[];
  product: Product;
};

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { id: productId } = params;
    console.log({ productId });

    const brandData = await queryClient.ensureQueryData(brandQuery());
    const categoryData = await queryClient.ensureQueryData(categoryQuery());
    let productData;

    if (productId) {
      const allProducts = await queryClient.ensureQueryData(productQuery());
      productData = allProducts.find(({ id }) => id === productId);
    }

    console.log({ productData, result: !productData && productId });

    if (!productData && productId) {
      throw new Error(`No se encontró el producto con id ${productId}`);
    }

    return { brand: brandData, category: categoryData, product: productData };
  };
