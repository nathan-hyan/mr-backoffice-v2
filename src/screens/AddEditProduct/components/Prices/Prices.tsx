/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
import { useEffect } from 'react';
import {
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { Grid, InputAdornment } from '@mui/material';
import { Product } from 'types/data';

import { InputType } from '~components/CustomInput/constants';
import CustomInput from '~components/CustomInput/CustomInput';
import calculateNumberWithPercentage from '~utils/addPercentage';

import styles from './styles.module.scss';

import {
  getOnlinePrices,
  getResellerPrice,
  getRetailPrices,
  getWholesalePrices,
} from './Utils';

interface Props {
  control: Control<Product, unknown>;
  watch: UseFormWatch<Product>;
  setValue: UseFormSetValue<Product>;
  errors: FieldErrors<Product>;
}

function Prices({ control, errors, watch, setValue }: Props) {
  const costoRaw = watch('prices.cost.value');
  const costo = Number(costoRaw);

  // 🔁 Recalcular Retail $ automáticamente cuando cambia el costo o cantidad
  useEffect(() => {
    if (!costo || isNaN(costo)) return;

    getRetailPrices().forEach((item) => {
      const porcentaje = Number(watch(`prices.${item.name}.value`));
      const cantidad = Number(watch(`prices.${item.name}.cantidad`)) || 1;

      if (!isNaN(porcentaje) && cantidad > 0) {
        const unitario = calculateNumberWithPercentage(
          costo,
          porcentaje,
          'incr'
        );
        const total = unitario * cantidad;
        setValue(`prices.${item.name}.retail`, total);
      }
    });
  }, [
    costo,
    watch('prices.retail1.cantidad'),
    watch('prices.retail2.cantidad'),
    watch('prices.retail3.cantidad'),
    watch('prices.retail4.cantidad'),
  ]);

  return (
    <div className={styles.prices}>
      {/* COSTO */}
      <div className={styles.costo}>
        <p>COSTO PRODUCTO</p>
        <CustomInput
          label='Costo'
          name='prices.cost.value'
          type={InputType.Number}
          control={control}
          required
          error={errors.prices?.cost?.value}
          defaultValue={0}
        />
      </div>

      {/* RETAIL */}
      <div className={styles.costo}>
        <p>PRECIO RETAIL</p>
        {getRetailPrices().map((item) => {
          const porcentaje = Number(watch(`prices.${item.name}.value`));
          const cantidad = Number(watch(`prices.${item.name}.cantidad`)) || 1;
          const retailManual = Number(watch(`prices.${item.name}.retail`));

          const unitario =
            !isNaN(costo) && !isNaN(porcentaje)
              ? calculateNumberWithPercentage(costo, porcentaje, 'incr')
              : 0;

          const totalCalculado = unitario * cantidad;
          const retailMostrado = !isNaN(retailManual)
            ? retailManual
            : totalCalculado;

          return (
            <Grid
              container
              spacing={2}
              direction='row'
              alignItems='center'
              key={`retail-row-${item.id}`}
              sx={{ px: 2, mb: 2 }}
            >
              {/* Cantidad */}
              <Grid item xs={4}>
                <CustomInput
                  label='Cantidad'
                  name={`prices.${item.name}.cantidad` as const}
                  type={InputType.Number}
                  control={control}
                  error={errors.prices?.[item.name]?.cantidad}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: 1 }}
                />
              </Grid>

              {/* Retail $ */}
              <Grid item xs={4}>
                <CustomInput
                  label='Retail $'
                  name={`prices.${item.name}.retail`}
                  type={InputType.Number}
                  control={control}
                  value={retailMostrado.toFixed(2)}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const nuevoTotal = Number(e.target.value);
                    if (!isNaN(nuevoTotal) && costo > 0 && cantidad > 0) {
                      const nuevoUnitario = nuevoTotal / cantidad;
                      const nuevoPorcentaje =
                        ((nuevoUnitario - costo) / costo) * 100;
                      setValue(`prices.${item.name}.value`, nuevoPorcentaje);
                      setValue(`prices.${item.name}.retail`, nuevoTotal);
                    }
                  }}
                  inputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>$</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Retail % */}
              <Grid item xs={4}>
                <CustomInput
                  label='Retail %'
                  name={`prices.${item.name}.value`}
                  type={InputType.Number}
                  control={control}
                  error={errors.prices?.[item.name]?.value}
                  inputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>%</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          );
        })}
      </div>

      {/* ONLINE */}
      <div className={styles.costo}>
        <p>PRECIO ONLINE</p>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {getOnlinePrices().map((item, idx) => (
            <>
              <Grid item key={item.id} xs={6}>
                <CustomInput
                  inputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>%</InputAdornment>
                    ),
                  }}
                  label={idx === 0 ? 'Online $' : item.label}
                  name={`prices.${item.name}.value`}
                  type={item.type}
                  control={control}
                  disabled={idx === 0}
                  value={idx === 0 ? '' : undefined}
                  error={
                    errors.prices ? errors.prices[item.name]?.value : undefined
                  }
                />
              </Grid>
              <Grid item key={`${item.id}-editable`} xs={6}>
                <CustomInput
                  inputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>%</InputAdornment>
                    ),
                  }}
                  label={item.label}
                  name={`prices.${item.name}.value`}
                  type={item.type}
                  control={control}
                  error={
                    errors.prices ? errors.prices[item.name]?.value : undefined
                  }
                />
              </Grid>
            </>
          ))}
        </Grid>
      </div>

      {/* MAYORISTAS / REVENDEDORES */}
      <div className={styles.costo}>
        <p>PRECIOS MAYORISTAS/REVENDEDORES</p>
        <Grid container spacing={2} sx={{ mt: 2 }} direction='column'>
          {getWholesalePrices().map((item) => (
            <Grid container item key={item.id} spacing={2}>
              <Grid item xs={6}>
                <CustomInput
                  inputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>%</InputAdornment>
                    ),
                  }}
                  label={item.label2 || item.label}
                  name=''
                  type={item.type}
                  control={control}
                  disabled
                  value=''
                />
              </Grid>

              <Grid item xs={6}>
                <CustomInput
                  inputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>%</InputAdornment>
                    ),
                  }}
                  label={item.label}
                  name={`prices.${item.name}.value`}
                  type={item.type}
                  control={control}
                  error={
                    errors.prices ? errors.prices[item.name]?.value : undefined
                  }
                />
              </Grid>
            </Grid>
          ))}

          {getResellerPrice() && (
            <Grid container item key={getResellerPrice()!.id} spacing={2}>
              <Grid item xs={6}>
                <CustomInput
                  inputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>%</InputAdornment>
                    ),
                  }}
                  label='Reseller $'
                  name=''
                  type={getResellerPrice()!.type}
                  control={control}
                  disabled
                  value=''
                />
              </Grid>

              <Grid item xs={6}>
                <CustomInput
                  inputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>%</InputAdornment>
                    ),
                  }}
                  label={getResellerPrice()!.label}
                  name={`prices.${getResellerPrice()!.name}.value`}
                  type={getResellerPrice()!.type}
                  control={control}
                  error={
                    errors.prices
                      ? errors.prices[getResellerPrice()!.name]?.value
                      : undefined
                  }
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
}

export default Prices;
