import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useVentas } from '~contexts/Sells';

import styles from './styles.module.scss';

function SearchScreen() {
  const { searchVentas, fetchAllVentas } = useVentas();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCriteria, setSearchCriteria] = useState<'name' | 'fecha'>(
    'name'
  );
  const [searchResults, setSearchResults] = useState<
    Array<{
      isSale: boolean;
      orderNumber: string;
      customerInfo: { name: string; address: string };
      orderDate: string;
      totalPrice: number;
    }>
  >([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVentas = async () => {
      const ventas = await fetchAllVentas();
      setSearchResults(ventas);
    };

    fetchVentas();
  }, [fetchAllVentas]);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim() !== '') {
        const criteria =
          searchCriteria === 'name'
            ? { customerName: searchQuery }
            : { creationDate: searchQuery };
        const results = await searchVentas(criteria);
        setSearchResults(results || []);
      } else {
        const ventas = await fetchAllVentas();
        setSearchResults(ventas);
      }
    };

    handleSearch();
  }, [searchQuery, searchCriteria, searchVentas, fetchAllVentas]);

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
        </div>
        <div className={styles.list}>
          <div className={styles.title}>
            <h4>Nombre</h4>
            <p>Tipo</p>
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
                <h4>{venta.customerInfo?.name || ''}</h4>
                <p>{venta.isSale ? 'Venta' : 'Presupuesto'}</p>
                <p>{venta.orderDate || ''}</p>
                <p>{venta.orderNumber || ''}</p>
                <p>{venta.customerInfo?.address || ''}</p>
                <p>
                  $
                  {venta.totalPrice !== undefined
                    ? venta.totalPrice.toFixed(2)
                    : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchScreen;
