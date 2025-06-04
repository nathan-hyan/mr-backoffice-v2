import React from 'react';
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';

import logo from '../../../assets/LOGO MR.png';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
  },
  header: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 12,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    paddingVertical: 3,
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'left',
    fontSize: 9,
    paddingHorizontal: 2,
  },
  cellHeader: {
    flex: 1,
    textAlign: 'left',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 2,
    marginBottom: 8,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
    alignSelf: 'center',
  },
});

interface TopProduct {
  name: string;
  sold: number;
}

interface Analytics {
  total: number;
  totalCost: number;
  profit: number;
  totalSalesCount: number;
  byDepartment: Record<string, number>;
  byCategory: Record<string, number>;
  bySubcategory: Record<string, number>;
  topProducts: TopProduct[];
}

interface AnalyticsPDFProps {
  analytics: Analytics;
  period: string;
  selectedDate: Date | null;
  allDepartments: { id: string; name: string }[];
  allCategories: { id: string; name: string }[];
  allSubCategories: { id: string; name: string }[];
}

function formatCurrency(value: number) {
  return `$${value?.toLocaleString('es-AR') || '0'}`;
}

function AnalyticsPDF(props: AnalyticsPDFProps) {
  const {
    analytics,
    period,
    selectedDate,
    allDepartments,
    allCategories,
    allSubCategories,
  } = props;

  return (
    <Document>
      <Page style={styles.page}>
        <Image src={logo} style={styles.logo} />
        <Text style={styles.header}>Reporte de Ventas</Text>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>
          Periodo: {period} - Fecha:{' '}
          {selectedDate ? selectedDate.toLocaleDateString() : ''}
        </Text>

        <View style={styles.section}>
          <Text style={styles.cellHeader}>Resumen</Text>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.cellHeader}>Total Ventas</Text>
              <Text style={styles.cellHeader}>Costo Total</Text>
              <Text style={styles.cellHeader}>Ganancia Estimada</Text>
              <Text style={styles.cellHeader}>Cantidad de Ventas</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cell}>{formatCurrency(analytics.total)}</Text>
              <Text style={styles.cell}>
                {formatCurrency(analytics.totalCost)}
              </Text>
              <Text style={styles.cell}>
                {formatCurrency(analytics.profit)}
              </Text>
              <Text style={styles.cell}>{analytics.totalSalesCount}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.cellHeader}>Desglose por Departamento</Text>
          <View style={styles.table}>
            {allDepartments.map((dept) => (
              <View style={styles.row} key={dept.id}>
                <Text style={styles.cell}>{dept.name}</Text>
                <Text style={styles.cell}>
                  {formatCurrency(analytics.byDepartment[dept.id] || 0)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.cellHeader}>Desglose por Categoría</Text>
          <View style={styles.table}>
            {allCategories.map((cat) => (
              <View style={styles.row} key={cat.id}>
                <Text style={styles.cell}>{cat.name}</Text>
                <Text style={styles.cell}>
                  {formatCurrency(analytics.byCategory[cat.id] || 0)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.cellHeader}>Desglose por Subcategoría</Text>
          <View style={styles.table}>
            {allSubCategories.map((subcat) => (
              <View style={styles.row} key={subcat.id}>
                <Text style={styles.cell}>{subcat.name}</Text>
                <Text style={styles.cell}>
                  {formatCurrency(analytics.bySubcategory[subcat.id] || 0)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.cellHeader}>Top 10 productos más vendidos</Text>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.cellHeader}>Producto</Text>
              <Text style={styles.cellHeader}>Cantidad Vendida</Text>
            </View>
            {analytics.topProducts.map((p: TopProduct) => (
              <View style={styles.row} key={p.name}>
                <Text style={styles.cell}>{p.name}</Text>
                <Text style={styles.cell}>{p.sold}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default AnalyticsPDF;
