/* eslint-disable react/no-array-index-key */
import { Product } from 'types/data';

import qr from '~assets/qrplace.png';

import styles from './styles.module.scss';

interface Props {
  product: Product;
  size: string;
  copies: number;
}

function LabelModel3({ product, size, copies }: Props) {
  const labels = Array.from({ length: copies });
  const sizeClass = size === '5cm' ? styles.cm5 : styles.cm66;

  return (
    <div className={styles.gridWrapper}>
      {labels.map((_, index) => (
        <div className={sizeClass}>
          <div key={index} className={styles.labelContainer}>
            <div className={styles.topSection}>
              <div className={styles.topPrice}>
                <p>
                  1x <span>$ {product.prices.retail1.retail}</span>
                </p>
              </div>
              <div className={styles.middleTopSection}>
                <div className={styles.multiplePrices}>
                  <p>
                    3x <span>$ {product.prices.retail2.retail}</span>
                  </p>
                  <p>
                    5x <span>$ {product.prices.retail3.retail}</span>
                  </p>
                  <p>
                    10x <span> $ {product.prices.retail4.retail}</span>
                  </p>
                </div>
                <div className={styles.qrSection}>
                  <img className={styles.qrCode} src={qr} alt='QR' />
                  <p>{product.id.slice(0, 6)}</p>
                </div>
              </div>
            </div>
            <hr />
            <div className={styles.middleSection}>
              <p>{product.name}</p>
            </div>
            <hr />
            <div className={styles.bottomSection}>
              <p>
                {' '}
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

export default LabelModel3;
