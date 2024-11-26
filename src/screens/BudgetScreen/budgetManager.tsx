import { useState } from 'react';
import { Product } from 'types/data';

import styles from './styles.module.scss';

import ClientInfo from './ClientInfo/clientInfo';
import { tableTitle } from './constants';
import ProductList from './ProductList/productList';
import ProductSearchBox from './ProductSearch/ProductSearchBar';
import SellAndBudget from './SellAndBudget/SellAndBudget';

function BudgetManager() {
  // Estado para manejar los productos seleccionados y sus precios
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [selectedPriceTypes, setSelectedPriceTypes] = useState<string[]>([]);

  const handleProductSelect = (product: Product, price: number) => {
    setSelectedProducts((prevProducts) => [...prevProducts, product]); // Agregar el producto seleccionado
    setSelectedPriceTypes((prevPriceTypes) => [
      ...prevPriceTypes,
      price.toString(),
    ]); // Agregar el precio seleccionado
  };

  return (
    <div className={styles.container}>
      <div className={styles.budgetList}>
        <div className={styles.searchBarNav}>
          <ProductSearchBox onProductSelect={handleProductSelect} />
        </div>
        <div className={styles.titleBar}>
          {tableTitle.map((column) => (
            <div
              key={column.id}
              className={styles.tableTitle}
              style={{ width: column.width, padding: '7px' }}
            >
              {column.label}
            </div>
          ))}
        </div>
        <div className={styles.productList}>
          <ProductList
            selectedProducts={selectedProducts}
            selectedPriceType={selectedPriceTypes}
          />
        </div>
      </div>
      <div className={styles.clientSide}>
        <div>
          <ClientInfo />
        </div>{' '}
        <div>
          <SellAndBudget />
        </div>
      </div>
    </div>
  );
}

export default BudgetManager;
