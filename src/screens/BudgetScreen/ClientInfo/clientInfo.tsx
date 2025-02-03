import { useState } from 'react';

import styles from './styles.module.scss';

import ClientModal from '../ClientModal/ClientModal';

interface ClientData {
  name: string;
  phone: string;
  email: string;
  id: string;
  address: string;
  neighborhood: string;
  billingAddress: string;
  taxStatus: string;
  dniCuit: string;
}

function ClientInfo({
  setClientData,
}: {
  setClientData: (data: ClientData) => void;
}) {
  const initialClientData: ClientData = {
    name: '',
    phone: '',
    email: '',
    id: '',
    address: '',
    neighborhood: '',
    billingAddress: '',
    taxStatus: '',
    dniCuit: '',
  };

  const [clientData, setClientDataState] =
    useState<ClientData>(initialClientData);
  const [showModal, setShowModal] = useState(false);

  const resetClientData = () => {
    setClientDataState(initialClientData);
    setClientData({ ...initialClientData });
  };

  return (
    <div className={styles.container}>
      <div className={styles.client}>
        <p>CLIENTE: {clientData.name || ''}</p>
        <div className={styles.clientInfoButton}>
          <button
            className={styles.clientButton}
            type='button'
            onClick={() => setShowModal(true)}
          >
            Buscar Cliente
          </button>
        </div>
      </div>
      <div className={styles.information}>
        <p>Información</p>
        <span>Cliente: {clientData.name || ''}</span>
        <span>Celular: {clientData.phone || ''}</span>
        {/*        <span>Email: {clientData.email || ''}</span> */}
        <span>ID Cliente: {clientData.id || ''}</span>
      </div>
      <div className={styles.delivery}>
        <p>Envío</p>
        <span>Domicilio: {clientData.address || ''}</span>
        {/* <span>
          Barrio/localidad: {clientData.neighborhood || ''}
        </span> */}
      </div>
      <div className={styles.facturacion}>
        <p>Facturación</p>
        {/*     <span>Domicilio: {clientData.billingAddress || ''}</span> */}
        <span>Situación Fiscal: {clientData.taxStatus || ''}</span>
        <span>DNI/CUIT: {clientData.dniCuit || ''}</span>
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.buttonNuevoCliente}
          type='button'
          onClick={() => setShowModal(true)}
        >
          NUEVO CLIENTE
        </button>
        <button
          className={styles.buttonQuitar}
          type='button'
          onClick={resetClientData}
        >
          QUITAR
        </button>
      </div>

      {showModal && (
        <ClientModal
          clientData={clientData}
          setClientData={(data: ClientData) => {
            setClientDataState(data);
            setClientData(data);
          }}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default ClientInfo;
