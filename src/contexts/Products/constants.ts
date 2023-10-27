import { Category, Product } from 'types/data';

export enum SearchCriteria {
    ProductName = 0,
    BarCode = 1,
}

export enum SortBy {
    'Name',
    'LastModified',
    'InternalId',
}

interface ProductContextProps {
    productList: Product[];
    categories: Category[];
    saveProducts: (products: Product[]) => void;
    saveCategories: (categories: Category[]) => void;
    getSubcategories: (arg0: string) => Category[];
    searchQuery: string;
    performSearch: (arg0: string, arg1: SearchCriteria) => void;
    clearSearch: () => void;
    searchCriteria: SearchCriteria;
    sortBy: SortBy;
    handleSort: (arg0: SortBy) => void;
}

export const INITIAL_CONTEXT: ProductContextProps = {
    productList: [],
    categories: [],
    saveProducts: () => {},
    saveCategories: () => {},
    getSubcategories: () => [],
    searchQuery: '',
    performSearch: () => {},
    clearSearch: () => {},
    searchCriteria: SearchCriteria.ProductName,
    sortBy: SortBy.Name,
    handleSort: () => {},
};
