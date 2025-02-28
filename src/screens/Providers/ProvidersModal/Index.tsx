/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Providers } from 'types/data';

import styles from './styles.module.scss';

interface ProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (provider: Providers) => void;
  providerToEdit?: Providers | null;
}

function ProviderModal({
  isOpen,
  onClose,
  onSave,
  providerToEdit = null,
}: ProviderModalProps) {
  const [provider, setProvider] = useState<Providers>({
    id: '',
    name: '',
    address: '',
    phone1: '',
    phone2: '',
    phone3: '',
    phone4: '',
    phone5: '',
    email: '',
    orderDate: '',
    cbu: '',
    nextexpiration: '',
    restDays: '',
    balance: '',
    buys: 0,
  });

  const [step, setStep] = useState(1);

  useEffect(() => {
    if (providerToEdit) {
      setProvider(providerToEdit);
    }
  }, [providerToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProvider((prevProvider) => ({
      ...prevProvider,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSave = () => {
    onSave(provider);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{providerToEdit ? 'Editar Proveedor' : 'Agregar Proveedor'}</h2>
        {step === 1 && (
          <>
            <div className={styles.formGroup}>
              <label>Nombre</label>
              <input
                type='text'
                name='name'
                value={provider.name}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Domicilio</label>
              <input
                type='text'
                name='address'
                value={provider.address}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type='email'
                name='email'
                value={provider.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>CBU</label>
              <input
                type='text'
                name='cbu'
                value={provider.cbu}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Fecha de Vencimiento</label>
              <input
                type='date'
                name='nextexpiration'
                value={provider.nextexpiration}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Saldo</label>
              <input
                type='text'
                name='balance'
                value={provider.balance}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Compras</label>
              <input
                type='number'
                name='buys'
                value={provider.buys}
                onChange={handleChange}
              />
            </div>
            <div className={styles.modalActions}>
              <button type='button' onClick={onClose} className={styles.cancel}>
                Cancelar
              </button>
              <button
                type='button'
                onClick={handleNext}
                className={styles.next}
              >
                Siguiente
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className={styles.formGroup}>
              <label>Celular 1</label>
              <input
                type='text'
                name='phone1'
                value={provider.phone1}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Celular 2</label>
              <input
                type='text'
                name='phone2'
                value={provider.phone2}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Celular 3</label>
              <input
                type='text'
                name='phone3'
                value={provider.phone3}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Celular 4</label>
              <input
                type='text'
                name='phone4'
                value={provider.phone4}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Celular 5</label>
              <input
                type='text'
                name='phone5'
                value={provider.phone5}
                onChange={handleChange}
              />
            </div>

            <div className={styles.modalActions}>
              <button
                type='button'
                onClick={handlePrevious}
                className={styles.next}
              >
                Anterior
              </button>
              <button type='button' onClick={onClose} className={styles.cancel}>
                Cancelar
              </button>
              <button
                type='button'
                onClick={handleSave}
                className={styles.save}
              >
                Guardar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProviderModal;
