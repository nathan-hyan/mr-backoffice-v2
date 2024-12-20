import { StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid black',
    maxWidth: '250px',
    margin: 5,
  },
  infoSide: {
    width: '60%',
    backgroundColor: '#f5f5f5',
    color: 'black',
    padding: 10,
    fontSize: '10px',
  },
  productName: {
    overflow: 'hidden',
    height: 30,
    lineClamp: 4,
    fontWeight: 700,
  },
  priceSide: (variant: string) => {
    let color;
    switch (variant) {
      case 'green':
        color = '#66bb6a';
        break;
      case 'pink':
        color = '#f06292';
        break;
      case 'yellow':
      default:
        color = '#ffca28';
        break;
    }
    return {
      width: '40%',
      backgroundColor: color,
      padding: 10,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexDirection: 'column',
    };
  },
  text: {
    fontSize: 10,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  barcode: {
    marginTop: 5,
  },
});

interface PDFPriceTagProps {
  name: string;
  cashPrice: number | 'Invalid';
  internalId: number;
  barCode: string;
  showPrices?: boolean;
  variant?: 'green' | 'pink' | 'yellow';
}

function PDFPriceTag({
  name,
  cashPrice,
  internalId,
  barCode,
  showPrices = true,
  variant = 'yellow',
}: PDFPriceTagProps) {
  return (
    <View style={styles.container}>
      <View style={styles.infoSide}>
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.text}>ID: {internalId}</Text>
        {barCode && <Text style={styles.text}>{barCode}</Text>}
      </View>
      <View style={styles.priceSide(variant)}>
        {showPrices && (
          <>
            <Text style={styles.text}>Precio contado:</Text>
            <Text style={styles.priceText}>
              ${Number(cashPrice).toFixed(2)}
            </Text>
          </>
        )}
      </View>
    </View>
  );
}

export default PDFPriceTag;

// TODO: fix barcode generator
