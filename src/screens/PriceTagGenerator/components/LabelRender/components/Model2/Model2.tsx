/* eslint-disable react/no-array-index-key */
import qr from '~assets/qrplace.png';
import calculateNumberWithPercentage from '~utils/addPercentage';

import styles from './styles.module.scss';

interface Product {
  id: string;
  name: string;
  barcode: string;
  prices: {
    retail1: {
      retail: number;
    };
    cost: {
      value: number;
    };
    retail: { value: number };
  };
}

interface Props {
  product: Product;
  size: string;
  copies: number;
}

function LabelModel2({ product, size, copies }: Props) {
  const labels = Array.from({ length: copies });

  let sizeClass = '';
  if (size === '4cm') {
    sizeClass = styles.cm4;
  } else if (size === '5cm') {
    sizeClass = styles.cm5;
  } else {
    sizeClass = styles.cm66;
  }

  return (
    <div className={styles.gridWrapper}>
      {labels.map((_, index) => (
        <div key={index} className={sizeClass}>
          <div className={styles.labelContainer}>
            <div className={styles.topSection}>
              <h2>
                $
                {product.prices.retail1?.retail
                  ? Math.floor(product.prices.retail1.retail)
                  : Math.floor(
                      calculateNumberWithPercentage(
                        product.prices.cost?.value ?? 0,
                        product.prices.retail?.value ?? 0,
                        'incr'
                      ) || 0
                    )}
              </h2>
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
