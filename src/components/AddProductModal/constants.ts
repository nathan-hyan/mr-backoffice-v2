import { Timestamp } from 'firebase/firestore';
import { Product } from 'types/data';

import { InputType } from '~components/CustomInput/constants';

export type PriceInputName = 'cost' | 'list' | 'web' | 'cash';

export type LocalFormInputName =
  | 'brand'
  | 'businessOwner'
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
  {
    id: 2,
    label: 'Código de barras',
    name: 'barcode',
    type: InputType.Number,
    required: false,
  },
];

export const STOCK_FORM: Form<StockInputName>[] = [
  {
    id: 0,
    label: 'Stock actual',
    name: 'current',
    type: InputType.Number,
    required: true,
  },
  {
    id: 1,
    label: 'Stock mínimo',
    name: 'minStock',
    type: InputType.Number,
    required: false,
  },
  {
    id: 2,
    label: 'Stock máximo',
    name: 'maxStock',
    type: InputType.Number,
    required: false,
  },
];

export const PRICE_FORM: Form<PriceInputName>[] = [
  {
    id: 1,
    label: 'Precio de costo',
    name: 'cost',
    type: InputType.Number,
    required: true,
  },
  {
    id: 2,
    label: 'Precio de lista',
    name: 'list',
    type: InputType.Number,
    required: true,
  },
  {
    id: 3,
    label: 'Precio online',
    name: 'web',
    type: InputType.Number,
    required: true,
  },
  {
    id: 4,
    label: 'Precio de contado',
    name: 'cash',
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
  {
    id: 2,
    label: 'Dueño de negocio',
    name: 'businessOwner',
    type: InputType.Text,
    required: true,
  },
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
    list: { value: 0 },
    web: { value: 0 },
    cash: { value: 0 },
  },
  brand: '',
  businessOwner: '',
  storePosition: '',
  weight: 0,
  dimensions: {
    height: 0,
    width: 0,
    depth: 0,
  },
};
