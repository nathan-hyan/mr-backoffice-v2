import styles from './styles.module.scss';

function ClientInfo() {
  return (
    <div className={styles.container}>
      <div className={styles.client}>
        <p>CLIENTE:</p> <button type='button'>Buscar Cliente</button>
      </div>
      <div className={styles.information}>
        <p>Informacion</p>
        <span>Cliente:</span>
        <span>Celular:</span>
        <span>Email:</span>
        <span>ID Cliente:</span>
      </div>
      <div className={styles.delivery}>
        <p>Envio</p>
        <span>Domicilio:</span>
        <span>Barrio/localidad:</span>
      </div>
      <div className={styles.facturacion}>
        <p>Facturacion</p>
        <span>Domicilio:</span> <span>Situacion Fiscal:</span>
        <span>DNI/CUIT:</span>
      </div>
      <div className={styles.buttons}>
        <button className={styles.buttonCliente} type='button'>
          Nuevo Cliente
        </button>{' '}
        <button className={styles.buttonQuitar} type='button'>
          Quitar
        </button>
      </div>
    </div>
  );
}

export default ClientInfo;
