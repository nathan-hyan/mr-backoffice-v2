/* eslint-disable no-nested-ternary */
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

import { getResellerPrice, getRetailPrices, getWholesalePrices } from './Utils';

interface Props {
  control: Control<Product, unknown>;
  watch: UseFormWatch<Product>;
  setValue: UseFormSetValue<Product>;
  errors: FieldErrors<Product>;
}

function Prices({ control, watch, setValue, errors }: Props) {
  const costoRaw = watch('prices.cost.value');
  const costo = Number(costoRaw);

  const onlinePercentRaw = watch('prices.online.value');
  const onlinePercent = Number(onlinePercentRaw);
  const onlineRetailRaw = watch('prices.online.retail');
  const onlineRetail = Number(onlineRetailRaw);

  useEffect(() => {
    if (isNaN(costo)) return;

    getRetailPrices().forEach((item) => {
      const pct = Number(watch(`prices.${item.name}.value`));
      const qty = Number(watch(`prices.${item.name}.cantidad`)) || 1;

      if (!isNaN(pct) && qty > 0) {
        const unit = calculateNumberWithPercentage(costo, pct, 'incr');
        setValue(`prices.${item.name}.retail`, unit * qty);
      }
    });
  }, [
    costo,
    watch('prices.retail1.cantidad'),
    watch('prices.retail2.cantidad'),
    watch('prices.retail3.cantidad'),
    watch('prices.retail4.cantidad'),
  ]);

  useEffect(() => {
    if (isNaN(costo) || isNaN(onlinePercent)) return;
    const unit = calculateNumberWithPercentage(costo, onlinePercent, 'incr');
    setValue('prices.online.retail', unit);
  }, [costo, onlinePercent]);

  useEffect(() => {
    if (!costo || isNaN(costo)) return;

    const items = [...getWholesalePrices(), getResellerPrice()].filter(Boolean);
    items.forEach((item) => {
      const pct = Number(watch(`prices.${item.name}.value`));
      if (!isNaN(pct)) {
        const precio = calculateNumberWithPercentage(costo, pct, 'incr');
        setValue(`prices.${item.name}.retail`, precio);
      }
    });
  }, [
    costo,
    ...getWholesalePrices().map((item) => watch(`prices.${item.name}.value`)),
    watch(`prices.${getResellerPrice()?.name}.value`),
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
          const pct = Number(watch(`prices.${item.name}.value`));
          const qty = Number(watch(`prices.${item.name}.cantidad`)) || 1;
          const retailRaw = watch(`prices.${item.name}.retail`);
          const retail = Number(retailRaw);

          const unit =
            !isNaN(costo) && !isNaN(pct)
              ? calculateNumberWithPercentage(costo, pct, 'incr')
              : 0;
          const calcTotal = unit * qty;
          const display = !isNaN(retail) ? retail : calcTotal;

          return (
            <Grid
              container
              spacing={2}
              alignItems='center'
              key={item.id}
              sx={{ px: 2, mb: 2 }}
            >
              {/* Cantidad */}
              <Grid item xs={4}>
                <CustomInput
                  label='Cantidad'
                  name={`prices.${item.name}.cantidad`}
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
                  label={item.label2 || 'Retail $'}
                  name={`prices.${item.name}.retail`}
                  type={InputType.Number}
                  control={control}
                  value={display.toFixed(2)}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (!isNaN(val) && costo > 0 && qty > 0) {
                      const unitPrice = val / qty;
                      const newPct = ((unitPrice - costo) / costo) * 100;
                      setValue(`prices.${item.name}.value`, newPct);
                      setValue(`prices.${item.name}.retail`, val);
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
                  label={item.label || 'Retail %'}
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
          <Grid item xs={6}>
            <CustomInput
              label='Online $'
              name='prices.online.retail'
              type={InputType.Number}
              control={control}
              value={!isNaN(onlineRetail) ? onlineRetail.toFixed(2) : ''}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (!isNaN(val) && costo > 0) {
                  const newPct = ((val - costo) / costo) * 100;
                  setValue('prices.online.value', newPct);
                  setValue('prices.online.retail', val);
                }
              }}
              inputProps={{
                startAdornment: (
                  <InputAdornment position='start'>$</InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomInput
              label='Online %'
              name='prices.online.value'
              type={InputType.Number}
              control={control}
              error={errors.prices?.online?.value}
              inputProps={{
                startAdornment: (
                  <InputAdornment position='start'>%</InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </div>

      {/* MAYORISTAS / REVENDEDORES */}
      <div className={styles.costo}>
        <p>PRECIOS MAYORISTAS/REVENDEDORES</p>
        <Grid container spacing={2} sx={{ mt: 2 }} direction='column'>
          {[...getWholesalePrices(), getResellerPrice()]
            .filter(Boolean)
            .map((item) => {
              const pct = Number(watch(`prices.${item.name}.value`));
              const retail = Number(watch(`prices.${item.name}.retail`));
              const display = !isNaN(retail)
                ? retail
                : !isNaN(pct) && !isNaN(costo)
                  ? calculateNumberWithPercentage(costo, pct, 'incr')
                  : 0;

              return (
                <Grid container item key={item.id} spacing={2}>
                  <Grid item xs={6}>
                    <CustomInput
                      label={item.label || 'Mayorista $'}
                      name={`prices.${item.name}.retail`}
                      type={InputType.Number}
                      control={control}
                      value={display.toFixed(2)}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (!isNaN(val) && costo > 0) {
                          const nuevoPct = ((val - costo) / costo) * 100;
                          setValue(`prices.${item.name}.value`, nuevoPct);
                          setValue(`prices.${item.name}.retail`, val);
                        }
                      }}
                      inputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>$</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <CustomInput
                      label={item.label || 'Mayorista $'}
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
        </Grid>
      </div>
    </div>
  );
}

export default Prices;
