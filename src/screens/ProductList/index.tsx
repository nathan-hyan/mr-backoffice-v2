import { useEffect, useState } from 'react';
import { Product } from 'types/data';

import CustomTable from '~components/CustomTable';
import SearchBox from '~components/SearchBox';
import SortByBox from '~components/SortByBox';
import { SortBy } from '~components/SortByBox/constants';
import useFirestore from '~hooks/useFirestore';

function ProductList() {
    const [productList, setProductList] = useState<Product[]>([]);
    const [sortBy, setSortBy] = useState<SortBy>(SortBy.Name);
    const [searchQuery, setSearchQuery] = useState('');
    const { fetchData } = useFirestore<Product>('products');

    useEffect(() => {
        fetchData(sortBy, searchQuery).then((res) => {
            setProductList(res);
        });
    }, [sortBy, searchQuery]);

    console.log({
        productListLength: productList.length,
        sortBy,
        searchQuery,
    });

    return (
        <>
            <SearchBox
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <SortByBox setSortBy={setSortBy} sortBy={sortBy} />
            <CustomTable products={productList} />
        </>
    );
}
export default ProductList;
