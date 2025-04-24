/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { Brand, Category, Product } from 'types/data';

import logo from '../../../assets/LOGO MR.png';

interface PDFDocumentProps {
  productList: Product[];
  selectedProperties: string[];
  selectedPriceType: string;
  categories: Category[];
  brands: Brand[];
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
  },
  header: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    paddingVertical: 3,
    alignItems: 'center',
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 8,
    fontWeight: 'bold',
    paddingHorizontal: 1,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 8,
    paddingHorizontal: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 10,
    alignSelf: 'center',
  },
});

function PDFDocument({
  productList,
  selectedProperties,
  selectedPriceType,
  categories,
  brands,
}: PDFDocumentProps) {
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

  const headerColumns = ['Nombre'];
  if (selectedProperties.includes('stock')) headerColumns.push('Stock');
  if (selectedProperties.includes('category')) headerColumns.push('Categoría');
  if (selectedProperties.includes('subCategory'))
    headerColumns.push('Subcategoría');
  if (selectedProperties.includes('subSubCategories'))
    headerColumns.push('Subsubcategorías');
  if (selectedProperties.includes('brand')) headerColumns.push('Marca');
  if (selectedProperties.includes('dimensions'))
    headerColumns.push('Dimensiones');
  if (selectedProperties.includes('weight')) headerColumns.push('Peso');
  if (selectedProperties.includes('variants')) headerColumns.push('Variantes');
  headerColumns.push('Precio');

  return (
    <Document>
      <Page style={styles.page}>
        <Image src={logo} style={styles.logo} />
        <Text style={styles.header}>Lista de Precios</Text>
        <View style={styles.table}>
          {/* Encabezado */}
          <View style={styles.row}>
            {headerColumns.map((col, index) => (
              <Text key={index} style={styles.headerCell}>
                {col}
              </Text>
            ))}
          </View>

          {productList.map((product, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              <Text style={styles.cell} numberOfLines={2}>
                {product.name}
              </Text>
              {selectedProperties.includes('stock') && (
                <Text style={styles.cell}>{product.stock.current}</Text>
              )}
              {selectedProperties.includes('category') && (
                <Text style={styles.cell}>
                  {getCategoryName(product.category)}
                </Text>
              )}
              {selectedProperties.includes('subCategory') && (
                <Text style={styles.cell} numberOfLines={2}>
                  {getSubCategoryName(
                    product.category,
                    Number(product.subCategory)
                  )}
                </Text>
              )}
              {selectedProperties.includes('subSubCategories') && (
                <Text style={styles.cell} numberOfLines={2}>
                  {getSubSubCategoryName(
                    product.category,
                    Number(product.subCategory),
                    Number(product.subSubCategories)
                  )}
                </Text>
              )}
              {selectedProperties.includes('brand') && (
                <Text style={styles.cell} numberOfLines={2}>
                  {getBrandName(product.brand)}
                </Text>
              )}
              {selectedProperties.includes('dimensions') && (
                <Text style={styles.cell}>
                  {product.dimensions?.height}x{product.dimensions?.width}x
                  {product.dimensions?.depth}
                </Text>
              )}
              {selectedProperties.includes('weight') && (
                <Text style={styles.cell}>{product.weight}</Text>
              )}
              {selectedProperties.includes('variants') && (
                <Text style={styles.cell} numberOfLines={2}>
                  {product.variants.map((variant) => variant.color).join(', ')}
                </Text>
              )}
              <Text style={styles.cell}>
                ${product.prices[selectedPriceType]?.value || 'N/A'}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export default PDFDocument;
