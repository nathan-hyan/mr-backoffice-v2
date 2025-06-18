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
export interface RetailPrice extends Price {
  cantidad: number;
  percent: number;
}

interface Prices {
  cost: Price; // Precio de costo
  retail: RetailPrice;
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
  unit?: 'mm' | 'cm' | 'mt';
}

interface Specifications {
  title: string;
  description: string;
}

interface ProviderProductCode {
  id: number;
  name: string;
}

export interface Department {
  id?: string;
  internalId: number;
  name: string;
  categories: Category[];
}

export interface Category {
  id?: string;
  internalId: number;
  name: string;
  departmentId?: number;
  subCategories?: {
    internalId: number;
    name: string;
    subSubCategories?: {
      internalId: number;
      name: string;
    }[];
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
  ecommerceName: string;

  stock: Stock;
  department: string;
  category: string; // Reference to categories.id
  subCategory: string; // Reference to categories.subCategories[n].id
  subSubCategories: string;
  barcode: string;
  brand: string;
  stockOwner: string;
  dimensions?: Dimensions;
  weight: number;
  weightUnit?: 'gramos' | 'kilos';
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
export interface Venta {
  id?: string;
  sellerInfo: SellerInfo;
  customerInfo: CustomerInfo;
  items: Item[];
  orderDate: string;
  orderNumber: string;
  totalPrice: number;
  isSale: boolean;
}

export interface SellerInfo {
  name: string;
  address: string;
  cuil: string;
  contactPerson: string;
  phone: string;
}

export interface CustomerInfo {
  name: string;
  address: string;
  dniCuit: string;
  phone: string;
  taxStatus: string;
}

export interface Item {
  name: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

interface ClientData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}
export interface Providers {
  id: string;
  name: string;
  address: string;
  phone1: string;
  phone2?: string;
  phone3?: string;
  phone4?: string;
  phone5?: string;
  email: string;
  orderDate: string;
  cbu: string;
  nextexpiration: string;
  restDays: string;
  balance: string;
  buys: number;
}
