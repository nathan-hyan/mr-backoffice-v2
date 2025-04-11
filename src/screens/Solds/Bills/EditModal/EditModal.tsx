/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';

import styles from './styles.module.scss';

interface Venta {
  customerInfo: {
    name: string;
    phone: string;
    email: string;
  };
  orderDate: string;
  totalPrice: number;
  status?: string;
  pago?: string;
}

interface EditModalProps {
  venta: Venta;
  onClose: () => void;
  onSave: (venta: Venta) => void;
}

function EditModal({ venta, onClose, onSave }: EditModalProps) {
  const [editedVenta, setEditedVenta] = useState({ ...venta });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'orderDate') {
      if (value) {
        const [year, month, day] = value.split('-');
        const formattedDate = `${day}/${month}/${year}`;
        setEditedVenta((prev) => ({ ...prev, [name]: formattedDate }));
      }
    } else {
      setEditedVenta((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    onSave(editedVenta);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Editar Venta</h2>
        <form className={styles.form}>
          <label>
            Nombre del Cliente:
            <input
              type='text'
              name='customerInfo.name'
              value={editedVenta.customerInfo.name}
              onChange={(e) =>
                setEditedVenta((prev) => ({
                  ...prev,
                  customerInfo: { ...prev.customerInfo, name: e.target.value },
                }))
              }
            />
          </label>
          <label>
            Teléfono:
            <input
              type='text'
              name='customerInfo.phone'
              value={editedVenta.customerInfo.phone}
              onChange={(e) =>
                setEditedVenta((prev) => ({
                  ...prev,
                  customerInfo: { ...prev.customerInfo, phone: e.target.value },
                }))
              }
            />
          </label>
          <label>
            Email:
            <input
              type='email'
              name='customerInfo.email'
              value={editedVenta.customerInfo.email}
              onChange={(e) =>
                setEditedVenta((prev) => ({
                  ...prev,
                  customerInfo: { ...prev.customerInfo, email: e.target.value },
                }))
              }
            />
          </label>
          <label>
            Fecha de Orden:
            <input
              type='date'
              name='orderDate'
              value={editedVenta.orderDate}
              onChange={handleChange}
            />
          </label>

          <label>
            Status:
            <select
              name='status'
              value={editedVenta.status || ''}
              onChange={handleChange}
            >
              <option value=''>Seleccionar</option>
              <option value='Pendiente'>Pendiente</option>
              <option value='Entregado'>Entregado</option>
              <option value='Cancelado'>Cancelado</option>
              <option value='-'>-</option>
            </select>
          </label>
          <label>
            Pago:
            <select
              name='pago'
              value={editedVenta.pago || ''}
              onChange={handleChange}
            >
              <option value=''>Seleccionar</option>
              <option value='Pagado'>Pagado</option>
              <option value='Saldo'>Saldo</option>
              <option value='-'>-</option>
            </select>
          </label>
        </form>
        <div className={styles.actions}>
          <button className={styles.save} type='button' onClick={handleSave}>
            Guardar
          </button>
          <button className={styles.cancel} type='button' onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
