import { useState } from 'react';
import { Product } from 'types/data';

import styles from './styles.module.scss';

import ClientInfo from './ClientInfo/clientInfo';
import { tableTitle } from './constants';
import ProductList from './ProductList/productList';
import ProductSearchBox from './ProductSearch/ProductSearchBar';
import SellAndBudget from './SellAndBudget/SellAndBudget';

function BudgetManager() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [selectedPriceType, setSelectedPriceType] = useState<string>('retail');
  const [productDetails, setProductDetails] = useState<{
    [productId: string]: {
      quantity: number;
      unitPrice: number;
      discount: number;
      total: number;
    };
  }>({});
  const [totalPrice, setTotalPrice] = useState<number>(0); // Estado para el total general
  const [clientData, setClientData] = useState<any>(null);

  const handleProductSelect = (product: Product, price: number) => {
    setSelectedProducts((prevProducts) => [...prevProducts, product]);
  };

  const handlePriceTypeChange = (newPriceType: string) => {
    setSelectedPriceType(newPriceType);
  };

  const handleProductDetailsChange = (
    productId: string,
    details: {
      quantity: number;
      unitPrice: number;
      discount: number;
      total: number;
    }
  ) => {
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [productId]: {
        quantity: details.quantity,
        unitPrice: details.unitPrice,
        discount: details.discount,
        total: details.total,
      },
    }));
  };

  const handleUpdateProductSummary = (summary: {
    totalPrice: number;
    productDetails: {
      [productId: string]: {
        quantity: number;
        unitPrice: number;
        discount: number;
        total: number;
      };
    };
  }) => {
    setProductDetails(summary.productDetails);
    setTotalPrice(summary.totalPrice);
    console.log('Resumen actualizado:', summary);
  };

  return (
    <div className={styles.container}>
      <div className={styles.budgetList}>
        <div className={styles.searchBarNav}>
          <ProductSearchBox
            onProductSelect={handleProductSelect}
            selectedPriceType={selectedPriceType}
            onPriceTypeChange={handlePriceTypeChange}
          />
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
            selectedPriceType={selectedPriceType}
            onProductDetailsChange={handleProductDetailsChange}
            onUpdateProductSummary={handleUpdateProductSummary}
          />
        </div>
      </div>
      <div className={styles.clientSide}>
        <div>
          <ClientInfo setClientData={setClientData} />
        </div>
        <div>
          <SellAndBudget
            items={selectedProducts}
            clientData={clientData}
            productDetails={productDetails}
            totalPrice={totalPrice}
          />
        </div>
      </div>
    </div>
  );
}

export default BudgetManager;
