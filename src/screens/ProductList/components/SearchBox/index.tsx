import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GACategories, GATypes } from '~constants/gaTagTypes';
import { useProducts } from '~contexts/Products';
import useGATag from '~hooks/useGATag';

import styles from './styles.module.scss';

function ProductSearchPanel() {
  const { tagAction } = useGATag(true);
  const { performSearch, searchQuery, clearSearch, searchCriteria } =
    useProducts();

  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [criteria, setCriteria] = useState(searchCriteria);
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLocalQuery(value);

    if (value === '') {
      tagAction(GACategories.Event, GATypes.Click, 'Cleared search box');
      clearSearch();
    } else {
      performSearch(value, criteria);
    }
  };

  const handleCriteriaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setCriteria(value);

    let searchType = '';
    if (value === 0) {
      searchType = 'nombre producto';
    } else if (value === 1) {
      searchType = 'codigo barras';
    } else {
      searchType = 'ID';
    }

    tagAction(
      GACategories.Event,
      GATypes.Changed,
      `Search type: ${searchType}`
    );

    performSearch(localQuery, value);
  };

  const handleRedirect = () => {
    navigate('/add');
  };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <div>
          <input
            className={styles.inputText}
            type='text'
            placeholder='Buscar producto'
            value={localQuery}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor='searchCriteria-nombre'>
            <input
              id='searchCriteria-nombre'
              type='radio'
              name='searchCriteria'
              value={0}
              checked={criteria === 0}
              onChange={handleCriteriaChange}
            />
            Nombre
          </label>
          <label htmlFor='searchCriteria-codigo'>
            <input
              id='searchCriteria-codigo'
              type='radio'
              name='searchCriteria'
              value={1}
              checked={criteria === 1}
              onChange={handleCriteriaChange}
            />
            Código de barra
          </label>
          <label htmlFor='searchCriteria-id'>
            <input
              id='searchCriteria-id'
              type='radio'
              name='searchCriteria'
              value={2}
              checked={criteria === 2}
              onChange={handleCriteriaChange}
            />
            ID
          </label>
        </div>
      </div>
      <div>
        <button
          className={styles.redirectButton}
          type='button'
          onClick={handleRedirect}
        >
          + Agregar Producto
        </button>
      </div>
    </div>
  );
}

export default ProductSearchPanel;
