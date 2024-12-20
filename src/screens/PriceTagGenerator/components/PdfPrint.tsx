/* eslint-disable @typescript-eslint/no-unused-vars */
import { Document, Page, StyleSheet } from '@react-pdf/renderer';

import calculateNumberWithPercentage from '~utils/addPercentage';

import PDFPriceTag from './PdfPriceTag';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
});

interface ProductData {
  name: string;
  id?: string;
  barcode: string;
  internalId: number;
  prices: { cost: { value: number }; retail?: { value: number } };
  variant?: 'green' | 'pink' | 'yellow';
}

interface PdfPrintProps {
  data: ProductData[];
}

function PdfPrint({ data }: PdfPrintProps) {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {data.map(
          ({
            name,

            barcode,
            internalId,
            prices: { cost, retail },
            variant,
          }) => (
            <PDFPriceTag
              key={internalId}
              name={name}
              cashPrice={
                !retail
                  ? 'Invalid'
                  : calculateNumberWithPercentage(
                      cost.value,
                      retail?.value || 0,
                      'incr'
                    )
              }
              internalId={internalId}
              barCode={barcode}
              showPrices
              variant={variant || 'yellow'}
            />
          )
        )}
      </Page>
    </Document>
  );
}

export default PdfPrint;
