import { Category } from 'types/data';

import { addCategory } from '~services/categories';
// import { getLatestInternalId } from '~utils/index';

export const createCategory = (newData: Category) => {
  //   const newInternalId = getLatestInternalId(data) + 1;

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
    // internalId: newInternalId,
  });
};
