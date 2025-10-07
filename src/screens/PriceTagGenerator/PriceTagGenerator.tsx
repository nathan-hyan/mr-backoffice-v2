/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Product } from 'types/data';

import { useProducts } from '~contexts/Products';
import generateBarcodeImage from '~utils/generatedBarcodeImage';

import styles from './styles.module.scss';

import ControlPanel from './components/ControlPanel/ControlPanel';
import PdfLabelExport from './components/LabelRender/components/PdfLabelExport/PdfLabelExport';
import LabelRenderer from './components/LabelRender/LabelRenderer';

type ConfirmedProduct = {
  product: Product;
  size: string;
  copies: number;
  model: string;
  barcodeImage: string;
};

function PriceTagGenerator() {
  const { productList } = useProducts();

  const [values, setValues] = useState({
    selectedProducts: [],
    size: '5cm',
    copies: 1,
  });

  const [selectedModel, setSelectedModel] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [confirmedProducts, setConfirmedProducts] = useState<
    ConfirmedProduct[]
  >([]);

  const handleChange = (data: {
    selectedProducts: string[];
    size: string;
    copies: number;
  }) => {
    setValues(data);
    const id = data.selectedProducts[0];
    const prod = productList.find((p) => p.id === id) || null;
    setSelectedProduct(prod);
  };

  const confirmProduct = () => {
    if (!selectedProduct || !selectedModel || values.copies < 1) return;

    const barcodeImage = generateBarcodeImage(selectedProduct.barcode);

    setConfirmedProducts((prev) => [
      ...prev,
      {
        product: selectedProduct,
        size: values.size,
        copies: values.copies,
        model: selectedModel,
        barcodeImage,
      },
    ]);

    setValues({ selectedProducts: [], size: '5cm', copies: 1 });
    setSelectedProduct(null);
    setSelectedModel('');
  };

  const removeConfirmedProduct = (indexToRemove: number) => {
    setConfirmedProducts((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerBlock}>
        <h3>Generador de etiquetas</h3>
        {confirmedProducts.length > 0 && (
          <div className={styles.printButton}>
            <PDFDownloadLink
              document={<PdfLabelExport confirmed={confirmedProducts} />}
              fileName='etiquetas.pdf'
              className={styles.printAccept}
            >
              {({ loading }) =>
                loading ? 'Generando PDF...' : 'Imprimir etiquetas'
              }
            </PDFDownloadLink>
          </div>
        )}
      </div>

      <ControlPanel
        onChange={handleChange}
        selectedModel={selectedModel}
        onSelectModel={setSelectedModel}
      />

      {selectedProduct && selectedModel && (
        <>
          {' '}
          <button
            type='button'
            className={styles.confirmButton}
            onClick={confirmProduct}
          >
            Confirmar producto
          </button>
          <LabelRenderer
            model={selectedModel}
            product={selectedProduct}
            size={values.size}
            copies={values.copies}
          />
        </>
      )}

      {confirmedProducts.length > 0 && (
        <div className={styles.previewBlock}>
          <h4>Etiquetas confirmadas</h4>
          {confirmedProducts.map((item, index) => (
            <div key={index} className={styles.confirmedItem}>
              <LabelRenderer
                model={item.model}
                product={item.product}
                size={item.size}
                copies={item.copies}
              />
              <button
                type='button'
                className={styles.deleteButton}
                onClick={() => removeConfirmedProduct(index)}
              >
                Eliminar grupo
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PriceTagGenerator;
