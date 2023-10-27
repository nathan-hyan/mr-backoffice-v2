import { useEffect } from 'react';
import { Product } from 'types/data';

import CustomTable from '~components/CustomTable';
import SearchBox from '~components/SearchBox';
import SEO from '~components/SEO';
import SortByBox from '~components/SortByBox';
import { FirestoreCollections } from '~constants/firebase';
import { useProducts } from '~contexts/Products';
import useFirestore from '~hooks/useFirestore';

function ProductList() {
    const { saveProducts } = useProducts();
    const { subscribeToData } = useFirestore<Product>(
        FirestoreCollections.Products
    );

    useEffect(() => {
        const unsubscribe = subscribeToData((data) => {
            saveProducts(data);
        });

        return () => {
            unsubscribe();
        };
    }, [saveProducts, subscribeToData]);

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
