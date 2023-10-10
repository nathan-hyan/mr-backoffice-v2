import { Product } from 'types/data';

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
    saveProducts: (products: Product[]) => void;
    searchQuery: string;
    performSearch: (arg0: string, arg1: SearchCriteria) => void;
    clearSearch: () => void;
    searchCriteria: SearchCriteria;
    sortBy: SortBy;
    handleSort: (arg0: SortBy) => void;
}

export const INITIAL_CONTEXT: ProductContextProps = {
    productList: [],
    saveProducts: () => {},
    searchQuery: '',
    performSearch: () => {},
    clearSearch: () => {},
    searchCriteria: SearchCriteria.ProductName,
    sortBy: SortBy.Name,
    handleSort: () => {},
};

export const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Product 1',
        stock: 0,
        barcode: '123456789',
        category: 'Electronics',
        brand: 'Brand A',
        businessOwner: 'Business A',
        dimensions: { height: 10, width: 5, depth: 3 },
        weight: 2.5,
        storePosition: 'A-1',
        providerProductCode: [{ id: 1, name: 'Code 1' }],
        description: 'This is Product 1',
        specifications: [{ title: 'Spec 1', description: 'Description 1' }],
        variants: [
            { color: 'Red', barCode: '123456701', stock: 5 },
            { color: 'Blue', barCode: '123456702', stock: 3 },
        ],
        prices: {
            cost: { value: 50 },
            cash: { value: 60 },
            list: { value: 70 },
            web: { value: 65, lastModified: new Date() },
        },
        internalId: 101,
        imageURL: 'https://example.com/product1.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '2',
        name: 'Product 2',
        stock: 20,
        barcode: '987654321',
        category: 'Clothing',
        brand: 'Brand B',
        businessOwner: 'Business B',
        dimensions: { height: 15, width: 8, depth: 4 },
        weight: 1.8,
        storePosition: 'B-2',
        providerProductCode: [{ id: 2, name: 'Code 2' }],
        description: 'This is Product 2',
        specifications: [{ title: 'Spec 2', description: 'Description 2' }],
        variants: [
            { color: 'Green', barCode: '987654701', stock: 8 },
            { color: 'Yellow', barCode: '987654702', stock: 12 },
        ],
        prices: {
            cost: { value: 40 },
            cash: { value: 45 },
            list: { value: 55 },
            web: { value: 50, lastModified: new Date() },
        },
        internalId: 102,
        imageURL: 'https://example.com/product2.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '3',
        name: 'Product 3',
        stock: 5,
        barcode: '654321987',
        category: 'Home & Garden',
        brand: 'Brand C',
        businessOwner: 'Business C',
        dimensions: { height: 12, width: 6, depth: 5 },
        weight: 3.2,
        storePosition: 'C-3',
        providerProductCode: [{ id: 3, name: 'Code 3' }],
        description: 'This is Product 3',
        specifications: [{ title: 'Spec 3', description: 'Description 3' }],
        variants: [
            { color: 'White', barCode: '654321701', stock: 2 },
            { color: 'Black', barCode: '654321702', stock: 3 },
        ],
        prices: {
            cost: { value: 60 },
            cash: { value: 70 },
            list: { value: 80 },
            web: { value: 75, lastModified: new Date() },
        },
        internalId: 103,
        imageURL: 'https://example.com/product3.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
