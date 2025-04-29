/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';

import styles from './styles.module.scss';

import PDFDocument from '../SellAndBudget/PdfGenerator/PdfGenerator';

function ConfirmationModal({
  total,
  onConfirm,
  onClose,
  onCancel,
  customer,
  items,
  productDetails,

  totalPrice,
  orderNumber,
  isSale,
}: {
  total: number;
  onConfirm: (data: any) => void;
  onClose: () => void;
  onCancel: () => void;
  customer: any;
  items: any[];
  productDetails: any;
  totalPrice: number;
  orderNumber: string;
  isSale: boolean;
}) {
  const [payments, setPayments] = useState({
    efectivo: 0,
    qr: 0,
    transferencia: 0,
    posnetDebito: 0,
    posnetCredito: 0,
  });
  const [entregado, setEntregado] = useState(false);

  const [pago, setPago] = useState(false);

  const totalAbonado =
    payments.efectivo +
    payments.qr +
    payments.transferencia +
    payments.posnetDebito +
    payments.posnetCredito;

  const saldo = total - totalAbonado;

  useEffect(() => {
    setPago(saldo > 0);
  }, [saldo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayments((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleConfirm = (print: boolean) => {
    const data = {
      payments: { ...payments },
      saldo,
      entregado,
      pago,
    };
    onConfirm(data);

    if (!print) {
      onClose();
      onCancel();
    }
  };
  const handlePrint = () => {
    setTimeout(() => {
      const data = {
        payments: { ...payments },
        saldo,
        entregado,
        pago,
      };
      onConfirm(data);
      onClose();
      onCancel();
    }, 1000);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>TOTAL: {total}</h2>
        <div className={styles.paymentInputs}>
          <label>
            Abonado EFECTIVO:
            <input
              type='number'
              name='efectivo'
              value={payments.efectivo}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Abonado QR:
            <input
              type='number'
              name='qr'
              value={payments.qr}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Abonado TRANSFERENCIA:
            <input
              type='number'
              name='transferencia'
              value={payments.transferencia}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Abonado POSNET DEBITO:
            <input
              type='number'
              name='posnetDebito'
              value={payments.posnetDebito}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Abonado POSNET CREDITO:
            <input
              type='number'
              name='posnetCredito'
              value={payments.posnetCredito}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <hr />
        <div className={styles.saldo}>
          <label>
            SALDO: <span>${saldo}</span>{' '}
          </label>
        </div>
        <div className={styles.checkboxes}>
          <label>
            ENTREGADO
            <input
              type='checkbox'
              checked={entregado}
              onChange={(e) => setEntregado(e.target.checked)}
            />
          </label>
          <label>
            PENDIENTE
            <input
              type='checkbox'
              checked={!entregado}
              onChange={(e) => setEntregado(!e.target.checked)}
            />
          </label>
        </div>
        <div className={styles.buttons}>
          <button
            type='button'
            className={styles.confirmButton}
            onClick={() => handleConfirm(false)}
          >
            CONFIRMAR Y SALIR
          </button>
          <PDFDownloadLink
            document={
              <PDFDocument
                customer={customer}
                items={items}
                productDetails={productDetails}
                totalPrice={totalPrice}
                orderNumber={orderNumber}
                presupuesto={isSale ? 'Remito de Venta' : 'Presupuesto'}
              />
            }
            fileName={isSale ? 'Venta.pdf' : 'Presupuesto.pdf'}
          >
            <button
              onClick={handlePrint}
              type='button'
              className={styles.printButton}
            >
              CONFIRMAR E IMPRIMIR
            </button>
          </PDFDownloadLink>
        </div>
        <button type='button' className={styles.closeButton} onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
