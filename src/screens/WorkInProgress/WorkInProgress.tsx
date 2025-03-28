import { useNavigate } from 'react-router-dom';

import tecnico from '~assets/tecnico.png';

import styles from './styles.module.scss';

function WorkInProgress() {
  const navigate = useNavigate();
  const handleHome = () => navigate('/');
  return (
    <div className={styles.customcontainer}>
      <div>
        <h4>Estamos trabajando en esta seccion,pronto estara lista</h4>
      </div>
      <div>
        <img className={styles.tecImg} src={tecnico} alt='tecnico' />
      </div>
      <div>
        <button
          className={styles.homebutton}
          type='button'
          onClick={handleHome}
        >
          {' '}
          HOME PAGE
        </button>
      </div>
    </div>
  );
}

export default WorkInProgress;
