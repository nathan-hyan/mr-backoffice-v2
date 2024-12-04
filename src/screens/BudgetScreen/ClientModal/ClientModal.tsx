import styles from './styles.module.scss';

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

interface ClientModalProps {
  clientData: ClientData;
  setClientData: React.Dispatch<React.SetStateAction<ClientData>>;
  closeModal: () => void;
}
function ClientModal({
  clientData,
  setClientData,
  closeModal,
}: ClientModalProps) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    closeModal();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Información del Cliente</h2>
        <label>Nombre:</label>
        <input
          className={styles.input}
          type='text'
          name='name'
          value={clientData.name}
          onChange={handleInputChange}
          required
        />
        <label>Teléfono:</label>
        <input
          className={styles.input}
          type='text'
          name='phone'
          value={clientData.phone}
          onChange={handleInputChange}
        />
        <label>Email:</label>
        <input
          className={styles.input}
          type='email'
          name='email'
          value={clientData.email}
          onChange={handleInputChange}
        />
        <label>ID Cliente:</label>
        <input
          className={styles.input}
          type='text'
          name='id'
          value={clientData.id}
          onChange={handleInputChange}
        />
        <label>Domicilio:</label>
        <input
          required
          className={styles.input}
          type='text'
          name='address'
          value={clientData.address}
          onChange={handleInputChange}
        />
        <label>Barrio/localidad:</label>
        <input
          className={styles.input}
          type='text'
          name='neighborhood'
          value={clientData.neighborhood}
          onChange={handleInputChange}
        />
        <label>Dirección de facturación:</label>
        <input
          required
          className={styles.input}
          type='text'
          name='billingAddress'
          value={clientData.billingAddress}
          onChange={handleInputChange}
        />
        <label>Situación Fiscal:</label>
        <input
          className={styles.input}
          type='text'
          name='taxStatus'
          value={clientData.taxStatus}
          onChange={handleInputChange}
        />
        <label>DNI/CUIT:</label>
        <input
          className={styles.input}
          type='text'
          name='dniCuit'
          value={clientData.dniCuit}
          onChange={handleInputChange}
        />
        <div className={styles.modalButtons}>
          <button type='button' onClick={handleSubmit}>
            Guardar
          </button>
          <button type='button' onClick={closeModal}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClientModal;
