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
/*
 | 'retail'
  | 'online'
  | 'mayo1'
  | 'mayo2'
  | 'mayo3'
  | 'mayo4'
  | 'reseller';
  */

interface Prices {
  cost: Price; // Precio de costo
  retail: Price;
  online: Price;
  mayo1: Price;
  mayo2: Price;
  mayo3: Price;
  mayo4: Price;
  reseller: Price;
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

export interface UserFeedback {
  id: number;
  comment: string;
  rating: number;
}

export interface Stock {
  current: number;
  minStock: number;
  maxStock: number;
  noPhysicalStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;

  stock: Stock;

  category: string; // Reference to categories.id
  subCategory: string; // Reference to categories.subCategories[n].id
  translatedCategory?: Category;
  translatedSubCategory?: Category;
  barcode: string;
  brand: string;
  translatedBrand?: string;
  stockOwner: string;
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
  userFeedback: UserFeedback[];
}
