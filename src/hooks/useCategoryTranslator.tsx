import { Category } from 'types/data';

// import { useProducts } from '~contexts/Products';

// TODO: FIX!

function useCategoryTranslator() {
  const translateCategories = (category: string, subCategory: string) => {
    const categories: Category[] = [];
    const getSubcategories = (categoryId: string) => {
      const category = categories.find(({ id }) => categoryId === id);
      return category?.subCategories || [];
    };

    const translatedCategory = categories.find(({ id }) => category === id);
    const translatedSubCategory = getSubcategories(category).find(
      ({ internalId }) => internalId === Number(subCategory)
    );

    return { translatedCategory, translatedSubCategory };
  };

  return { translateCategories };
}
export default useCategoryTranslator;
