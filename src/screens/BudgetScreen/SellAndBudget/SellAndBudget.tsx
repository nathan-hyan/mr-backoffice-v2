import { useContext, useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Product } from 'types/data';

import styles from './styles.module.scss';

import { VentasContext } from '../../../contexts/Sells';
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
  onComplete: () => void;
}

function SellAndBudget({
  totalPrice,
  clientData,
  productDetails,
  items,
  onCancel,
  onComplete,
}: SellAndBudgetProps) {
  const { createVenta, getNextOrderNumber } = useContext(VentasContext);
  const [orderNumber, setOrderNumber] = useState('');
  const [calculatedTotalPrice, setCalculatedTotalPrice] = useState(totalPrice);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const newTotalPrice = items.reduce((accum, item) => {
        const details = productDetails[item.id];
        return details ? accum + details.total : accum;
      }, 0);
      setCalculatedTotalPrice(newTotalPrice);
    };

    calculateTotalPrice();
  }, [items, productDetails]);

  const handleVenta = async (isSale: boolean) => {
    const venta = {
      sellerInfo: {
        name: 'MR tienda',
        address: 'Av. Belgrano 2846, San Miguel De Tucuman',
        cuil: '20-20284257-8',
        contactPerson: 'Juan Carlos Gonzalez',
        phone: '381-3159319',
      },
      customerInfo: clientData,
      items: items.map((item) => ({
        name: item.name,
        quantity: productDetails[item.id].quantity,
        unitPrice: productDetails[item.id].unitPrice,
        discount: productDetails[item.id].discount,
        total: productDetails[item.id].total,
      })),
      orderDate: new Date().toLocaleDateString(),
      orderNumber: '',
      totalPrice: calculatedTotalPrice,
      isSale,
    };

    const res = await createVenta(venta);
    const newOrderNumber = res.orderNumber;
    setOrderNumber(newOrderNumber);
    onComplete();
  };

  useEffect(() => {
    const fetchOrderNumber = async () => {
      const newOrderNumber = await getNextOrderNumber();
      setOrderNumber(newOrderNumber || '00001');
    };
    fetchOrderNumber();
  }, [getNextOrderNumber]);

  return (
    <div className={styles.container}>
      <div className={styles.totalPrice}>
        <p>
          Total: ${' '}
          {calculatedTotalPrice ? calculatedTotalPrice.toFixed(2) : '0.00'}
        </p>
      </div>
      <div>
        <PDFDownloadLink
          document={
            <PDFDocument
              customer={clientData}
              items={items}
              productDetails={productDetails}
              totalPrice={calculatedTotalPrice}
              orderNumber={orderNumber}
              presupuesto='Factura'
            />
          }
          fileName='Venta.pdf'
        >
          <button
            className={styles.buttonVenta}
            type='button'
            onClick={() => handleVenta(true)}
          >
            PROCEDER CON LA VENTA
          </button>
        </PDFDownloadLink>
      </div>
      <div className={styles.buttons}>
        <PDFDownloadLink
          document={
            <PDFDocument
              customer={clientData}
              items={items}
              productDetails={productDetails}
              totalPrice={calculatedTotalPrice}
              presupuesto='Presupuesto'
              orderNumber={orderNumber}
            />
          }
          fileName='presupuesto.pdf'
        >
          <button
            className={styles.buttonBudget}
            type='button'
            onClick={() => handleVenta(false)}
          >
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
