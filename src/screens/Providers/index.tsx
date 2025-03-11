import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Providers as ProviderType } from 'types/data';

import { useProviders } from '~contexts/Providers';

import styles from './styles.module.scss';

import edit from '../../assets/editar-texto.svg';
import mas from '../../assets/mas2.svg';
import ojo from '../../assets/ojo.svg';
import ProviderModal from './ProvidersModal/Index';

function Providers() {
  const {
    createProvider,
    updateProvider,
    deleteProvider,
    searchProviders,
    fetchAllProviders,
    calculateDaysUntilExpiration,
  } = useProviders();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCriteria, setSearchCriteria] = useState<'name' | 'fecha'>(
    'name'
  );
  const [searchResults, setSearchResults] = useState<ProviderType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [providerToEdit, setProviderToEdit] = useState<ProviderType | null>(
    null
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await fetchAllProviders();
      setSearchResults(providers);
    };

    fetchProviders();
  }, [fetchAllProviders]);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim() !== '') {
        const criteria =
          searchCriteria === 'name'
            ? { name: searchQuery }
            : { creationDate: searchQuery };
        const results = await searchProviders(criteria);
        setSearchResults(results || []);
      } else {
        const providers = await fetchAllProviders();
        setSearchResults(providers);
      }
    };

    handleSearch();
  }, [searchQuery, searchCriteria, searchProviders, fetchAllProviders]);

  const clearSearch = async () => {
    setSearchQuery('');
    setSearchCriteria('name');
    const providers = await fetchAllProviders();
    setSearchResults(providers);
  };

  const handleSaveProvider = async (provider: ProviderType) => {
    if (providerToEdit) {
      await updateProvider(provider.id, provider);
    } else {
      await createProvider(provider);
    }
    clearSearch();
    setProviderToEdit(null);
  };

  const handleEditProvider = (provider: ProviderType) => {
    setProviderToEdit(provider);
    setIsModalOpen(true);
  };

  const handleViewProvider = (provider: ProviderType) => {
    navigate('/provider-details', { state: { provider } });
  };

  const handleDeleteProvider = async (id: string) => {
    await deleteProvider(id);
    clearSearch();
  };

  const providerID = (id) => id.slice(0, 6);

  const getBalanceStatus = (balance: number) => {
    if (balance > 0) {
      return <p className={styles.inFavor}>A FAVOR</p>;
    }
    if (balance < 0) {
      return <p className={styles.debtor}>DEUDOR</p>;
    }
    return <p className={styles.even}>-</p>;
  };

  const getExpirationClass = (days: number) => {
    if (days >= 6) {
      return styles.expirationGreen;
    }
    if (days >= 1 && days <= 5) {
      return styles.expirationYellow;
    }
    return styles.expirationRed;
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.searchbar}>
          <div className={styles.inputs}>
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
            </div>
          </div>
          <div className={styles.buttons}>
            <button
              type='button'
              className={styles.buttonAdd}
              onClick={() => {
                setProviderToEdit(null);
                setIsModalOpen(true);
              }}
            >
              + Agregar Proveedor
            </button>
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.title}>
            <p>ID</p>
            <h4>Proveedor</h4>
            <p>Domicilio</p>
            <p>Celular</p>
            <p>Compras</p>
            <p>Saldo</p>
            <p>Proximo Venci.</p>
            <p className={styles.actions}>Action</p>
          </div>
          <div className={styles.map}>
            {searchResults.map((provider) => {
              const daysUntilExpiration = calculateDaysUntilExpiration(
                provider.orderDate,
                provider.nextexpiration
              );
              return (
                <div className={styles.listItems} key={provider.id}>
                  <div className={styles.resultItem}>
                    <p>{providerID(provider.id)}</p>

                    <h4>{provider.name}</h4>
                    <p>{provider.address}</p>
                    <p>{provider.phone1}</p>
                    <p>{provider.buys}</p>
                    {getBalanceStatus(Number(provider.balance))}
                    <p>
                      <span className={getExpirationClass(daysUntilExpiration)}>
                        {Number.isNaN(daysUntilExpiration) ||
                        daysUntilExpiration === undefined ||
                        daysUntilExpiration === null
                          ? '-'
                          : `${daysUntilExpiration} días`}
                      </span>
                    </p>
                    <div className={styles.actions}>
                      <button
                        className={styles.actionButton}
                        type='button'
                        onClick={() => handleViewProvider(provider)}
                      >
                        <img
                          className={styles.actionButton}
                          src={ojo}
                          alt='ver'
                        />
                      </button>
                      <button
                        className={styles.actionButton}
                        type='button'
                        onClick={() => handleEditProvider(provider)}
                      >
                        <img
                          className={styles.actionButton}
                          src={edit}
                          alt='editar'
                        />
                      </button>
                      <div className={styles.dropdown}>
                        <button
                          className={styles.actionButton}
                          type='button'
                          onClick={() => {
                            const dropdownContent = document.getElementById(
                              `dropdown-${provider.id}`
                            );
                            if (dropdownContent) {
                              dropdownContent.style.display =
                                dropdownContent.style.display === 'block'
                                  ? 'none'
                                  : 'block';
                            }
                          }}
                        >
                          <img
                            className={styles.actionButton}
                            src={mas}
                            alt='mas'
                          />
                        </button>
                        <div
                          id={`dropdown-${provider.id}`}
                          className={styles.dropdownContent}
                        >
                          <button
                            type='button'
                            className={styles.dropdownItem}
                            onClick={() => handleDeleteProvider(provider.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ProviderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProvider}
        providerToEdit={providerToEdit}
      />
    </div>
  );
}

export default Providers;
