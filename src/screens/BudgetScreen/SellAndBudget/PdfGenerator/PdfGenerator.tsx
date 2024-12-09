/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';

import logo from '../../../../assets/LOGO MR.png';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  borderBox: {
    borderWidth: 1,
    borderColor: '#000',
    flexGrow: 1,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    position: 'relative',
  },
  sellerInfo: {
    fontSize: 12,
    width: '48%',
    paddingRight: 10,
  },
  clientInfo: {
    fontSize: 12,
    width: '48%',
    paddingLeft: 0,
  },
  divider: {
    position: 'absolute',
    left: '60%',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#000',
    transform: 'translateX(-50%)',
  },
  leftSide: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  date: {
    margin: '-30 0 0 70 ',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f3f3f3',
    padding: 5,
    fontSize: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 5,
    fontSize: 12,
  },
  itemName: {
    width: '35%',
  },
  itemQuantity: {
    width: '15%',
    textAlign: 'center',
  },
  itemPrice: {
    width: '15%',
    textAlign: 'right',
  },
  itemDiscount: {
    width: '15%',
    textAlign: 'right',
  },
  itemTotal: {
    width: '20%',
    textAlign: 'right',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  totalText: {
    width: '50%',
    textAlign: 'right',
    fontSize: 12,
  },
  footer: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 12,
  },
});

function PDFDocument({ customer, items, productDetails, totalPrice }) {
  const safeItems = items || [];
  const safeProductDetails = productDetails || {};

  const combinedItems = safeItems.map((item) => {
    const productId = item.id;
    const details = safeProductDetails[productId] || {};

    return {
      name: item.name,
      quantity: details.quantity || 'No definido',
      unitPrice: Number(details.unitPrice) || 0,
      discount: details.discount || 0,
      total: Number(details.total) || 0,
    };
  });

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.borderBox}>
          <View>
            <Text style={styles.header}>Presupuesto</Text>
            <View style={styles.infoSection}>
              <View style={styles.sellerInfo}>
                <Image
                  src={logo}
                  style={{ width: 70, height: 70, margin: '-30px 0 10px 0' }}
                />
                <Text>MR tienda</Text>
                <Text>
                  Dirección del Vendedor: Av. Belgrano 2846, San Miguel De
                  Tucuman
                </Text>
                <Text>CUIL: 20-20284257-8</Text>
                <Text>Juan Carlos Gonzalez</Text> Juan Carlos Gonzalez
              </View>
              <View style={styles.divider} />
              <View style={styles.leftSide}>
                <View style={styles.date}>
                  <Text>Fecha: {new Date().toLocaleDateString()}</Text>
                  <Text>N° de Orden: 00001</Text>
                </View>
                <View style={styles.clientInfo}>
                  <Text>Cliente: {customer?.name || 'No definido'}</Text>
                  <Text>Dirección: {customer?.address || 'No definida'}</Text>
                  <Text>CUIL: {customer?.dniCuit || 'No definido'}</Text>
                  <Text>Celular: {customer?.phone || 'No definido'}</Text>
                  {/*          <Text>Email: {customer?.email || 'No definido'}</Text> */}
                  {/*     <Text>
                  Barrio/localidad: {customer?.neighborhood || 'No definido'}
                </Text> */}
                  {/* <Text>
                  Domicilio de Facturación:{' '}
                  {customer?.billingAddress || 'No definido'}
                </Text> */}
                  <Text>
                    Situación Fiscal: {customer?.taxStatus || 'No definido'}
                  </Text>
                </View>
              </View>
            </View>

            <View>
              <Text>Detalles de la Orden:</Text>
              <View style={styles.itemHeader}>
                <Text style={styles.itemName}>Item</Text>
                <Text style={styles.itemQuantity}>Cantidad</Text>
                <Text style={styles.itemPrice}>P. Unit</Text>
                <Text style={styles.itemDiscount}>Descuento</Text>
                <Text style={styles.itemTotal}>Subtotal</Text>
              </View>
              {combinedItems.length > 0 ? (
                combinedItems.map((item, index) => (
                  <View key={index} style={styles.itemRow}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemQuantity}>{item.quantity}</Text>
                    <Text style={styles.itemPrice}>
                      ${item.unitPrice.toFixed(2)}
                    </Text>
                    <Text style={styles.itemDiscount}>{item.discount}%</Text>
                    <Text style={styles.itemTotal}>
                      ${item.total.toFixed(2)}
                    </Text>
                  </View>
                ))
              ) : (
                <Text>No hay productos seleccionados.</Text>
              )}
            </View>
          </View>
          <View>
            <View style={styles.totalSection}>
              <Text style={styles.totalText}>
                Total: ${totalPrice?.toFixed(2) || '0.00'}
              </Text>
            </View>
            <View style={styles.footer}>
              <Text>Gracias por su compra.</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default PDFDocument;
