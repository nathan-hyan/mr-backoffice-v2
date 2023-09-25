interface Variants {
    color: string;
    barCode: string;
    stock: number;
}

interface Price {
    value: number;
    lastModified?: Date;
}

interface Prices {
    cost: Price;
    cash: Price;
    list: Price;
    web: Price;
}

interface Dimensions {
    height: number;
    width: number;
    depth: number;
}

interface Specifications {
    title: string;
    description: string;
}

interface ProviderProductCode {
    id: number;
    name: string;
}

export interface Product {
    id: string;
    name: string;
    stock: number;
    barcode: string;
    category: string;
    subCategory?: string;
    brand: string;
    businessOwner: string;
    dimensions: Dimensions;
    weight: number;
    storePosition: string;
    providerProductCode: ProviderProductCode[];
    description: string;
    specifications: Specifications[];
    variants: Variants[];
    prices: Prices;
    internalId: number;
    imageURL: string;
    createdAt: Date;
    updatedAt: Date;
}
