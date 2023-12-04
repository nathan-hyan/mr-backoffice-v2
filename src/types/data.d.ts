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
  id?: string;
  internalId: number;
  name: string;
  subCategories?: {
    internalId: number;
    name: string;
  }[];
}

export interface Brand {
  id?: string;
  internalId: number;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  stock: number;
  category: string; // Reference to categories.id
  subCategory: string; // Reference to categories.subCategories[n].id
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
  createdAt: Timestamp;
  updatedAt: Timestamp;
  showInStore: boolean;
  userFeedback: {
    id: number;
    comment: string;
    rating: number;
  }[];
}
