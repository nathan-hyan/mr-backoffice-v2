import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';
import { Product } from 'types/data';

import {
    INITIAL_CONTEXT,
    mockProducts,
    SearchCriteria,
    SortBy,
} from './constants';
import { compare } from './utils';

interface Props {
    children: ReactNode;
}

const ProductContext = createContext(INITIAL_CONTEXT);

export default function ProductProvider({ children }: Props) {
    const [productList, setProductList] = useState<Product[]>(mockProducts);
    const [productListCopy, setProductListCopy] =
        useState<Product[]>(mockProducts);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>(
        SearchCriteria.ProductName
    );
    const [sortBy, setSortBy] = useState<SortBy>(SortBy.Name);

    const saveProducts = useCallback((products: Product[]) => {
        setProductList(products);
        setProductListCopy(products);
    }, []);

    const performSearch = useCallback(
        (query: string, criteria: SearchCriteria) => {
            setSearchQuery(query);
            setSearchCriteria(criteria);

            const filteredProducts = productListCopy.filter(
                ({ name, barcode }) =>
                    criteria === SearchCriteria.ProductName
                        ? name.toLowerCase().includes(query.toLocaleLowerCase())
                        : barcode
                              .toLowerCase()
                              .includes(query.toLocaleLowerCase())
            );

            setProductList(filteredProducts);
        },
        [productListCopy]
    );

    const clearSearch = useCallback(() => {
        setSearchQuery('');
        setSearchCriteria(SearchCriteria.ProductName);
        setProductList(productListCopy);
    }, [productListCopy]);

    const handleSort = useCallback(
        (newSorting: SortBy) => {
            setSortBy(newSorting);

            const sortedItems = productList.sort(compare(newSorting));

            setProductList(sortedItems);
        },
        [productList]
    );

    const value = useMemo(
        () => ({
            productList,
            saveProducts,
            performSearch,
            searchQuery,
            clearSearch,
            searchCriteria,
            sortBy,
            handleSort,
        }),
        [
            productList,
            saveProducts,
            performSearch,
            searchQuery,
            clearSearch,
            searchCriteria,
            sortBy,
            handleSort,
        ]
    );

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
}

export const useProducts = () => {
    const ctx = useContext(ProductContext);

    if (!ctx) {
        throw new Error("You're not using the correct context!");
    }

    return ctx;
};
