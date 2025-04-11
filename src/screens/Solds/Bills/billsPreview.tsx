import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { PDFDownloadLink } from '@react-pdf/renderer';

import styles from './styles.module.scss';

import logo from '../../../assets/LOGO MR.png';
import PDFDocumentBills from './pdfBills/pdfBills';

function BillsPreview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { venta } = location.state || {};

  const handleBack = () => {
    navigate('/sells');
  };

  if (!venta) {
    return <div>No data available</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.volver}>
        <button
          className={styles.backButton}
          type='button'
          onClick={handleBack}
          aria-label='Go back'
        >
          <ArrowBack />
        </button>
      </div>
      <div className={styles.boleta}>
        <div className={styles.borderBox}>
          <div className={styles.header}>
            <h2>{venta.isSale ? 'Remito de Venta' : 'Presupuesto'}</h2>
            <div className={styles.fechaOrden}>
              <span>Fecha: {venta.orderDate}</span>
              <span>N° de Orden: {venta.orderNumber}</span>
            </div>
          </div>

          <div className={styles.info}>
            <img className={styles.logo} src={logo} alt='logo' />
            <div className={styles.data}>
              <div className={styles.vendedor}>
                <p>MR tienda</p>
                <p>Dirección: Av. Belgrano 2846,</p>
                <p>San Miguel de Tucuman</p>
                <p>{venta.sellerInfo.contactPerson}</p>
                <p>CUIL: {venta.sellerInfo.cuil}</p>
                <p>Teléfono: {venta.sellerInfo.phone}</p>
              </div>
              <div className={styles.separador} />
              <div className={styles.cliente}>
                <p>Cliente: {venta.customerInfo?.name || ''}</p>
                <p>Dirección: {venta.customerInfo?.address || ''}</p>
                <p>CUIL:</p>
                <p>Celular: {venta.customerInfo?.phone || ''}</p>
                <p>Situación Fiscal:</p>
              </div>
            </div>
          </div>
          <div className={styles.lista}>
            <p>Detalles de la Orden:</p>
            <div className={styles.title}>
              <h4>Item</h4>
              <p>Cantidad</p>
              <p>P. Unitario</p>
              <p>Descuento</p>
              <p>SubTotal</p>
            </div>
            <div className={styles.content}>
              {venta.items.map((item) => (
                <div key={item.id} className={styles.items}>
                  <h4>{item.name}</h4>
                  <p>{item.quantity}</p>
                  <p>${item.unitPrice.toFixed(2)}</p>
                  <p>{item.discount}</p>
                  <p>${item.total.toFixed(2)}</p>
                </div>
              ))}{' '}
            </div>
            <div className={styles.total}>
              <div>
                <p>Total:${venta.totalPrice.toFixed(2)}</p>
              </div>
              <h4>Gracias por su compra</h4>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.imprimir}>
        <PDFDownloadLink
          document={<PDFDocumentBills venta={venta} />}
          fileName={`Venta_${venta.orderNumber}.pdf`}
        >
          <button className={styles.buttonPrint} type='button'>
            Re-Imprimir
          </button>
        </PDFDownloadLink>
      </div>
    </div>
  );
}

export default BillsPreview;
