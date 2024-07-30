import type { Product, UserFeedback } from 'types/data';

export const translateStock = (field: keyof Product['stock']) => {
  switch (field) {
    case 'minStock':
      return 'Stock minimo';

    case 'current':
      return 'Stock actual';

    case 'maxStock':
      return 'Stock maximo';

    case 'noPhysicalStock':
      return 'Sin stock fisico';

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

    case 'stockOwner':
      return 'Dueño de stock';

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
  delete copy.userFeedback;
  delete copy.stock;

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
        value: copy.translatedBrand || '',
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

    // if (field === 'stock') {
    //   result.push({
    //     title: translateFields('stock'),
    //     value: `Disponible: ${copy.stock?.current}, Minimo: ${copy.stock?.minStock}, Maximo: ${copy.stock?.maxStock}, Sin stock fisico: ${copy.stock?.noPhysicalStock ? 'Si' : 'No'}`,
    //   });

    //   return;
    // }

    result.push({
      title: translateFields(field as keyof Product),
      value: String(copy[field as keyof Product]),
    });
  });

  return result;
};

export const getAverageRating = (array: UserFeedback[]) => {
  const ratingSum = array.reduce((prev, curr) => {
    return prev + curr.rating;
  }, 0);

  return ratingSum / array.length;
};
