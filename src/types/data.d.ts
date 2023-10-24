import { Timestamp } from 'firebase/firestore';

interface Variants {
    color: string;
    barCode: string;
    stock: number;
}

interface Price {
    value: number;
    lastModified?: Timestamp;
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

export interface Category {
    internalId: string; // 0
    name: string;
    subCategory: {
        internalId: string; // 0
        name: string;
    }[];
}

export interface Brand {
    internalId: string;
    name: string;
}

export interface Product {
    id: string; // cbfjhisasdCSDFAs32432
    name: string;
    description: string;
    stock: number;
    category: Category;
    barcode: string;
    brand: string;
    businessOwner: string;
    dimensions?: Dimensions;
    weight: number;
    storePosition: string;
    providerProductCode: ProviderProductCode[];
    specifications: Specifications[];
    variants: Variants[];
    prices: Prices;
    internalId: number; // 0
    imageURL: string[];
    createdAt: Date;
    updatedAt: Date;
    // stars: 5;
    // votes: 1234;
}
