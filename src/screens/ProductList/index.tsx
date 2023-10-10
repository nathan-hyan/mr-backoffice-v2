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
    const { fetchData } = useFirestore<Product>(FirebaseCollections.Products);

    useEffect(() => {
        fetchData()
            .then((res) => {
                // saveProducts(res);
                console.log(res);
            })
            .catch((err) => console.log(err));
    }, [fetchData, saveProducts]);

    return (
        <>
            <SearchBox />
            <SortByBox />
            <CustomTable />
        </>
    );
}
export default ProductList;
