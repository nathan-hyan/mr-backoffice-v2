import { ChangeEvent, useEffect, useState } from 'react';
import { Product } from 'types/data';
import { Nullable } from 'vite-env';

import useGATag from '~hooks/useGATag';

import styles from './styles.module.scss';

import { mockProducts } from '../constants';

interface ProductSearchBoxProps {
  onProductSelect: (product: Product, price: number) => void;
}

function ProductSearchBox({ onProductSelect }: ProductSearchBoxProps) {
  const { tagAction } = useGATag(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchCriteria, setSearchCriteria] = useState<number>(0);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [selectedPriceType, setSelectedPriceType] = useState<string>('retail');

  const filterProducts = () => {
    const filteredProducts = mockProducts.filter((product) => {
      const query = searchQuery.toLowerCase();

      switch (searchCriteria) {
        case 0:
          return product.name.toLowerCase().includes(query);
        case 1:
          return product.barcode.toLowerCase().includes(query);
        case 2:
          return product.id.toString().includes(query);
        default:
          return false;
      }
    });

    setSearchResults(filteredProducts);
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  const handleClearInput = () => {
    tagAction('Event', 'Click', 'Cleared search box');
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleChangeSearch = (
    _: ChangeEvent<HTMLInputElement>,
    newValue: Nullable<number>
  ) => {
    if (typeof newValue === 'number') {
      let criteriaLabel = '';
      switch (newValue) {
        case 0:
          criteriaLabel = 'nombre producto';
          break;
        case 1:
          criteriaLabel = 'codigo barras';
          break;
        case 2:
          criteriaLabel = 'ID';
          break;
      }
      tagAction('Event', 'Changed', `Search type: ${criteriaLabel}`);
      setSearchCriteria(newValue);
    }
  };

  const handlePriceTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPriceType(e.target.value);
  };

  useEffect(() => {
    filterProducts();
  }, [searchQuery, searchCriteria]);

  const handleSelectProduct = (product: Product) => {
    const selectedPrice =
      product.prices[selectedPriceType as keyof typeof product.prices]?.value;
    console.log('Producto seleccionado:', product);
    console.log(`Precio seleccionado (${selectedPriceType}):`, selectedPrice);

    setSearchQuery('');
    setSearchResults([]);

    onProductSelect(product, selectedPrice);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <input
          className={styles.search}
          type='text'
          value={searchQuery}
          onChange={handleChangeValue}
          placeholder='Buscar Producto'
        />
        {searchQuery && searchResults.length > 0 && (
          <ul className={styles.searchResults}>
            {searchResults.map((product) => (
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

      <div className={styles.criteria}>
        <label>
          <input
            type='radio'
            name='searchCriteria'
            checked={searchCriteria === 0}
            onChange={(e) => handleChangeSearch(e, 0)}
          />
          Nombre
        </label>
        <label>
          <input
            type='radio'
            name='searchCriteria'
            checked={searchCriteria === 1}
            onChange={(e) => handleChangeSearch(e, 1)}
          />
          Codigo Barras
        </label>
        <label>
          <input
            type='radio'
            name='searchCriteria'
            checked={searchCriteria === 2}
            onChange={(e) => handleChangeSearch(e, 2)}
          />
          ID
        </label>
      </div>

      <div className={styles.priceList}>
        <label className={styles.selectList}>Lista de Precio</label>
        <select
          className={styles.priceSelect}
          id='priceType'
          value={selectedPriceType}
          onChange={handlePriceTypeChange}
        >
          <option value='retail'>Retail</option>
          <option value='online'>Online</option>
          <option value='mayo1'>Mayo 1</option>
          <option value='mayo2'>Mayo 2</option>
          <option value='cost'>cost</option>
          <option value='mayo3'>mayo 3</option>
          <option value='mayo4'>mayo 4</option>
          <option value='reseller'>reseller</option>
        </select>
      </div>
      <div className={styles.orden}>
        <span>N° de Orden: #032156</span>
      </div>
    </div>
  );
}

export default ProductSearchBox;
