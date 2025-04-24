/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';

import { useProducts } from '~contexts/Products';

import styles from './styles.module.scss';

import PDFDocument from './pdfList/pdfList';

function PriceList() {
  const { productList, categories, brands } = useProducts();
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [selectedPriceType, setSelectedPriceType] = useState<string>('retail');
  const [showPdf, setShowPdf] = useState<boolean>(false);

  const handleCheckboxChange = (property: string) => {
    setSelectedProperties((prev) =>
      prev.includes(property)
        ? prev.filter((item) => item !== property)
        : [...prev, property]
    );
  };

  const handlePriceTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPriceType(event.target.value);
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Sin categoría';
  };

  const getSubCategoryName = (categoryId: string, subCategoryId: number) => {
    const category = categories.find((cat) => cat.id === categoryId);
    const subCategory = category?.subCategories?.find(
      (subCat) => subCat.internalId === subCategoryId
    );
    return subCategory ? subCategory.name : 'Sin subcategoría';
  };

  const getSubSubCategoryName = (
    categoryId: string,
    subCategoryId: number,
    subSubCategoryId: number
  ) => {
    const category = categories.find((cat) => cat.id === categoryId);
    const subCategory = category?.subCategories?.find(
      (subCat) => subCat.internalId === subCategoryId
    );
    const subSubCategory = subCategory?.subSubCategories?.find(
      (subSubCat) => subSubCat.internalId === subSubCategoryId
    );
    return subSubCategory ? subSubCategory.name : 'Sin subsubcategoría';
  };

  const getBrandName = (brandId: string) => {
    const brand = brands.find((b) => b.id === brandId);
    return brand ? brand.name : 'Sin marca';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Lista de precios</h3>
        <button type='button' onClick={() => setShowPdf(true)}>
          Imprimir
        </button>
      </div>

      <div>
        <div className={styles.filters}>
          <label>
            <input
              type='checkbox'
              value='stock'
              onChange={() => handleCheckboxChange('stock')}
            />
            Stock
          </label>
          <label>
            <input
              type='checkbox'
              value='category'
              onChange={() => handleCheckboxChange('category')}
            />
            Categoría
          </label>
          <label>
            <input
              type='checkbox'
              value='subCategory'
              onChange={() => handleCheckboxChange('subCategory')}
            />
            Subcategoría
          </label>
          <label>
            <input
              type='checkbox'
              value='subSubCategories'
              onChange={() => handleCheckboxChange('subSubCategories')}
            />
            Subsubcategorías
          </label>
          <label>
            <input
              type='checkbox'
              value='brand'
              onChange={() => handleCheckboxChange('brand')}
            />
            Marca
          </label>
          <label>
            <input
              type='checkbox'
              value='dimensions'
              onChange={() => handleCheckboxChange('dimensions')}
            />
            Dimensiones
          </label>
          <label>
            <input
              type='checkbox'
              value='weight'
              onChange={() => handleCheckboxChange('weight')}
            />
            Peso
          </label>
          <label>
            <input
              type='checkbox'
              value='variants'
              onChange={() => handleCheckboxChange('variants')}
            />
            Variantes
          </label>
          <label>
            Precio:{' '}
            <select value={selectedPriceType} onChange={handlePriceTypeChange}>
              <option value='cost'>Precio de Costo</option>
              <option value='retail'>Precio Minorista</option>
              <option value='online'>Precio Online</option>
              <option value='mayo1'>Mayorista 1</option>
              <option value='mayo2'>Mayorista 2</option>
              <option value='mayo3'>Mayorista 3</option>
              <option value='mayo4'>Mayorista 4</option>
              <option value='reseller'>Precio Reseller</option>
            </select>
          </label>
        </div>
      </div>

      <div className={styles.title}>
        <span>Nombre</span>
        {selectedProperties.includes('stock') && <span>Stock</span>}
        {selectedProperties.includes('category') && <span>Categoría</span>}
        {selectedProperties.includes('subCategory') && (
          <span>Subcategoría</span>
        )}
        {selectedProperties.includes('subSubCategories') && (
          <span>Subsubcategorías</span>
        )}
        {selectedProperties.includes('brand') && <span>Marca</span>}
        {selectedProperties.includes('dimensions') && <span>Dimensiones</span>}
        {selectedProperties.includes('weight') && <span>Peso</span>}
        {selectedProperties.includes('variants') && <span>Variantes</span>}
        <span>Precio</span>
      </div>

      <div className={styles.priceList}>
        {productList.map((product) => (
          <div key={product.id} className={styles.productRow}>
            <span>{product.name}</span>
            {selectedProperties.includes('stock') && (
              <span>{product.stock.current}</span>
            )}
            {selectedProperties.includes('category') && (
              <span>{getCategoryName(product.category)}</span>
            )}
            {selectedProperties.includes('subCategory') && (
              <span>
                {getSubCategoryName(
                  product.category,
                  Number(product.subCategory)
                )}
              </span>
            )}
            {selectedProperties.includes('subSubCategories') && (
              <span>
                {getSubSubCategoryName(
                  product.category,
                  Number(product.subCategory),
                  Number(product.subSubCategories)
                )}
              </span>
            )}
            {selectedProperties.includes('brand') && (
              <span>{getBrandName(product.brand)}</span>
            )}
            {selectedProperties.includes('dimensions') && (
              <span>
                {product.dimensions?.height}x{product.dimensions?.width}x
                {product.dimensions?.depth}
              </span>
            )}
            {selectedProperties.includes('weight') && (
              <span>{product.weight}</span>
            )}
            {selectedProperties.includes('variants') && (
              <span>
                {product.variants.map((variant) => variant.color).join(', ')}
              </span>
            )}
            <span>${product.prices[selectedPriceType]?.value || 'N/A'}</span>
          </div>
        ))}
      </div>

      {showPdf && (
        <div className={styles.pdfContainer}>
          <button
            className={styles.cerrar}
            type='button'
            onClick={() => setShowPdf(false)}
          >
            Cerrar vista
          </button>
          <PDFViewer style={{ width: '100%', height: '90vh' }}>
            <PDFDocument
              productList={productList}
              selectedProperties={selectedProperties}
              selectedPriceType={selectedPriceType}
              categories={categories}
              brands={brands}
            />
          </PDFViewer>
        </div>
      )}
    </div>
  );
}

export default PriceList;
