import { Product } from 'types/data';

export const translatePrices = (field: keyof Product['prices']) => {
  switch (field) {
    case 'cash':
      return 'Precio en efectivo';

    case 'cost':
      return 'Precio de costo';

    case 'list':
      return 'Precio de lista';

    case 'web':
      return 'Precio web';

    default:
      return `ERROR: ${field}`;
  }
};

export const translateFields = (field: keyof Product) => {
  switch (field) {
    case 'barcode':
      return 'Codigo de barras';

    case 'brand':
      return 'Marca';

    case 'businessOwner':
      return 'Dueño de negocio';

    case 'internalId':
      return 'ID Interno';

    case 'id':
      return 'ID Base de datos';

    case 'weight':
      return 'Peso';

    case 'stock':
      return 'Stock disponible';

    case 'createdAt':
      return 'Fecha de creación';

    case 'updatedAt':
      return 'Fecha de modificación';

    case 'storePosition':
      return 'Ubicación en el local';

    default:
      return `ERROR: ${field}`;
  }
};

export const prepareDataForDisplay = (
  data: Product,
  translateBrand: (arg0: string) => string | undefined
) => {
  const copy: Partial<Product> = { ...data };
  const result: { title: string; value: string }[] = [];

  delete copy.name;
  delete copy.imageURL;
  delete copy.description;
  delete copy.category;
  delete copy.subCategory;
  delete copy.prices;
  delete copy.createdAt;
  delete copy.updatedAt;
  delete copy.providerProductCode;
  delete copy.specifications;
  delete copy.variants;
  delete copy.id;
  delete copy.showInStore;

  Object.keys(copy).forEach((field) => {
    if (field === 'weight') {
      result.push({
        title: translateFields('weight'),
        value: `${copy.weight}kg`,
      });

      return;
    }

    if (field === 'brand') {
      result.push({
        title: translateFields('brand'),
        value: translateBrand(copy.brand || '') || '',
      });

      return;
    }

    if (field === 'dimensions') {
      result.push({
        title: 'Dimensiones',
        value: `Alto: ${copy.dimensions?.height}cm, Ancho: ${copy.dimensions?.width}cm, Profundidad: ${copy.dimensions?.depth}cm`,
      });

      return;
    }

    result.push({
      title: translateFields(field as keyof Product),
      value: String(copy[field as keyof Product]),
    });
  });

  return result;
};
