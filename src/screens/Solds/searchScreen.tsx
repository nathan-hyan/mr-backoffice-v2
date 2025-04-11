/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import edit from '~assets/editar-texto.svg';
import pic from '~assets/Group 9.png';
import mas from '~assets/mas2.svg';
import ojo from '~assets/ojo.svg';
import { useVentas } from '~contexts/Sells';

import styles from './styles.module.scss';

import EditModal from './Bills/EditModal/EditModal';

function SearchScreen() {
  const { searchVentas, fetchAllVentas, deleteVenta, updateVenta } =
    useVentas();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCriteria, setSearchCriteria] = useState<
    'name' | 'fecha' | 'orderNumber'
  >('name');
  const [searchResults, setSearchResults] = useState<
    Array<{
      isSale: boolean;
      orderNumber: string;
      customerInfo: { name: string; phone: string; email: string };
      orderDate: string;
      totalPrice: number;
      id: string;
      status: string;
      pago: string;
    }>
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVenta, setSelectedVenta] = useState(null);

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
        let criteria;
        if (searchCriteria === 'name') {
          criteria = { customerName: searchQuery };
        } else if (searchCriteria === 'fecha') {
          criteria = { creationDate: searchQuery };
        } else {
          criteria = { orderNumber: searchQuery };
        }

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

  const deletesold = async (id?: string, orderNumber?: string) => {
    try {
      if (id) {
        await deleteVenta(id);
      } else if (orderNumber) {
        await deleteVenta(undefined, orderNumber);
      } else {
        console.error(
          'No se proporcionó ni ID ni orderNumber para eliminar la venta.'
        );

        await deleteVenta(orderNumber);
      }

      const updatedVentas = await fetchAllVentas();
      setSearchResults(updatedVentas);
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
    }
  };

  return (
    <div className={styles.container}>
      {isModalOpen && (
        <EditModal
          venta={selectedVenta}
          onClose={() => setIsModalOpen(false)}
          onSave={(updatedVenta) => {
            setSearchResults((prevResults) =>
              prevResults.map((venta) =>
                venta.orderNumber === updatedVenta.orderNumber
                  ? { ...venta, ...updatedVenta }
                  : venta
              )
            );
            if (updatedVenta.id) {
              updateVenta(updatedVenta.id, updatedVenta);
            } else {
              updateVenta(undefined, updatedVenta, updatedVenta.orderNumber);
            }
          }}
        />
      )}
      <div className={styles.innerContainer}>
        <div className={styles.searchbar}>
          <div>
            <input
              className={styles.inputSearch}
              type='text'
              placeholder='Buscar Orden'
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
            <label htmlFor='criteria-orderNumber'>
              <input
                id='criteria-orderNumber'
                type='radio'
                name='criteria'
                value='orderNumber'
                checked={searchCriteria === 'orderNumber'}
                onChange={() => setSearchCriteria('orderNumber')}
              />
              Número de Orden
            </label>
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.title}>
            <p>ORDEN</p>
            <p>FECHA</p>
            <h4>Cliente</h4>
            <p>TIPO</p>
            <p>STATUS</p>
            <p>PAGO</p>
            <p>CELULAR</p>
            <p>ACTIONS</p>
          </div>
          <div className={styles.map}>
            {searchResults
              .sort(
                (a, b) =>
                  parseInt(b.orderNumber, 10) - parseInt(a.orderNumber, 10)
              )
              .map((venta) => (
                <div className={styles.resultItem} key={venta.orderNumber}>
                  <p>{venta.orderNumber || ''}</p>
                  <p>{venta.orderDate || ''}</p>
                  <div className={styles.customerInfo}>
                    <img className={styles.pic} src={pic} alt='foto' />
                    <span className={styles.customer}>
                      {venta.customerInfo?.name || ''}
                      <span className={styles.email}>
                        {venta.customerInfo?.email || ''}
                      </span>
                    </span>
                  </div>
                  <p
                    className={
                      venta.isSale ? styles.isSaleTrue : styles.isSaleFalse
                    }
                  >
                    {venta.isSale ? 'VENTA' : 'PRESUPUESTO'}
                  </p>
                  <p
                    className={
                      venta.status === 'Entregado'
                        ? styles.statusGreen
                        : venta.status === 'Pendiente'
                          ? styles.statusRed
                          : styles.statusBlack
                    }
                  >
                    {venta.status || ''}
                  </p>
                  <p
                    className={
                      venta.pago === 'Pagado'
                        ? styles.statusGreen
                        : venta.pago === 'Saldo'
                          ? styles.statusRed
                          : styles.statusBlack
                    }
                  >
                    {venta.pago || ''}
                  </p>
                  <p>{venta.customerInfo?.phone || ''}</p>
                  <section>
                    <button
                      className={styles.actions}
                      type='button'
                      onClick={() => handleViewBill(venta)}
                    >
                      <img src={ojo} alt='ver' />
                    </button>
                    <button
                      type='button'
                      className={styles.actions}
                      onClick={() => {
                        setSelectedVenta(venta);
                        setIsModalOpen(true);
                      }}
                    >
                      <img src={edit} alt='editar' />
                    </button>
                    <button
                      type='button'
                      className={styles.actions}
                      onClick={() => {
                        if (
                          window.confirm(
                            '¿Estás seguro de que deseas eliminar esta venta?'
                          )
                        ) {
                          deletesold(venta.id, venta.orderNumber);
                        }
                      }}
                    >
                      <img src={mas} alt='eliminar' />
                    </button>
                  </section>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchScreen;
