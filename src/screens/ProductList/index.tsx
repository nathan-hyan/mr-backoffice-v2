import { useEffect } from 'react';
import { Category, Product } from 'types/data';

import { FirestoreCollections } from '~constants/firebase';
import { useProducts } from '~contexts/Products';
import useFirestore from '~hooks/useFirestore';
import CustomTable from '~screens/ProductList/components/CustomTable';
import SearchBox from '~screens/ProductList/components/SearchBox';
import SortByBox from '~screens/ProductList/components/SortByBox';

function ProductList() {
    const { saveProducts, saveCategories } = useProducts();
    const { subscribeToData: productDataSub } = useFirestore<Product>(
        FirestoreCollections.Products
    );
    const { subscribeToData: categoryDataSub } = useFirestore<Category>(
        FirestoreCollections.Categories
    );

    useEffect(() => {
        const productsUnsubscribe = productDataSub((data) => {
            saveProducts(data);
        });

        const categoriesUnsubscribe = categoryDataSub((data) => {
            saveCategories(data);
        });

        return () => {
            productsUnsubscribe();
            categoriesUnsubscribe();
        };
    }, [categoryDataSub, productDataSub, saveCategories, saveProducts]);

    return (
        <>
            <SearchBox />
            <SortByBox />
            <CustomTable />
        </>
    );
}
export default ProductList;
