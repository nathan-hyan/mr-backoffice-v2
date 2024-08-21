import { useProducts } from '~contexts/Products';

function useCategoryTranslator() {
  const { getSubcategories, categories } = useProducts();

  const translateCategories = (category: string, subCategory: string) => {
    const translatedCategory = categories.find(({ id }) => category === id);
    const translatedSubCategory = getSubcategories(category).find(
      ({ internalId }) => internalId === Number(subCategory)
    );

    return { translatedCategory, translatedSubCategory };
  };

  return { translateCategories };
}
export default useCategoryTranslator;
