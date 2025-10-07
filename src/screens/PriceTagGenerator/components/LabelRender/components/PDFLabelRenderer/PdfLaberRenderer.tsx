import { Image, StyleSheet, Text, View } from '@react-pdf/renderer';
import { Product } from 'types/data';

import qr from '~assets/qrplace.png';

interface Props {
  product: Product;
  model: string;
  size: string;
  barcodeImage: string;
}

const CM_TO_PT = 28.3465;

const styles = StyleSheet.create({
  label: {
    border: '1pt solid black',
    padding: 6,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  barcode: {
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 9,
    textAlign: 'center',
    maxLines: 2,
  },
  topSection: {
    backgroundColor: '#e9e90f',
    padding: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qrBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  qrImage: {
    width: 60,
    height: 60,
  },
  price: {
    fontSize: 32,
  },
  middleSection: {
    textAlign: 'center',
    fontSize: 9,
    marginVertical: 4,
    maxLines: 2,
  },
  bottomSection: {
    textAlign: 'center',
    fontSize: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  multiPriceBlock: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 10,
    alignItems: 'flex-end',
    gap: 2,
  },
});

function getHeightForModel(model: string): number {
  switch (model) {
    case 'Codigo de barras':
      return CM_TO_PT * 4;
    case 'Precio unitario':
      return CM_TO_PT * 5;
    case 'Por Mayor':
      return CM_TO_PT * 6;
    default:
      return CM_TO_PT * 4;
  }
}

function PdfLabelRenderer({ product, model, size, barcodeImage }: Props) {
  const width = size === '5cm' ? CM_TO_PT * 5 : CM_TO_PT * 6.6;
  const height = getHeightForModel(model);

  if (model === 'Codigo de barras') {
    return (
      <View style={{ ...styles.label, width, height }}>
        <Image src={barcodeImage} style={{ width: '100%', height: 80 }} />
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: 'black',
            marginVertical: 4,
          }}
        />
        <Text style={styles.name}>{product.name}</Text>
      </View>
    );
  }

  if (model === 'Precio unitario') {
    return (
      <View style={{ ...styles.label, width, height, padding: 0 }}>
        <View
          style={{
            backgroundColor: '#e9e90f',
            width: '100%',
            height: 70,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 6,
          }}
        >
          <Text
            style={{ fontSize: size === '5cm' ? 24 : 34, fontWeight: 'bold' }}
          >
            ${product.prices.retail1.retail}
          </Text>
          <View style={{ alignItems: 'center' }}>
            <Image src={qr} style={{ width: 30, height: 30 }} />
            <Text style={{ fontSize: 10, marginTop: 2 }}>
              {product.id.slice(0, 6)}
            </Text>
          </View>
        </View>

        <Text style={{ fontSize: 10, textAlign: 'center', marginBottom: 6 }}>
          {product.name.length > 60
            ? `${product.name.slice(0, 50)}...`
            : product.name}
        </Text>

        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: 'black',
            marginBottom: 4,
          }}
        />

        <Text style={{ fontSize: 10, textAlign: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>COD.BARRA: </Text>
          {product.barcode}
        </Text>
      </View>
    );
  }

  if (model === 'Por Mayor') {
    return (
      <View style={{ ...styles.label, width, height, padding: 0 }}>
        <View
          style={{
            backgroundColor: '#e9e90f',
            width: '100%',
            paddingHorizontal: 6,
            paddingVertical: 6,
          }}
        >
          <Text
            style={{
              fontSize: size === '5cm' ? 25 : 32,
              fontWeight: 'bold',
              marginBottom: 4,
            }}
          >
            1x ${product.prices.retail1.retail}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ fontSize: size === '5cm' ? 15 : 22 }}>
              <Text>
                3x:{' '}
                <Text style={{ fontWeight: 'bold' }}>
                  ${product.prices.retail2.retail}
                </Text>
              </Text>
              <Text>
                5x:{' '}
                <Text style={{ fontWeight: 'bold' }}>
                  ${product.prices.retail3.retail}
                </Text>
              </Text>
              <Text>
                10x:{' '}
                <Text style={{ fontWeight: 'bold' }}>
                  ${product.prices.retail4.retail}
                </Text>
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Image src={qr} style={{ width: 32, height: 32 }} />
              <Text style={{ fontSize: 8, marginTop: 2 }}>
                {product.id.slice(0, 6)}
              </Text>
            </View>
          </View>
        </View>

        <Text style={{ fontSize: 10, textAlign: 'center', marginVertical: 6 }}>
          {product.name.length > 60
            ? `${product.name.slice(0, 50)}...`
            : product.name}
        </Text>

        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: 'black',
            marginBottom: 4,
          }}
        />

        <Text style={{ fontSize: 10, textAlign: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>COD.BARRA: </Text>
          {product.barcode}
        </Text>
      </View>
    );
  }

  return null;
}

export default PdfLabelRenderer;
