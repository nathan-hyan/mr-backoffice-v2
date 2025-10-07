/* eslint-disable react/no-array-index-key */
import { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import { Product } from 'types/data';

import PdfLabelRenderer from '../PDFLabelRenderer/PdfLaberRenderer';

const CM_TO_PT = 28.3465;
const PAGE_WIDTH_CM = 21;
const PAGE_HEIGHT_CM = 29.7;
const MARGIN_CM = 0.5;

export type ConfirmedProduct = {
  product: Product;
  size: string;
  copies: number;
  model: string;
  barcodeImage: string;
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: MARGIN_CM * CM_TO_PT,
    paddingBottom: MARGIN_CM * CM_TO_PT,
    paddingLeft: MARGIN_CM * CM_TO_PT,
    paddingRight: MARGIN_CM * CM_TO_PT,
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

function cmToPt(cm: number) {
  return cm * CM_TO_PT;
}

function PdfLabelExport({ confirmed }: { confirmed: ConfirmedProduct[] }) {
  const pages: JSX.Element[] = [];
  let currentPage: JSX.Element[] = [];
  let currentHeight = 0;

  const pageHeightPt = PAGE_HEIGHT_CM * CM_TO_PT;
  const pageWidthPt = PAGE_WIDTH_CM * CM_TO_PT;
  const marginPt = MARGIN_CM * CM_TO_PT;

  type RowItem = {
    product: Product;
    size: string;
    model: string;
    barcodeImage: string;
  };

  confirmed.forEach(({ product, size, copies, model, barcodeImage }, index) => {
    const labelWidthPt = cmToPt(parseFloat(size));
    const labelHeightPt = getHeightForModel(model);
    const labelsPerRow = Math.floor(
      (pageWidthPt - 2 * marginPt) / labelWidthPt
    );

    let row: RowItem[] = [];

    for (let i = 0; i < copies; i += 1) {
      row.push({ product, size, model, barcodeImage });

      if (row.length === labelsPerRow || i === copies - 1) {
        if (currentHeight + labelHeightPt > pageHeightPt - 2 * marginPt) {
          pages.push(
            <Page size='A4' style={styles.page} key={`page-${pages.length}`}>
              {currentPage}
            </Page>
          );
          currentPage = [];
          currentHeight = 0;
        }

        for (let j = 0; j < labelsPerRow; j += 1) {
          const content = row[j];
          if (content) {
            currentPage.push(
              <PdfLabelRenderer
                key={`label-${index}-${i}-${j}`}
                product={content.product}
                model={content.model}
                size={content.size}
                barcodeImage={content.barcodeImage}
              />
            );
          } else {
            currentPage.push(
              <View
                key={`empty-${index}-${i}-${j}`}
                style={{
                  width: labelWidthPt,
                  height: labelHeightPt,
                }}
              />
            );
          }
        }

        currentHeight += labelHeightPt;
        row = [];
      }
    }
  });

  if (currentPage.length > 0) {
    pages.push(
      <Page size='A4' style={styles.page} key={`page-${pages.length}`}>
        {currentPage}
      </Page>
    );
  }

  return <Document>{pages}</Document>;
}

export default PdfLabelExport;
