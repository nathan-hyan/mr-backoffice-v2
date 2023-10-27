import { useEffect } from 'react';
import { Category, Product } from 'types/data';

import CustomTable from '~components/CustomTable';
import SearchBox from '~components/SearchBox';
import SEO from '~components/SEO';
import SortByBox from '~components/SortByBox';
import { FirestoreCollections } from '~constants/firebase';
import { useProducts } from '~contexts/Products';
import useFirestore from '~hooks/useFirestore';

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
            <SEO
                title="Lista de productos"
                description="Listado de todos los productos a la venta"
            />
            <SearchBox />
            <SortByBox />
            <CustomTable />
        </>
    );
}
export default ProductList;
