import { useContext, useEffect, useState } from 'react';
import { Product } from 'types/data';

import styles from './styles.module.scss';

import { VentasContext } from '../../../contexts/Sells';
import ConfirmationModal from '../ConfirmationModal/confirmationModal';

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
  const [showModal, setShowModal] = useState(false);
  const [isSale, setIsSale] = useState(false);

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

  interface VentaData {
    saldo: number;
    entregado: boolean;
    pago: boolean;
  }

  const handleVenta = async (data: VentaData) => {
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
      payments: data,
      saldo: data.saldo,
      status: data.entregado ? 'Entregado' : 'Pendiente',
      pago: data.pago ? 'Saldo' : 'Pagado',
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
        <button
          className={styles.buttonVenta}
          type='button'
          onClick={() => {
            setIsSale(true);
            setShowModal(true);
          }}
        >
          PROCEDER CON LA VENTA
        </button>
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.buttonBudget}
          type='button'
          onClick={() => {
            setIsSale(false);
            setShowModal(true);
          }}
        >
          PRESUPUESTO
        </button>
        <button
          className={styles.buttonCancel}
          type='button'
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>

      {showModal && (
        <ConfirmationModal
          total={calculatedTotalPrice}
          onConfirm={(data) => {
            handleVenta(data);
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
          customer={clientData}
          items={items}
          productDetails={productDetails}
          totalPrice={calculatedTotalPrice}
          orderNumber={orderNumber}
          isSale={isSale}
          onCancel={onCancel}
        />
      )}
    </div>
  );
}

export default SellAndBudget;
