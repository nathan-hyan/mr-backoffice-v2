import { useEffect } from 'react';
import { Brand, Category, Product } from 'types/data';

import { FirestoreCollections } from '~constants/firebase';
import { useProducts } from '~contexts/Products';
import useFirestore from '~hooks/useFirestore';
import useGATag from '~hooks/useGATag';
import CustomTable from '~screens/ProductList/components/CustomTable';
import SearchBox from '~screens/ProductList/components/SearchBox';

import styles from './styles.module.scss';

function ProductList() {
  useGATag();

  const { saveProducts, saveCategories, saveBrands } = useProducts();

  const { subscribeToData: productDataSub } = useFirestore<Product>(
    FirestoreCollections.Products
  );
  const { subscribeToData: categoryDataSub } = useFirestore<Category>(
    FirestoreCollections.Categories
  );

  const { subscribeToData: brandDataSub } = useFirestore<Brand>(
    FirestoreCollections.Brands
  );

  useEffect(() => {
    const productsUnsubscribe = productDataSub((data) => {
      saveProducts(data);
    });

    const categoriesUnsubscribe = categoryDataSub((data) => {
      saveCategories(data);
    });

    const brandsUnsubscribe = brandDataSub((data) => {
      saveBrands(data);
    });

    return () => {
      productsUnsubscribe();
      categoriesUnsubscribe();
      brandsUnsubscribe();
    };
  }, [
    brandDataSub,
    categoryDataSub,
    productDataSub,
    saveBrands,
    saveCategories,
    saveProducts,
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.component}>
        <SearchBox />
        <CustomTable />
      </div>
    </div>
  );
}
export default ProductList;
