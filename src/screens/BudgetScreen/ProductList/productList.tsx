import { useEffect, useState } from 'react';
import { Product } from 'types/data';

import ProductItem from './ProductItem/productItem';

interface ProductListProps {
  selectedProducts: Product[];
  selectedPriceType: string;
  onUpdateProductSummary: (summary: {
    totalPrice: number;
    productDetails: {
      [productId: string]: {
        quantity: number;
        unitPrice: number;
        discount: number;
        total: number;
      };
    };
  }) => void;
}

function ProductList({
  selectedProducts,
  selectedPriceType,
  onUpdateProductSummary,
}: ProductListProps) {
  const [productDetails, setProductDetails] = useState<{
    [productId: string]: {
      quantity: number;
      unitPrice: number;
      discount: number;
      total: number;
    };
  }>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const total = Object.values(productDetails).reduce(
      (sum, { total }) => sum + total,
      0
    );
    setTotalPrice(total);

    onUpdateProductSummary({ totalPrice, productDetails });
  }, [productDetails, onUpdateProductSummary]);

  const handleUpdateProductDetails = (
    productId: string,
    details: { quantity: number; unitPrice: number; discount: number },
    total: number
  ) => {
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [productId]: { ...details, total },
    }));
  };

  const handleRemoveProduct = (productId: string) => {
    setProductDetails((prevDetails) => {
      const updatedDetails = { ...prevDetails };
      delete updatedDetails[productId];
      return updatedDetails;
    });
  };

  return (
    <div>
      {selectedProducts.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          selectedPriceType={selectedPriceType}
          onRemove={handleRemoveProduct}
          onUpdateProductDetails={handleUpdateProductDetails}
        />
      ))}

      <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
        <p>Total General: $ {totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default ProductList;
