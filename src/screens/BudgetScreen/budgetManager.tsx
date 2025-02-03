/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { ClientData, Product } from 'types/data';

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
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [clientData, setClientData] = useState<ClientData | null>(null);

  const handleProductSelect = (product: Product) => {
    setSelectedProducts((prevProducts) => [...prevProducts, product]);
  };

  const handlePriceTypeChange = (newPriceType: string) => {
    setSelectedPriceType(newPriceType);
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
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter(
        (product) => product.id !== productId
      );

      setProductDetails((prevDetails) => {
        const updatedDetails = { ...prevDetails };
        delete updatedDetails[productId];
        return updatedDetails;
      });

      return updatedProducts;
    });
  };
  const handleCancel = () => {
    setSelectedProducts([]);
    setProductDetails({});
    setTotalPrice(0);
    setClientData(null);
  };

  useEffect(() => {
    const newTotalPrice = selectedProducts.reduce((accum, product) => {
      const details = productDetails[product.id];
      return details ? accum + details.total : accum;
    }, 0);

    setTotalPrice(newTotalPrice);
  }, [selectedProducts, productDetails, clientData]);

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
            onUpdateProductSummary={handleUpdateProductSummary}
            onRemoveProduct={handleRemoveProduct}
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
            onCancel={handleCancel}
            onComplete={handleCancel}
          />
        </div>
      </div>
    </div>
  );
}

export default BudgetManager;
