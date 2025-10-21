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
  copies: number;
}

function LabelModel1({ product, copies }: Props) {
  const labels = Array.from({ length: copies });

  return (
    <div className={styles.gridWrapper}>
      {labels.map((_, index) => (
        <div className={styles.labelContainer} key={index}>
          <div className={styles.content}>
            <div className={styles.barcodeSection}>
              <BarcodeGenerator value={product.barcode} />
              <p>COD.BARRA:{product.barcode}</p>
            </div>

            <div className={styles.name}>
              <hr />
              <p>{product.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LabelModel1;
