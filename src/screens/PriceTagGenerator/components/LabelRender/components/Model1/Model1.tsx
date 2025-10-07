/* eslint-disable react/no-array-index-key */
import BarcodeGenerator from '~screens/PriceTagGenerator/components/BarcodeGenerator';

import styles from './styles.module.scss';

interface Product {
  id: string;
  name: string;
  barcode: string;
}

interface Props {
  product: Product;
  size: string;
  copies: number;
}

function LabelModel1({ product, size, copies }: Props) {
  const labels = Array.from({ length: copies });

  const sizeClass = size === '5cm' ? styles.cm5 : styles.cm66;

  return (
    <div className={styles.gridWrapper}>
      {labels.map((_, index) => (
        <div className={`${styles.labelContainer} ${sizeClass}`}>
          <div className={styles.content} key={index}>
            <BarcodeGenerator value={product.barcode} />
            <p>{product.barcode}</p>

            <div className={styles.name}>
              <hr /> <p>{product.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LabelModel1;
