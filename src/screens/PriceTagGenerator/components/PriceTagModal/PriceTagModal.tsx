/* eslint-disable jsx-a11y/label-has-associated-control */
import model1 from '~assets/model1.png';
import model2 from '~assets/model2.png';
import model3 from '~assets/model3.png';

import styles from './styles.module.scss';

interface Props {
  visible: boolean;
  onClose: () => void;
  selectedModel: string;
  onSelect: (modelId: string) => void;
}

function PriceTagModal({ visible, onClose, selectedModel, onSelect }: Props) {
  if (!visible) return null;

  return (
    <div className={styles.container}>
      <h3>Seleccionar modelo de etiqueta</h3>

      <div className={styles.models}>
        <div className={styles.last}>
          <img className={styles.img} src={model1} alt='Codigo de barras' />
          <label>
            <input
              type='checkbox'
              checked={selectedModel === 'Codigo de barras'}
              onChange={() => onSelect('Codigo de barras')}
            />
            Codigo de barras
          </label>
        </div>

        <div className={styles.last}>
          <img className={styles.img} src={model2} alt='Precio unitario' />
          <label>
            <input
              type='checkbox'
              checked={selectedModel === 'Precio unitario'}
              onChange={() => onSelect('Precio unitario')}
            />
            Precio unitario
          </label>
        </div>

        <div className={styles.last}>
          <img className={styles.img} src={model3} alt='Por Mayor' />
          <label>
            <input
              type='checkbox'
              checked={selectedModel === 'Por Mayor'}
              onChange={() => onSelect('Por Mayor')}
            />
            Por Mayor
          </label>
        </div>
      </div>

      <button className={styles.closeButton} type='button' onClick={onClose}>
        Cerrar
      </button>
    </div>
  );
}

export default PriceTagModal;
