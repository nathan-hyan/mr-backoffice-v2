/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';

import { useProducts } from '~contexts/Products';

import styles from './styles.module.scss';

import PriceTagModal from '../PriceTagModal/PriceTagModal';

interface Product {
  id: string;
  name: string;
}

interface Props {
  onChange: (data: {
    selectedProducts: string[];
    size: string;
    copies: number;
  }) => void;
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
}

function ControlPanel({ onChange, selectedModel, onSelectModel }: Props) {
  const { productList, performSearch, searchQuery } = useProducts();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [size, setSize] = useState('5cm');
  const [copies, setCopies] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    performSearch(e.target.value, 0);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    performSearch('', 0);
    onChange({ selectedProducts: [product.id], size, copies });
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = e.target.value;
    setSize(newSize);
    onChange({
      selectedProducts: selectedProduct ? [selectedProduct.id] : [],
      size: newSize,
      copies,
    });
  };

  const handleCopiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setCopies(value);
    onChange({
      selectedProducts: selectedProduct ? [selectedProduct.id] : [],
      size,
      copies: value,
    });
  };

  const handleModelSelect = (id: string) => {
    onSelectModel(id);
    setShowModal(false);
  };

  return (
    <div className={styles.controlPanel}>
      <div className={styles.productSection}>
        <div className={styles.searchBox}>
          <label>Producto: </label>
          <input
            className={styles.input}
            type='text'
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && productList.length > 0 && (
            <ul className={styles.searchResults}>
              {productList.map((product) => (
                <li key={product.id}>
                  <button
                    type='button'
                    onClick={() => handleSelectProduct(product)}
                  >
                    {product.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {selectedProduct && (
          <div className={styles.selectedProduct}>
            <p>{selectedProduct.name}</p>
            <button
              className={styles.buttonClose}
              type='button'
              onClick={() => {
                setSelectedProduct(null);
                onChange({ selectedProducts: [], size, copies });
              }}
            >
              x
            </button>
          </div>
        )}
      </div>

      <div>
        <label>Modelo de etiqueta: </label>
        <button
          className={styles.button}
          type='button'
          onClick={() => setShowModal(true)}
        >
          Ver modelos
        </button>
        <div>
          <span>{selectedModel && `Seleccionado: ${selectedModel}`}</span>
        </div>
      </div>

      <div>
        <label>Tamaño de etiqueta: </label>
        <select
          className={styles.input}
          value={size}
          onChange={handleSizeChange}
        >
          <option value='5cm'>5 cm</option>
          <option value='6.6cm'>6.6 cm</option>
        </select>
      </div>

      <div>
        <label>Cantidad de etiquetas a imprimir: </label>
        <input
          className={styles.input}
          type='number'
          min={1}
          value={copies}
          onChange={handleCopiesChange}
        />
      </div>

      <PriceTagModal
        visible={showModal}
        selectedModel={selectedModel}
        onSelect={handleModelSelect}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}

export default ControlPanel;
