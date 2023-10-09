import { useState } from 'react';

import CustomTable from '~components/CustomTable';
import SearchBox from '~components/SearchBox';
import SortByBox from '~components/SortByBox';
import { SortBy } from '~components/SortByBox/constants';

function ProductList() {
    const [sortBy, setSortBy] = useState<SortBy>(SortBy.Name);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <>
            <SearchBox
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <SortByBox setSortBy={setSortBy} sortBy={sortBy} />
            <CustomTable />
        </>
    );
}
export default ProductList;
