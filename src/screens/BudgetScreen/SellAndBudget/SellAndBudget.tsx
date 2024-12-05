import { PDFDownloadLink } from '@react-pdf/renderer';
import { Product } from 'types/data';

import styles from './styles.module.scss';

import PDFDocument from './PdfGenerator/PdfGenerator';

interface SellAndBudgetProps {
  totalPrice: number;
  clientData: never;
  productDetails: {
    [key: string]: {
      quantity: number;
      unitPrice: number;
      discount: number;
      total: number;
    };
  };
  items: Product[];
  onCancel: () => void;
}

function SellAndBudget({
  totalPrice,
  clientData,
  productDetails,
  items,
  onCancel,
}: SellAndBudgetProps) {
  return (
    <div className={styles.container}>
      <div className={styles.totalPrice}>
        <p>Total: $ {totalPrice ? totalPrice.toFixed(2) : '0.00'}</p>
      </div>
      <div>
        <button className={styles.buttonVenta} type='button'>
          PROCEDER CON LA VENTA
        </button>
      </div>
      <div className={styles.buttons}>
        <PDFDownloadLink
          document={
            <PDFDocument
              customer={clientData}
              items={items}
              productDetails={productDetails}
              totalPrice={totalPrice}
            />
          }
          fileName='presupuesto.pdf'
        >
          <button className={styles.buttonBudget} type='button'>
            PRESUPUESTO
          </button>
        </PDFDownloadLink>
        <button
          className={styles.buttonCancel}
          type='button'
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default SellAndBudget;
