import { Timestamp } from 'firebase/firestore';
import type { Product } from 'types/data';

import { InputType } from '~components/CustomInput/constants';

export type PriceInputName =
  | 'retail'
  | 'online'
  | 'mayo1'
  | 'mayo2'
  | 'mayo3'
  | 'mayo4'
  | 'reseller';

export type LocalFormInputName =
  | 'brand'
  | 'stockOwner'
  | 'weight'
  | 'storeBranch'
  | 'storePosition';

export type DimensionsInputName = 'width' | 'height' | 'depth';

export type DescriptionInputName = 'title' | 'description';

export type VariantsInputName = 'color' | 'barcode' | 'stock';

export type StockInputName =
  | 'current'
  | 'minStock'
  | 'maxStock'
  | 'noPhysicalStock';

interface Form<T> {
  id: number;
  label: string;
  name: T;
  required: boolean;
  multiline?: boolean;
  type: InputType;
  disabled?: boolean;
  min?: number;
  max?: number;
}

export const PRODUCT_FORM: Form<keyof Product>[] = [
  {
    id: 0,
    label: 'Nombre del producto',
    name: 'name',
    type: InputType.Text,
    required: true,
  },
  {
    id: 3,
    label: 'Descripción',
    name: 'description',
    type: InputType.Text,
    multiline: true,
    required: true,
  },
];

export const PRICE_FORM: Form<PriceInputName>[] = [
  {
    id: 1,
    label: 'Retail',
    name: 'retail',
    type: InputType.Number,
    required: true,
  },
  {
    id: 2,
    label: 'Online',
    name: 'online',
    type: InputType.Number,
    required: true,
  },
  {
    id: 3,
    label: 'Mayorista 1',
    name: 'mayo1',
    type: InputType.Number,
    required: true,
  },
  {
    id: 4,
    label: 'Mayorista 2',
    name: 'mayo2',
    type: InputType.Number,
    required: true,
  },
  {
    id: 5,
    label: 'Mayorista 3',
    name: 'mayo3',
    type: InputType.Number,
    required: true,
  },
  {
    id: 6,
    label: 'Mayorista 4',
    name: 'mayo4',
    type: InputType.Number,
    required: true,
  },
  {
    id: 7,
    label: 'Reseller',
    name: 'reseller',
    type: InputType.Number,
    required: true,
  },
];

export const LOCAL_INFO_FORM: Form<keyof Product>[] = [
  // {
  //     id: 1,
  //     label: 'Marca',
  //     name: 'brand',
  //     type: InputType.Text,
  //     required: true,
  // },
  // {
  //     id: 4,
  //     label: 'Sucursal',
  //     name: 'storeBranch',
  //     type: InputType.Text,
  // },
  {
    id: 5,
    label: 'Ubicación dentro de sucursal',
    name: 'storePosition',
    type: InputType.Text,
    required: true,
  },
  {
    id: 6,
    label: 'Peso (kg)',
    name: 'weight',
    type: InputType.Number,
    required: false,
  },
];

export const DIMENSIONS_FORM: Form<DimensionsInputName>[] = [
  {
    id: 1,
    label: 'Altura',
    name: 'height',
    type: InputType.Number,
    required: false,
  },
  {
    id: 2,
    label: 'Ancho',
    name: 'width',
    type: InputType.Number,
    required: false,
  },
  {
    id: 3,
    label: 'Largo',
    name: 'depth',
    type: InputType.Number,
    required: false,
  },
];

export const SPECIFICATIONS_FORM: Form<DescriptionInputName>[] = [
  {
    id: 1,
    label: 'Titulo',
    name: 'title',
    type: InputType.Text,
    required: false,
  },
  {
    id: 2,
    label: 'Descripcion',
    name: 'description',
    type: InputType.Text,
    required: false,
  },
];

export const VARIANTS_FORM: Form<VariantsInputName>[] = [
  {
    id: 1,
    label: 'Color',
    name: 'color',
    type: InputType.Text,
    required: false,
  },
  {
    id: 2,
    label: 'Barcode',
    name: 'barcode',
    type: InputType.Text,
    required: false,
  },
  {
    id: 3,
    label: 'Stock',
    name: 'stock',
    type: InputType.Number,
    required: false,
  },
];

export const SPECIFICATIONS_FORM_EMPTY = {
  title: '',
  description: '',
};

export const VARIANTS_FORM_EMPTY = {
  color: '',
  barCode: '',
  stock: 0,
};

export const PROVIDER_PRODUCT_CODE_FORM_EMPTY = {
  id: 0,
  name: '',
};

export enum SearchType {
  'BAR_CODE',
  'PRODUCT_ID',
}

export const EMPTY_FORM: Product = {
  description: '',
  internalId: 0,
  showInStore: false,
  userFeedback: [],
  imageURL: [''],
  createdAt: new Timestamp(0, 0),
  updatedAt: new Timestamp(0, 0),
  id: '',
  specifications: [],
  variants: [],
  providerProductCode: [],
  name: '',
  stock: {
    current: 0,
    minStock: 0,
    maxStock: 0,
    noPhysicalStock: false,
  },
  barcode: '',
  category: '',
  subCategory: '',
  prices: {
    cost: { value: 0 },
    retail: { value: 80 },
    online: { value: 65 },
    mayo1: { value: 60 },
    mayo2: { value: 50 },
    mayo3: { value: 40 },
    mayo4: { value: 35 },
    reseller: { value: 20 },
  },
  brand: '',
  stockOwner: '',
  storePosition: '',
  weight: 0,
  dimensions: {
    height: 0,
    width: 0,
    depth: 0,
  },
};

export const dummyProduct: Product = {
  id: '',
  name: '',
  description: '',
  stock: {
    current: 0,
    minStock: 0,
    maxStock: 0,
    noPhysicalStock: false,
  },
  category: '',
  subCategory: '',
  translatedCategory: { name: '', id: '', internalId: 0 },
  translatedSubCategory: { name: '', id: '', internalId: 0 },
  barcode: '',
  brand: '',
  translatedBrand: '',
  stockOwner: '',
  dimensions: { height: 0, width: 0, depth: 0 },
  weight: 0,
  storePosition: '',
  providerProductCode: [],
  specifications: [],
  variants: [],
  prices: {
    cost: {
      value: 0,
      lastModified: undefined,
    },
    retail: {
      value: 0,
      lastModified: undefined,
    },
    online: {
      value: 0,
      lastModified: undefined,
    },
    mayo1: {
      value: 0,
      lastModified: undefined,
    },
    mayo2: {
      value: 0,
      lastModified: undefined,
    },
    mayo3: {
      value: 0,
      lastModified: undefined,
    },
    mayo4: {
      value: 0,
      lastModified: undefined,
    },
    reseller: {
      value: 0,
      lastModified: undefined,
    },
  },
  internalId: 0,
  imageURL: [],
  createdAt: new Timestamp(0, 0),
  updatedAt: new Timestamp(0, 0),
  showInStore: false,
  userFeedback: [],
};
