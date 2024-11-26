import styles from './styles.module.scss';

function SellAndBudget() {
  return (
    <div className={styles.container}>
      <div className={styles.totalPrice}>
        <p>Total: $</p>
      </div>
      <div>
        <button className={styles.buttonVenta} type='button'>
          Proceder con Venta
        </button>
      </div>
      <div className={styles.buttons}>
        <button className={styles.buttonBudget} type='button'>
          Presupuesto
        </button>{' '}
        <button className={styles.buttonCancel} type='button'>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default SellAndBudget;
