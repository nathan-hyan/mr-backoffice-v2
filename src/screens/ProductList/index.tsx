import { useState } from 'react';
import { Button } from '@mui/material';
import { Product } from 'types/data';

import CustomTable from '~components/CustomTable';
import SearchBox from '~components/SearchBox';
import SortByBox from '~components/SortByBox';
import useFirestore from '~hooks/useFirestore';

function ProductList() {
    const [productList, setProductList] = useState<Product[]>([]);
    const { fetchData } = useFirestore<Product>('products');

    // const gatherData = useMemo(() => {
    //     let data: Product[] = [];
    //     fetchData().then((response) => {
    //         data = response;
    //     });

    //     return data;
    // }, [fetchData]);

    //     useEffect(() => {
    //        fetchData().then((response) => {
    // ;
    //        });
    //     }, [gatherData]);

    return (
        <>
            <Button
                onClick={() =>
                    fetchData().then((response) => {
                        setProductList(response);
                    })
                }
            >
                Fetch data
            </Button>
            <SearchBox />
            <SortByBox />
            <CustomTable products={productList} />
        </>
    );
}
export default ProductList;
