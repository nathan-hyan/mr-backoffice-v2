import { QueryClient } from '@tanstack/react-query';
import { brandQuery } from '~services/brands';
import { categoryQuery } from '~services/categories';
import { productQuery } from '~services/products';

export const loader = (queryClient: QueryClient) => async () => {
  console.log('Called');
  const productData = await queryClient.ensureQueryData(productQuery());
  const categoryData = await queryClient.ensureQueryData(categoryQuery());
  const brandData = await queryClient.ensureQueryData(brandQuery());

  productData.forEach((product) => {
    const category = categoryData.find(({ id }) => id === product.category);
    const subCategory = category?.subCategories?.find(
      ({ internalId }) => internalId === Number(product.subCategory)
    );
    const brand = brandData.find(({ id }) => id === product.brand);

    product.translatedBrand = brand?.name || '';
    product.translatedCategory = category;
    product.translatedSubCategory = subCategory;
  });

  return productData;
};
