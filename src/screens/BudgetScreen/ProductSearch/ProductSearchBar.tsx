/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent, useEffect, useState } from 'react';
import { Product } from 'types/data';
import { Nullable } from 'vite-env';

import { useProducts } from '~contexts/Products';
import { useVentas } from '~contexts/Sells';

import styles from './styles.module.scss';

interface ProductSearchBoxProps {
  onProductSelect: (product: Product, price: number) => void;
  selectedPriceType: string;
  onPriceTypeChange: (newPriceType: string) => void;
}

function ProductSearchBox({
  onProductSelect,
  selectedPriceType,
  onPriceTypeChange,
}: ProductSearchBoxProps) {
  const {
    productList,
    performSearch,
    clearSearch,
    searchQuery,
    searchCriteria,
  } = useProducts();

  const { getNextOrderNumber } = useVentas();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [searchCriteriaLocal, setSearchCriteriaLocal] =
    useState<number>(searchCriteria);

  useEffect(() => {
    clearSearch();
    return () => {
      clearSearch();
    };
  }, [clearSearch]);

  useEffect(() => {
    const fetchOrderNumber = async () => {
      const newOrderNumber = await getNextOrderNumber();
      setOrderNumber(newOrderNumber || '00001');
    };
    fetchOrderNumber();
  }, [getNextOrderNumber]);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    performSearch(value, searchCriteriaLocal);
  };

  const handleChangeSearch = (
    _: ChangeEvent<HTMLInputElement>,
    newValue: Nullable<number>
  ) => {
    if (typeof newValue === 'number') {
      setSearchCriteriaLocal(newValue);
      performSearch(searchQuery, newValue);
    }
  };

  const handleSelectProduct = (product: Product) => {
    const selectedPrice =
      product.prices[selectedPriceType as keyof typeof product.prices]?.value;

    onProductSelect(product, selectedPrice);
    clearSearch();
  };

  const handlePriceTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newPriceType = e.target.value;
    onPriceTypeChange(newPriceType);
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
        {searchQuery && productList.length > 0 && (
          <ul className={styles.searchResults}>
            {productList.map((product) => (
              <li key={product.id}>
                <button
                  type='button'
                  onClick={() => handleSelectProduct(product)}
                >
                  {product.name} <span>({product.stock.current || '0'})</span>
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
            checked={searchCriteriaLocal === 0}
            onChange={(e) => handleChangeSearch(e, 0)}
          />
          Nombre
        </label>
        <label>
          <input
            type='radio'
            name='searchCriteria'
            checked={searchCriteriaLocal === 1}
            onChange={(e) => handleChangeSearch(e, 1)}
          />
          Codigo Barras
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
          <option value='cost'>Cost</option>
          <option value='mayo3'>Mayo 3</option>
          <option value='mayo4'>Mayo 4</option>
          <option value='reseller'>Reseller</option>
        </select>
      </div>
      <div className={styles.orden}>
        <span>N° de Orden: #{orderNumber}</span>
      </div>
    </div>
  );
}

export default ProductSearchBox;
