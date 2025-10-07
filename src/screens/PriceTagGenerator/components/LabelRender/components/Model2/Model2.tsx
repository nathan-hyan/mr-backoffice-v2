/* eslint-disable react/no-array-index-key */
import qr from '~assets/qrplace.png';

import styles from './styles.module.scss';

interface Product {
  id: string;
  name: string;
  barcode: string;
  prices: {
    retail1: {
      retail: number;
    };
  };
}

interface Props {
  product: Product;
  size: string;
  copies: number;
}

function LabelModel2({ product, size, copies }: Props) {
  const labels = Array.from({ length: copies });
  const sizeClass = size === '5cm' ? styles.cm5 : styles.cm66;

  return (
    <div className={styles.gridWrapper}>
      {labels.map((_, index) => (
        <div className={`${styles.labelContainer} ${sizeClass}`}>
          <div key={index}>
            <div className={styles.topSection}>
              <h2>${product.prices.retail1.retail}</h2>
              <div className={styles.qrSection}>
                <img className={styles.qrCode} src={qr} alt='QR' />
                <p>{product.id.slice(0, 6)}</p>
              </div>
            </div>
            <hr />
            <div className={styles.middleSection}>
              <p>{product.name}</p>
            </div>
            <hr />
            <div className={styles.bottomSection}>
              <p>
                <span>COD.BARRA: </span>
                {product.barcode}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LabelModel2;
