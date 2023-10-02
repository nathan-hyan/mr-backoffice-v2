import { useEffect, useState } from 'react';
import { Product } from 'types/data';

import CustomTable from '~components/CustomTable';
import SearchBox from '~components/SearchBox';
import SortByBox from '~components/SortByBox';
import useFirestore from '~hooks/useFirestore';

function ProductList() {
    const [productList, setProductList] = useState<Product[]>([]);
    const { fetchData } = useFirestore<Product>('products');

    useEffect(() => {
        fetchData().then((res) => {
            setProductList(res);
        });
    }, []);

    return (
        <>
            <SearchBox />
            <SortByBox />
            <CustomTable products={productList} />
        </>
    );
}
export default ProductList;
