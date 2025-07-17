/* eslint-disable @typescript-eslint/no-unused-vars */
import { Document, Page, StyleSheet } from '@react-pdf/renderer';

import calculateNumberWithPercentage from '~utils/addPercentage';

import PDFPriceTag from './PdfPriceTag';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
  },
});

interface ProductData {
  name: string;
  id?: string;
  barcode: string;
  internalId: number;
  prices: {
    cost: { value: number };
    retail?: { value: number };
    retail1?: { value: number };
  };
  variant?: 'green' | 'pink' | 'yellow';
}

interface PdfPrintProps {
  data: ProductData[];
}

function PdfPrint({ data }: PdfPrintProps) {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {data.map(({ name, barcode, internalId, prices, variant }) => {
          const safeCost = prices?.cost?.value ?? 0;
          const safeRetail =
            prices?.retail1?.value ?? prices?.retail?.value ?? 0;

          const cashPrice =
            safeRetail === 0
              ? 'Invalid'
              : calculateNumberWithPercentage(safeCost, safeRetail, 'incr');

          return (
            <PDFPriceTag
              key={internalId}
              name={name}
              cashPrice={cashPrice}
              internalId={internalId}
              barCode={barcode}
              showPrices
              variant={variant || 'yellow'}
            />
          );
        })}
      </Page>
    </Document>
  );
}

export default PdfPrint;
