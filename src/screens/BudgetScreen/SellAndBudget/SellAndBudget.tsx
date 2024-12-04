import { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';

import styles from './styles.module.scss';

import PDFDocument from './PdfGenerator/PdfGenerator';

interface Product {
  name: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  totalPrice: number;
}

interface SellAndBudgetProps {
  totalPrice: number;
  clientData: any;
  productDetails: {
    [key: string]: {
      quantity: number;
      unitPrice: number;
      discount: number;
      total: number;
    };
  };
  items: Product[]; // Prop faltante
}

function SellAndBudget({
  totalPrice,
  clientData,
  productDetails,
  items,
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
        {/* <PDFDownloadLink
          document={
            <PDFDocument
              customer={clientData}
              items={Object.values(productDetails)}
              total={total}
            />
          }
          fileName='presupuesto.pdf'
        >
          {({ loading }) =>
            loading ? (
              <button className={styles.buttonBudget} type='button' disabled>
                Generando PDF...
              </button>
            ) : (
              <button className={styles.buttonBudget} type='button'>
                PRESUPUESTO
              </button>
            )
          }
        </PDFDownloadLink> */}
        <button className={styles.buttonCancel} type='button'>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default SellAndBudget;
