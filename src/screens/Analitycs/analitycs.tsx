import { useState } from 'react';
import { Box, Button, Paper, Tab, Tabs, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { BlobProviderParams, PDFDownloadLink } from '@react-pdf/renderer';

import { useProducts } from '~contexts/Products';
import { useVentasAnalytics } from '~hooks/useVentasAnalitycs';

import AnalyticsPDF from './AnaliticsPDF/AnaliticsPDF';

function AnalyticsScreen() {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { productList, categories } = useProducts();
  const { analytics, loading } = useVentasAnalytics(
    period,
    productList,
    selectedDate
  );

  const handleChangePeriod = (
    _: React.SyntheticEvent,
    value: 'daily' | 'weekly' | 'monthly'
  ) => {
    setPeriod(value);
  };

  const getDepartmentName = (id: string) => {
    const dept = categories.find((c) => c.id?.toString() === id?.toString());
    return dept ? dept.name : id;
  };

  const getCategoryName = (id: string) => {
    const sub = categories
      .flatMap((cat) => cat.subCategories || [])
      .find((s) => s.internalId?.toString() === id?.toString());
    return sub ? sub.name : id;
  };

  const getSubCategoryName = (id: string) => {
    const subsub = categories
      .flatMap((cat) => cat.subCategories || [])
      .flatMap((sub) => sub.subSubCategories || [])
      .find((ss) => ss.internalId?.toString() === id?.toString());
    return subsub ? subsub.name : id;
  };

  const allDepartments = categories
    .filter((c) => c.id !== undefined && c.id !== null)
    .map((c) => ({
      id: c.id!.toString(),
      name: c.name,
    }));

  const allCategories = categories.flatMap((cat) =>
    (cat.subCategories || [])
      .filter((sub) => sub.internalId !== undefined && sub.internalId !== null)
      .map((sub) => ({
        id: sub.internalId!.toString(),
        name: sub.name,
      }))
  );

  const allSubCategories = categories.flatMap((cat) =>
    (cat.subCategories || []).flatMap((sub) =>
      (sub.subSubCategories || [])
        .filter((ss) => ss.internalId !== undefined && ss.internalId !== null)
        .map((ss) => ({
          id: ss.internalId!.toString(),
          name: ss.name,
        }))
    )
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography variant='h4' gutterBottom>
          Reportes de Ventas
        </Typography>
        {!loading && analytics && (
          <PDFDownloadLink
            document={
              <AnalyticsPDF
                analytics={analytics}
                period={period}
                selectedDate={selectedDate}
                getDepartmentName={getDepartmentName}
                getCategoryName={getCategoryName}
                getSubCategoryName={getSubCategoryName}
                allDepartments={allDepartments}
                allCategories={allCategories}
                allSubCategories={allSubCategories}
              />
            }
            fileName='reporte-ventas.pdf'
          >
            {({ loading: pdfLoading }: BlobProviderParams) =>
              pdfLoading ? (
                <span style={{ textDecoration: 'none' }}>
                  <Button variant='outlined' disabled>
                    Generando PDF...
                  </Button>
                </span>
              ) : (
                <span style={{ textDecoration: 'none' }}>
                  <Button variant='contained' color='primary'>
                    Descargar reporte PDF
                  </Button>
                </span>
              )
            }
          </PDFDownloadLink>
        )}
      </Box>

      <Paper sx={{ mb: 2 }}>
        <Tabs
          value={period}
          onChange={handleChangePeriod}
          indicatorColor='primary'
          textColor='primary'
        >
          <Tab label='Diario' value='daily' />
          <Tab label='Semanal' value='weekly' />
          <Tab label='Mensual' value='monthly' />
        </Tabs>
      </Paper>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {period === 'daily' && (
          <DatePicker
            label='Seleccionar día'
            value={selectedDate}
            onChange={setSelectedDate}
            format='dd/MM/yyyy'
            slotProps={{ textField: { sx: { mb: 2 } } }}
          />
        )}
        {period === 'weekly' && (
          <DatePicker
            label='Seleccionar día de la semana'
            value={selectedDate}
            onChange={setSelectedDate}
            format='dd/MM/yyyy'
            slotProps={{ textField: { sx: { mb: 2 } } }}
            views={['day']}
          />
        )}
        {period === 'monthly' && (
          <DatePicker
            label='Seleccionar mes'
            value={selectedDate}
            onChange={setSelectedDate}
            format='MM/yyyy'
            slotProps={{ textField: { sx: { mb: 2 } } }}
            views={['year', 'month']}
          />
        )}
      </LocalizationProvider>

      {loading || !analytics ? (
        <Typography variant='body1'>Cargando...</Typography>
      ) : (
        <>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Paper sx={{ p: 2, flex: 1 }}>
              <Typography variant='h6'>Total Ventas</Typography>
              <Typography variant='h5'>
                ${analytics.total.toLocaleString()}
              </Typography>
            </Paper>
            <Paper sx={{ p: 2, flex: 1 }}>
              <Typography variant='h6'>Costo Total</Typography>
              <Typography variant='h5'>
                ${analytics.totalCost.toLocaleString()}
              </Typography>
            </Paper>
            <Paper sx={{ p: 2, flex: 1 }}>
              <Typography variant='h6'>Ganancia Estimada</Typography>
              <Typography variant='h5'>
                ${analytics.profit.toLocaleString()}
              </Typography>
            </Paper>
            <Paper sx={{ p: 2, flex: 1 }}>
              <Typography variant='h6'>Cantidad de Ventas</Typography>
              <Typography variant='h5'>{analytics.totalSalesCount}</Typography>
            </Paper>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Paper sx={{ p: 2, flex: 1, maxHeight: 300, overflowY: 'auto' }}>
              <Typography variant='h6'>Desglose por Departamento</Typography>
              <ul>
                {allDepartments.map((dept) => (
                  <li key={dept.id}>
                    {dept.name}: $
                    {dept.id && analytics.byDepartment[dept.id]
                      ? analytics.byDepartment[dept.id].toLocaleString()
                      : '0'}
                  </li>
                ))}
              </ul>
            </Paper>
            <Paper sx={{ p: 2, flex: 1, maxHeight: 300, overflowY: 'auto' }}>
              <Typography variant='h6'>Desglose por Categoría</Typography>
              <ul>
                {allCategories.map((cat) => (
                  <li key={cat.id}>
                    {cat.name}: $
                    {analytics.byCategory[cat.id]
                      ? analytics.byCategory[cat.id].toLocaleString()
                      : '0'}
                  </li>
                ))}
              </ul>
            </Paper>
            <Paper sx={{ p: 2, flex: 1, maxHeight: 300, overflowY: 'auto' }}>
              <Typography variant='h6'>Desglose por Subcategoría</Typography>
              <ul>
                {allSubCategories.map((subcat) => (
                  <li key={subcat.id}>
                    {subcat.name}: $
                    {analytics.bySubcategory[subcat.id]
                      ? analytics.bySubcategory[subcat.id].toLocaleString()
                      : '0'}
                  </li>
                ))}
              </ul>
            </Paper>
            <Paper sx={{ p: 2, flex: 1, maxHeight: 300, overflowY: 'auto' }}>
              <Typography variant='h6'>
                Top 10 productos más vendidos
              </Typography>
              <ol>
                {analytics.topProducts.map((p) => (
                  <li key={p.name}>
                    {p.name} - {p.sold} vendidos
                  </li>
                ))}
              </ol>
            </Paper>
          </Box>
        </>
      )}
    </Box>
  );
}

export default AnalyticsScreen;
