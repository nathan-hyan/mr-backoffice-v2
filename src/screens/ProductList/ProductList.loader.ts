import { LoaderFunctionArgs } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

import { brandQuery } from '~services/brands';
import { categoryQuery } from '~services/categories';
import { productQuery } from '~services/products';

import { filterProducts, sortProducts } from './ProductList.utils';

export const loader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);

    const searchTerm = url.searchParams.get('q');
    const searchCriteria = url.searchParams.get('sc');
    const sortBy = url.searchParams.get('sb');

    const productData = await queryClient.ensureQueryData(productQuery());
    const categoryData = await queryClient.ensureQueryData(categoryQuery());
    const brandData = await queryClient.ensureQueryData(brandQuery());

    const filteredProducts = filterProducts(
      productData,
      searchTerm,
      searchCriteria
    );

    const sortedProducts = sortProducts(filteredProducts, sortBy);

    sortedProducts.forEach((product) => {
      const category = categoryData.find(({ id }) => id === product.category);
      const subCategory = category?.subCategories?.find(
        ({ internalId }) => internalId === Number(product.subCategory)
      );
      const brand = brandData.find(({ id }) => id === product.brand);

      product.translatedBrand = brand?.name || '';
      product.translatedCategory = category;
      product.translatedSubCategory = subCategory;
    });

    return sortedProducts;
  };
