import { Product } from 'types/data';

export const sortProducts = (products: Product[], sortBy: string = 'name') => {
  switch (sortBy) {
    case 'name':
      return products.sort((a, b) => a.name.localeCompare(b.name));
    case 'lastModified':
      return products.sort((a, b) => {
        const dateA = a.updatedAt.toDate();
        const dateB = b.updatedAt.toDate();

        return dateB.getTime() - dateA.getTime();
      });
    case 'internalId':
      return products.sort((a, b) => a.internalId - b.internalId);
    default:
      return products.sort((a, b) => a.name.localeCompare(b.name));
  }
};

export const filterProducts = (
  products: Product[],
  searchTerm?: string,
  searchCriteria?: string
) => {
  return products.filter((product) => {
    if (!searchTerm) {
      return true;
    }

    if (searchCriteria === 'name') {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    }

    if (searchCriteria === 'barcode') {
      return String(product.barcode)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    }
  });
};
