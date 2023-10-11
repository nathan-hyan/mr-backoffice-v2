import { useEffect } from 'react';
import { Product } from 'types/data';

import CustomTable from '~components/CustomTable';
import SearchBox from '~components/SearchBox';
import SortByBox from '~components/SortByBox';
import { FirebaseCollections } from '~constants/firebase';
import { useProducts } from '~contexts/Products';
import useFirestore from '~hooks/useFirestore';

function ProductList() {
    const { saveProducts } = useProducts();
    const { subscribeToData } = useFirestore<Product>(
        FirebaseCollections.Products
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
            <SearchBox />
            <SortByBox />
            <CustomTable />
        </>
    );
}
export default ProductList;
