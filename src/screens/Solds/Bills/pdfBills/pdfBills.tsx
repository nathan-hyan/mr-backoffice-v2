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

function PDFDocumentBills({ venta }) {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.borderBox}>
          <View>
            <Text style={styles.header}>
              {venta.isSale ? 'Remito de Venta' : 'Presupuesto'}
            </Text>
            <View style={styles.infoSection}>
              <View style={styles.sellerInfo}>
                <Image
                  src={logo}
                  style={{ width: 70, height: 70, margin: '-30px 0 10px 0' }}
                />
                <Text>MR tienda</Text>
                <Text>Dirección: {venta.sellerInfo.address}</Text>
                <Text>CUIL: {venta.sellerInfo.cuil}</Text>
                <Text>{venta.sellerInfo.contactPerson}</Text>
                <Text>Telefono: {venta.sellerInfo.phone}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.leftSide}>
                <View style={styles.date}>
                  <Text>Fecha: {venta.orderDate}</Text>
                  <Text>N° de Orden: {venta.orderNumber}</Text>
                </View>
                <View style={styles.clientInfo}>
                  <Text>Cliente: {venta.customerInfo?.name || ''}</Text>
                  <Text>Dirección: {venta.customerInfo?.address || ''}</Text>
                  <Text>CUIL:</Text>
                  <Text>Celular: {venta.customerInfo?.phone || ''}</Text>
                  <Text>Situación Fiscal:</Text>
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
              {venta.items.length > 0 ? (
                venta.items.map((item, index) => (
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
                Total: ${venta.totalPrice.toFixed(2)}
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

export default PDFDocumentBills;
