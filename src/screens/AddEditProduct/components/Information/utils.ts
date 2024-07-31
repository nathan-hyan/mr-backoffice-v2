import { Category } from 'types/data';

export const generateBarcode = () => {
  const barcode = Math.floor(Math.random() * 1000000000000).toString();
  return barcode;
};

export const getSubcategories: (
  categoryId: string,
  categories: Category[]
) => Category[] = (categoryId, categories) => {
  const result = categories.find(({ id }) => id === categoryId);

  if (result && result.subCategories) {
    return result.subCategories;
  }
  return [];
};
