import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  section: {
    marginBottom: 10,
  },
  clientInfo: {
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
    marginBottom: 5,
  },
  itemName: {
    width: '30%',
  },
  itemQuantity: {
    width: '15%',
  },
  itemPrice: {
    width: '15%',
  },
  itemDiscount: {
    width: '15%',
  },
  itemTotal: {
    width: '25%',
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
  },
});

function PDFDocument({ customer, items, total }) {
  // Asegúrate de que items no sea undefined antes de usar map
  const safeItems = items || []; // Si items es undefined, usa un arreglo vacío

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>Factura de Venta</Text>
        <View style={styles.section}>
          <Image src='path/to/logo.png' style={{ width: 100, height: 100 }} />
          <Text style={styles.header}>Mundo Regalo</Text>
          <Text style={styles.clientInfo}>
            Dirección del Vendedor: Av. Siempreviva 123, Buenos Aires
          </Text>
          <Text style={styles.clientInfo}>
            CUIL del Vendedor: 30-12345678-9
          </Text>
        </View>
        <View style={styles.section}>
          <Text>Cliente: {customer?.name || 'No definido'}</Text>
          <Text>Dirección: {customer?.address || 'No definida'}</Text>
          <Text>CUIL: {customer?.dniCuit || 'No definido'}</Text>
          <Text>Celular: {customer?.phone || 'No definido'}</Text>
          <Text>Email: {customer?.email || 'No definido'}</Text>
          <Text>
            Barrio/localidad: {customer?.neighborhood || 'No definido'}
          </Text>
          <Text>
            Domicilio de Facturación:{' '}
            {customer?.billingAddress || 'No definido'}
          </Text>
          <Text>Situación Fiscal: {customer?.taxStatus || 'No definido'}</Text>
        </View>
        <Text>Fecha: {new Date().toLocaleDateString()}</Text>
        <View style={styles.section}>
          <Text>Detalles de la Orden:</Text>
          <View style={styles.itemRow}>
            <Text style={styles.itemName}>Item</Text>
            <Text style={styles.itemQuantity}>Cantidad</Text>
            <Text style={styles.itemPrice}>P. Unit</Text>
            <Text style={styles.itemDiscount}>Descuento</Text>
            <Text style={styles.itemTotal}>Total</Text>
          </View>
          {safeItems.length > 0 ? (
            safeItems.map((item) => (
              <View key={item.name} style={styles.itemRow}>
                <Text style={styles.itemName}>
                  {item.name || 'No definido'}
                </Text>
                <Text style={styles.itemQuantity}>
                  {item.quantity || 'No definido'}
                </Text>
                <Text style={styles.itemPrice}>
                  ${item.unitPrice?.toFixed(2) || '0.00'}
                </Text>
                <Text style={styles.itemDiscount}>{item.discount || '0'}</Text>
                <Text style={styles.itemTotal}>
                  ${item.totalPrice?.toFixed(2) || '0.00'}
                </Text>
              </View>
            ))
          ) : (
            <Text>No hay productos seleccionados.</Text>
          )}
        </View>
        <View style={styles.section}>
          <Text>Total: ${total?.toFixed(2) || '0.00'}</Text>
        </View>
        <View style={styles.footer}>
          <Text>Gracias por su compra.</Text>
        </View>
      </Page>
    </Document>
  );
}
export default PDFDocument;
