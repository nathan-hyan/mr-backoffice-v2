/* eslint-disable no-nested-ternary */
import { Font, Image, StyleSheet, Text, View } from '@react-pdf/renderer';
import { Product } from 'types/data';

import qr from '~assets/qrplace.png';
import calculateNumberWithPercentage from '~utils/addPercentage';

Font.register({
  family: 'Poppins',
  fonts: [
    {
      src: '/Fonts/Poppins-Regular.ttf',
      fontWeight: 'normal',
    },
    {
      src: '/Fonts/Poppins-Bold.ttf',
      fontWeight: 'bold',
    },
    {
      src: '/Fonts/Poppins-Black.ttf',
      fontWeight: 900,
    },
  ],
});

interface Props {
  product: Product;
  model: string;
  size: string;
  barcodeImage: string;
}

const CM_TO_PT = 28.3465;

const styles = StyleSheet.create({
  label: {
    padding: 0,
    boxSizing: 'border-box',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  bold: {
    fontWeight: 'bold',
  },
  name: {
    fontSize: 9,
    textAlign: 'center',
    maxLines: 2,
  },
});

function widthFromSize(size: string) {
  if (size === '6.6cm') return CM_TO_PT * 6.6;
  if (size === '5cm') return CM_TO_PT * 5;
  return CM_TO_PT * 4;
}

function PdfLabelRenderer({ product, model, size, barcodeImage }: Props) {
  const width = widthFromSize(size);

  if (model === 'Codigo de barras') {
    return (
      <View
        style={{
          ...styles.label,
          width: CM_TO_PT * 4,
          height: 78,
          borderWidth: 1,
          borderColor: 'black',
          marginRight: 2,
          marginBottom: 3,
        }}
      >
        <View style={{ width: '100%', paddingTop: 5, alignItems: 'center' }}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image src={barcodeImage} style={{ width: '100%', height: 40 }} />
            <View style={{ height: 9, justifyContent: 'center' }} />
          </View>

          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: 'black',
              marginVertical: 4,
            }}
          />

          <View style={{ width: '100%', justifyContent: 'center' }}>
            <Text style={styles.name}>{product.name}</Text>
          </View>
        </View>
      </View>
    );
  }

  if (model === 'Precio unitario') {
    const conf =
      size === '6.6cm'
        ? {
            labelH: 142,
            topH: 66.75,
            priceFS: 28.5,
            qrW: 44.25,
            qrH: 44.25,
            idFS: 9,
            middleH: 35,
            middleFS: 10.5,
            bottomH: 18,
            bottomFS: 9.75,
            bottomPadL: 15,
          }
        : size === '5cm'
          ? {
              labelH: 109,
              topH: 50.25,
              priceFS: 21,
              qrW: 34.5,
              qrH: 34.5,
              idFS: 7.5,
              middleH: 27,
              middleFS: 7.5,
              bottomH: 15,
              bottomFS: 7.5,
              bottomPadL: 10,
            }
          : {
              labelH: 88,
              topH: 42.75,
              priceFS: 16.5,
              qrW: 30.75,
              qrH: 30.75,
              idFS: 6,
              middleH: 20,
              middleFS: 6,
              bottomH: 10,
              bottomFS: 6,
              bottomPadL: 10,
            };

    return (
      <View style={{ ...styles.label, width, height: conf.labelH }}>
        <View
          style={{
            height: conf.topH,
            backgroundColor: '#FFF111',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingHorizontal: 6,
          }}
        >
          <Text
            style={{
              fontSize: conf.priceFS,
              fontFamily: 'Poppins',
              fontWeight: 900,
              marginLeft: 5,
            }}
          >
            $
            {product.prices.retail1?.retail
              ? Math.floor(product.prices.retail1.retail)
              : Math.floor(
                  calculateNumberWithPercentage(
                    product.prices.cost?.value ?? 0,
                    product.prices.retail?.value ?? 0,
                    'incr'
                  ) || 0
                )}
          </Text>

          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image src={qr} style={{ width: conf.qrW, height: conf.qrH }} />
            <Text
              style={{
                fontSize: conf.idFS,
                marginTop: 2,
                fontWeight: 'bold',
              }}
            >
              {product.id.slice(0, 6)}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: 'black',
            marginVertical: 0,
          }}
        />

        <View
          style={{
            width: '100%',
            height: conf.middleH,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Text
            style={{
              fontSize: conf.middleFS,
              textAlign: 'center',
              lineHeight: 1,
              maxLines: 2,
            }}
          >
            {product.name}
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: 'black',
            marginVertical: 0,
          }}
        />

        <View
          style={{
            width: '100%',
            height: conf.bottomH,
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingLeft: conf.bottomPadL,
          }}
        >
          <Text
            style={{
              fontSize: conf.bottomFS,
              lineHeight: 1,
              fontFamily: 'Poppins',
              fontWeight: 'bold',
            }}
          >
            COD.BARRA:{' '}
            <Text style={{ fontWeight: 'normal' }}>{product.barcode}</Text>
          </Text>
        </View>
      </View>
    );
  }

  if (model === 'Por Mayor') {
    const is66 = size === '6.6cm';
    const conf = is66
      ? {
          labelH: 136.5,
          topH: 96.75,
          padL: 15,
          priceFS: 31.5,
          priceH: 31.5,
          multiFS: 18,
          qrW: 44.25,
          qrH: 44.25,
          nameH: 26.25,
          nameFS: 10.5,
          bottomH: 13.5,
          bottomPadL: 15,
          bottomFS: 9.75,
          bottomLH: 1,
          fontSize: 9,
          qrMargin: 3,
        }
      : {
          labelH: 103.5,
          topH: 74,
          padL: 7.5,
          priceFS: 20,
          priceH: 24,
          multiFS: 15,
          qrW: 34.5,
          qrH: 34.5,
          nameH: 21,
          nameFS: 7.5,
          bottomH: 9.75,
          bottomPadL: 7.5,
          bottomFS: 7.5,
          bottomLH: 0.7,
          fontSize: 7.5,
          qrMargin: 2.5,
        };

    return (
      <View
        style={{
          ...styles.label,
          width,
          height: conf.labelH,
          marginHorizontal: 1,
          marginBottom: 3,
        }}
      >
        <View
          style={{
            height: conf.topH,
            backgroundColor: '#FFF111',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <View style={{ paddingLeft: conf.padL, width: '100%' }}>
            <View style={{ height: conf.priceH, justifyContent: 'center' }}>
              <Text
                style={{
                  fontSize: 12,
                }}
              >
                1x:{' '}
                <Text
                  style={{
                    fontSize: conf.priceFS,
                    fontWeight: 900,
                    fontFamily: 'Poppins',
                    lineHeight: 1,
                  }}
                >
                  $
                  {product.prices.retail1?.retail
                    ? Math.floor(product.prices.retail1.retail)
                    : Math.floor(
                        calculateNumberWithPercentage(
                          product.prices.cost?.value ?? 0,
                          product.prices.retail?.value ?? 0,
                          'incr'
                        ) || 0
                      )}
                </Text>
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  paddingLeft: 5,
                }}
              >
                3x:{' '}
                <Text
                  style={{
                    fontSize: conf.multiFS,
                    fontWeight: 600,
                    fontFamily: 'Poppins',
                    lineHeight: 1,
                    marginLeft: 5,
                  }}
                >
                  ${product.prices.retail2?.retail ?? 0}
                </Text>
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  paddingLeft: 5,
                }}
              >
                5x:{' '}
                <Text
                  style={{
                    fontSize: conf.multiFS,
                    fontWeight: 600,
                    fontFamily: 'Poppins',
                    lineHeight: 1,
                    marginLeft: 5,
                  }}
                >
                  ${product.prices.retail3?.retail ?? 0}
                </Text>
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  paddingLeft: 4.5,
                }}
              >
                10x:{' '}
                <Text
                  style={{
                    fontSize: conf.multiFS,
                    fontWeight: 600,
                    fontFamily: 'Poppins',
                    lineHeight: 1,
                    marginLeft: 5,
                  }}
                >
                  ${product.prices.retail4?.retail ?? 0}
                </Text>
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginHorizontal: 10,
                marginTop: conf.qrMargin,
              }}
            >
              <Image src={qr} style={{ width: conf.qrW, height: conf.qrH }} />
              <Text
                style={{
                  fontSize: conf.fontSize,
                  marginTop: 2,
                  fontWeight: 'bold',
                }}
              >
                {product.id.slice(0, 6)}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: 'black',
            marginVertical: 0,
          }}
        />

        <View
          style={{
            width: '100%',
            height: conf.nameH,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{ fontSize: conf.nameFS, textAlign: 'center', maxLines: 2 }}
          >
            {product.name}
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: 'black',
            marginVertical: 0,
          }}
        />

        <View
          style={{
            width: '100%',
            height: conf.bottomH,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingLeft: conf.bottomPadL,
          }}
        >
          <Text>
            <Text
              style={{
                fontSize: conf.bottomFS,
                lineHeight: conf.bottomLH,
                fontWeight: 600,
                fontFamily: 'Poppins',
              }}
            >
              COD.BARRA:{' '}
            </Text>
            <Text
              style={{ fontSize: conf.bottomFS, lineHeight: conf.bottomLH }}
            >
              {product.barcode}
            </Text>
          </Text>
        </View>
      </View>
    );
  }

  return null;
}

export default PdfLabelRenderer;
