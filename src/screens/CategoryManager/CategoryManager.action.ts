import { Category } from 'types/data';

import { addCategory } from '~services/categories';

export const createCategory = (newData: Category) => {
  const subCategoriesWithInternalId: Category[] = [];

  newData.subCategories?.forEach((item, index) => {
    subCategoriesWithInternalId.push({
      name: item.name,
      internalId: index + 1,
    });
  });

  addCategory({
    ...newData,
    subCategories: subCategoriesWithInternalId,
  });
};
