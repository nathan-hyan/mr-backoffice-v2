import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Providers } from 'types/data';

import { useProviders } from '~contexts/Providers';

import styles from './styles.module.scss';

import defaultPic from '../../../assets/defaultPic.png';
import ProviderModal from '../ProvidersModal/Index';

function ProvidersDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialProvider = location.state?.provider as Providers;

  const { updateProvider } = useProviders();

  const [provider, setProvider] = useState<Providers>(initialProvider);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [providerToEdit, setProviderToEdit] = useState<Providers | null>(null);

  const handleBack = () => {
    navigate('/providers');
  };

  const handleEdit = () => {
    setProviderToEdit(provider);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveProvider = async (updatedProvider: Providers) => {
    await updateProvider(updatedProvider.id, updatedProvider);
    setProvider(updatedProvider);
    setIsEditModalOpen(false);
  };

  const providerID = (id: string) => id.slice(0, 6);

  const getBalanceStatus = (balance: number) => {
    if (balance > 0) {
      return <p className={styles.inFavor}>${balance}</p>;
    }
    if (balance < 0) {
      return <p className={styles.debtor}>${balance}</p>;
    }
    return <p className={styles.even}>${balance}</p>;
  };

  const kindOfBalance = (balance: number) => {
    if (balance > 0) {
      return <p>Saldo a Favor</p>;
    }
    if (balance < 0) {
      return <p>Saldo Deudor</p>;
    }
    return <p>Sin saldo</p>;
  };

  return (
    <>
      <button
        type='button'
        className={styles.back}
        onClick={handleBack}
        aria-label='Volver'
      >
        <ArrowBackIosIcon />
      </button>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>{`ID Proveedor: ${providerID(provider.id)}`}</h2>
          <p>Asociacion: {provider?.orderDate}</p>
        </div>
        <div className={styles.content}>
          <div className={styles.side}>
            <div className={styles.data}>
              <div>
                <img
                  className={styles.pic}
                  src={defaultPic}
                  alt='Foto de Perfil'
                />
                <h4>{provider?.name}</h4>
                <p>{`Proveedor: ${providerID(provider.id)}`}</p>
              </div>
              <div className={styles.pedidos}>
                <p>{provider?.buys} Pedidos</p>
              </div>
              <div className={styles.contact}>
                <h4>Informacion</h4>
                <div className={styles.line} />
                <div className={styles.contactInfo}>
                  <div className={styles.contactInfo1}>
                    <p>Email: {provider?.email}</p>
                    <p>CBU: {provider?.cbu}</p>
                    <p>Compras: {provider?.buys}</p>
                    <p>Celular 1: {provider?.phone1}</p>
                  </div>
                  <div className={styles.contactInfo1}>
                    <p>Celular 2: {provider?.phone2}</p>
                    <p>Celular 3: {provider?.phone3}</p>
                    <p>Celular 4: {provider?.phone4}</p>
                    <p>Celular 5: {provider?.phone5}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.saldo}>
              <h4>Saldo De Cuenta</h4>
              <div className={styles.saldoInfo}>
                {getBalanceStatus(Number(provider?.balance ?? 0))}
                <p>{kindOfBalance(Number(provider?.balance))}</p>
              </div>
            </div>
            <div className={styles.observations}>
              <h4>Observaciones</h4>
              <p>pronto a implemetar</p>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.buttons}>
              <div className={styles.itemButtons}>
                <button className={styles.infoButtons} type='button'>
                  Pedidos
                </button>
                <button className={styles.infoButtons} type='button'>
                  Domicilio
                </button>
                <button className={styles.infoButtons} type='button'>
                  Novedades
                </button>
                <button className={styles.infoButtons} type='button'>
                  Analityc
                </button>
              </div>
              <div>
                <button
                  className={styles.editar}
                  type='button'
                  onClick={handleEdit}
                >
                  Editar Perfil
                </button>
              </div>
            </div>
            <div className={styles.porvInfo}>
              <div className={styles.searchbar}>
                <div>
                  <h3>Pedidos</h3>
                </div>
                <div>
                  <input
                    className={styles.inputSearch}
                    type='text'
                    placeholder='Buscar'
                  />
                </div>
              </div>
              <div>Contenido a implementar</div>
            </div>
          </div>
        </div>
      </div>
      <ProviderModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleSaveProvider}
        providerToEdit={providerToEdit}
      />
    </>
  );
}

export default ProvidersDetails;
