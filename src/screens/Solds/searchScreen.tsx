import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useVentas } from '~contexts/Sells';

import styles from './styles.module.scss';

function SearchScreen() {
  const { searchVentas } = useVentas();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCriteria, setSearchCriteria] = useState<'name' | 'fecha'>(
    'name'
  );
  const [searchResults, setSearchResults] = useState<
    Array<{
      orderNumber: string;
      customerInfo: { name: string; address: string };
      orderDate: string;
      totalPrice: number;
    }>
  >([]);
  const [shouldSearch, setShouldSearch] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (shouldSearch && searchQuery.trim() !== '') {
      const criteria =
        searchCriteria === 'name'
          ? { customerName: searchQuery }
          : { creationDate: searchQuery };
      searchVentas(criteria).then((results) => {
        setSearchResults(results || []);
        setShouldSearch(false);
      });
    } else {
      setShouldSearch(false);
    }
  }, [shouldSearch, searchQuery, searchCriteria, searchVentas]);

  const handleSearch = () => {
    setShouldSearch(true);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchCriteria('name');
    setSearchResults([]);
  };
  const handleViewBill = (venta) => {
    navigate('/bills', { state: { venta } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.searchbar}>
          <div>
            <input
              className={styles.inputSearch}
              type='text'
              placeholder='Search'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={styles.criteria}>
            <label htmlFor='criteria-name'>
              <input
                id='criteria-name'
                type='radio'
                name='criteria'
                value='name'
                checked={searchCriteria === 'name'}
                onChange={() => setSearchCriteria('name')}
              />
              Nombre
            </label>
            <label htmlFor='criteria-fecha'>
              <input
                id='criteria-fecha'
                type='radio'
                name='criteria'
                value='fecha'
                checked={searchCriteria === 'fecha'}
                onChange={() => setSearchCriteria('fecha')}
              />
              Fecha
            </label>
          </div>
          <div className={styles.buttons}>
            <button
              type='button'
              className={styles.buttonSearch}
              onClick={handleSearch}
            >
              Buscar
            </button>
            <button
              type='button'
              className={styles.buttonClear}
              onClick={clearSearch}
            >
              Clear Search
            </button>
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.title}>
            <h4>Nombre</h4>
            <p>Fecha</p>
            <p>N° de orden</p>
            <p>Direccion</p>
            <p>Total</p>
          </div>
          <div className={styles.map}>
            {searchResults.map((venta) => (
              <div
                key={venta.orderNumber}
                onClick={() => handleViewBill(venta)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleViewBill(venta);
                }}
                role='button'
                tabIndex={0}
                className={styles.resultItem}
              >
                <h4>{venta.customerInfo.name}</h4>
                <p>{venta.orderDate}</p>
                <p>{venta.orderNumber}</p>
                <p>{venta.customerInfo.address}</p>
                <p>{venta.totalPrice}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchScreen;
