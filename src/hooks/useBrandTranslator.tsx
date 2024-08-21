import { useProducts } from '~contexts/Products';

function useBrandTranslator() {
  const { brands } = useProducts();

  const translateBrand = (brandId: string) => {
    const trasnlatedBrand = brands.find((value) => value.id === brandId);

    return trasnlatedBrand?.name;
  };

  return { translateBrand };
}
export default useBrandTranslator;
