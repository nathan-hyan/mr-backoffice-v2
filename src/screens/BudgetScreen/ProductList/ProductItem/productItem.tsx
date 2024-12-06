/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useState } from 'react';
import { Product } from 'types/data';

import styles from './styles.module.scss';

import basura from '../../../../assets/basura 1.svg';

interface ProductItemProps {
  product: Product;
  selectedPriceType: string;
  onRemove: (productId: string) => void;
  onUpdateProductDetails: (
    productId: string,
    details: { quantity: number; unitPrice: number; discount: number },
    total: number
  ) => void;
}

interface Prices {
  cost: { value: number };
  retail: { value: number };
  online: { value: number };
  mayo1: { value: number };
  mayo2: { value: number };
  mayo3: { value: number };
  mayo4: { value: number };
  reseller: { value: number };
}

function ProductItem({
  product,
  selectedPriceType,
  onRemove,
  onUpdateProductDetails,
}: ProductItemProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [discount, setDiscount] = useState<number>(0);
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const basePrice = product.prices.cost?.value || 0;
    const percentage =
      selectedPriceType in product.prices
        ? product.prices[selectedPriceType as keyof Prices].value
        : 0;

    const price = basePrice * (percentage / 100 + 1);
    setUnitPrice(price);

    const newTotalPrice = price * quantity * (1 - discount / 100);
    setTotalPrice(newTotalPrice);

    onUpdateProductDetails(
      product.id,
      { quantity, unitPrice: price, discount },
      newTotalPrice
    );
  }, [product, selectedPriceType, quantity, discount]);

  const handleQuantityChange = (increment: boolean) => {
    setQuantity((prevQuantity) => {
      const newQuantity = increment
        ? Math.min(prevQuantity + 1, product.stock.current)
        : Math.max(1, prevQuantity - 1);

      const newTotalPrice = newQuantity * unitPrice * (1 - discount / 100);
      setTotalPrice(newTotalPrice);
      onUpdateProductDetails(
        product.id,
        { quantity: newQuantity, unitPrice, discount },
        newTotalPrice
      );

      return newQuantity;
    });
  };

  const handleDiscountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const validDiscount = Number.isNaN(value) ? 0 : Math.min(value, 100);
    setDiscount(validDiscount);
    const newTotalPrice = quantity * unitPrice * (1 - validDiscount / 100);
    setTotalPrice(newTotalPrice);
    onUpdateProductDetails(
      product.id,
      { quantity, unitPrice, discount: validDiscount },
      newTotalPrice
    );
  };

  const handleUnitPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const updatedUnitPrice = Number.isNaN(value) ? 0 : value;
    setUnitPrice(updatedUnitPrice);
    const newTotalPrice = updatedUnitPrice * quantity * (1 - discount / 100);
    setTotalPrice(newTotalPrice);
    onUpdateProductDetails(
      product.id,
      { quantity, unitPrice: updatedUnitPrice, discount },
      newTotalPrice
    );
  };

  return (
    <div className={styles.container}>
      <p style={{ width: '8%', padding: '7px' }}>{product.internalId}</p>
      <p style={{ width: '34%', padding: '7px' }}>{product.name}</p>

      <div style={{ width: '12%', padding: '7px' }}>
        <button
          className={styles.quantityButton}
          type='button'
          onClick={() => handleQuantityChange(false)}
        >
          -
        </button>
        <input
          className={styles.quantityInput}
          type='number'
          value={quantity}
          onChange={(e) => {
            const newQuantity = Math.min(
              Math.max(1, parseInt(e.target.value, 10)),
              product.stock.current
            );
            setQuantity(newQuantity);
            const newTotalPrice =
              newQuantity * unitPrice * (1 - discount / 100);
            setTotalPrice(newTotalPrice);
            onUpdateProductDetails(
              product.id,
              { quantity: newQuantity, unitPrice, discount },
              newTotalPrice
            );
          }}
          max={product.stock.current}
        />
        <button
          className={styles.quantityButton}
          type='button'
          onClick={() => handleQuantityChange(true)}
        >
          +
        </button>
      </div>

      <div className={styles.unitPrice}>
        <div className={styles.moneyButton}>$</div>
        <input
          className={styles.unitPriceInput}
          type='number'
          value={unitPrice.toFixed(2)}
          onChange={handleUnitPriceChange}
        />
      </div>

      <div className={styles.discount}>
        <div className={styles.discountButton}>%</div>
        <input
          className={styles.discountInput}
          type='number'
          value={discount}
          onChange={handleDiscountChange}
        />
      </div>

      <div className={styles.totalPrice}>
        <p>$ {totalPrice.toFixed(2)}</p>
      </div>

      <button
        className={styles.deleteButton}
        type='button'
        onClick={() => onRemove(product.id)}
      >
        <img src={basura} alt='delete' />
      </button>
    </div>
  );
}

export default ProductItem;
