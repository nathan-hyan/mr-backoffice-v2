import { ChangeEvent, useState } from 'react';
import { Product } from 'types/data';

import styles from './styles.module.scss';

interface ProductItemProps {
  product: Product;
  selectedPriceType: string;
  onRemove: (productId: number) => void;
}

function ProductItem({
  product,
  selectedPriceType,
  onRemove,
}: ProductItemProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [discount, setDiscount] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(
    product.prices[selectedPriceType]?.value || 0
  );

  const handleQuantityChange = (increment: boolean) => {
    setQuantity((prevQuantity) =>
      increment ? prevQuantity + 1 : Math.max(1, prevQuantity - 1)
    );
  };

  const handleDiscountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setDiscount(isNaN(value) ? 0 : value);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setTotalPrice(isNaN(value) ? 0 : value);
  };

  return (
    <div className={styles.container}>
      <p style={{ width: '10%', padding: '7px' }}> {product.id}</p>
      <p style={{ width: '34%', padding: '7px' }}> {product.name}</p>

      <div style={{ width: '10%', padding: '7px' }}>
        <button type='button' onClick={() => handleQuantityChange(false)}>
          -
        </button>
        <input
          className={styles.quantityInput}
          type='number'
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
        />
        <button type='button' onClick={() => handleQuantityChange(true)}>
          +
        </button>
      </div>

      <div style={{ width: '12%', padding: '7px' }}>
        <input
          className={styles.totalPrice}
          type='number'
          value={totalPrice}
          onChange={handlePriceChange}
        />
      </div>

      <div style={{ width: '11%', padding: '7px' }}>
        <input
          className={styles.discount}
          type='number'
          value={discount}
          onChange={handleDiscountChange}
        />
      </div>

      <div style={{ width: '14%', padding: '7px' }}>
        <p> {totalPrice}</p>
      </div>

      <button
        style={{ width: '9%', padding: '7px' }}
        onClick={() => onRemove(product.id)}
      >
        x
      </button>
    </div>
  );
}

export default ProductItem;
