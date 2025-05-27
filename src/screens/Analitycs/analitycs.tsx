import { useState } from 'react';
import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { useProducts } from '~contexts/Products';
import { useVentasAnalytics } from '~hooks/useVentasAnalitycs';

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
    const found = categories
      .map((cat) =>
        cat.subCategories?.find(
          (s) => s.internalId?.toString() === id?.toString()
        )
      )
      .find((sub) => !!sub);
    return found ? found.name : id;
  };

  const getSubCategoryName = (id: string) => {
    const found = categories
      .flatMap((cat) => cat.subCategories || [])
      .map((sub) =>
        sub.subSubCategories?.find(
          (ss) => ss.internalId?.toString() === id?.toString()
        )
      )
      .find((subsub) => !!subsub);
    return found ? found.name : id;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        Reportes de Ventas
      </Typography>

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

          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant='h6'>Desglose por Departamento</Typography>
            <ul>
              {Object.entries(analytics.byDepartment).map(([id, total]) => (
                <li key={id}>
                  {getDepartmentName(id)}: ${total.toLocaleString()}
                </li>
              ))}
            </ul>
            <Typography variant='h6'>Desglose por Categoría</Typography>
            <ul>
              {Object.entries(analytics.byCategory).map(([id, total]) => (
                <li key={id}>
                  {getCategoryName(id)}: ${total.toLocaleString()}
                </li>
              ))}
            </ul>
            <Typography variant='h6'>Desglose por Subcategoría</Typography>
            <ul>
              {Object.entries(analytics.bySubcategory).map(([id, total]) => (
                <li key={id}>
                  {getSubCategoryName(id)}: ${total.toLocaleString()}
                </li>
              ))}
            </ul>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant='h6'>Top 10 productos más vendidos</Typography>
            <ol>
              {analytics.topProducts.map((p) => (
                <li key={p.name}>
                  {p.name} - {p.sold} vendidos
                </li>
              ))}
            </ol>
          </Paper>
        </>
      )}
    </Box>
  );
}

export default AnalyticsScreen;
