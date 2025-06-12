import React from 'react';
import { Control, FieldErrors, UseFormWatch } from 'react-hook-form';
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
  errors: FieldErrors<Product>;
}

function Prices({ control, errors, watch }: Props) {
  return (
    <div className={styles.prices}>
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
      <div className={styles.costo}>
        <p>PRECIO RETAIL</p>
        <Grid
          container
          spacing={2}
          sx={{ mt: 2 }}
          direction='row'
          wrap='nowrap'
        >
          {getRetailPrices().map((item) => (
            <React.Fragment key={item.id}>
              <Grid item key={`cantidad-${item.id}`}>
                <CustomInput
                  label='Cantidad'
                  name={`prices.${item.name}.cantidad`}
                  type={InputType.Number}
                  control={control}
                  error={errors.prices?.[item.name]?.cantidad}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: 0 }}
                />
              </Grid>

              <Grid item key={`valor-${item.id}`}>
                <CustomInput
                  label='Retail $'
                  name=''
                  type={InputType.Number}
                  control={control}
                  disabled
                  value={calculateNumberWithPercentage(
                    watch('prices.cost.value'),
                    watch(`prices.${item.name}.value`),
                    'incr'
                  ).toFixed(2)}
                  inputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>$</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item key={`retail-${item.id}`}>
                <CustomInput
                  inputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>%</InputAdornment>
                    ),
                  }}
                  label='Retail %'
                  name={`prices.${item.name}.value`}
                  type={InputType.Number}
                  control={control}
                  error={errors.prices?.[item.name]?.value}
                />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>

        {[1, 2, 3].map((row) => (
          <Grid
            container
            spacing={2}
            sx={{ mt: 2 }}
            direction='row'
            wrap='nowrap'
            key={`mock-row-${row}`}
          >
            {getRetailPrices().map((item) => (
              <React.Fragment key={`${item.id}-${row}`}>
                <Grid item key={`cantidad-mock-${item.id}-${row}`}>
                  <CustomInput
                    label='Cantidad'
                    name=''
                    type={InputType.Number}
                    control={control}
                    disabled
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                {/* Valor $ */}
                <Grid item key={`valor-mock-${item.id}-${row}`}>
                  <CustomInput
                    label='Retail $'
                    name=''
                    type={InputType.Number}
                    control={control}
                    disabled
                    value={calculateNumberWithPercentage(
                      watch('prices.cost.value'),
                      0, // Puedes ajustar el valor mock si lo necesitas
                      'incr'
                    ).toFixed(2)}
                    inputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>$</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {/* Retail % */}
                <Grid item key={`retail-mock-${item.id}-${row}`}>
                  <CustomInput
                    inputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>%</InputAdornment>
                      ),
                    }}
                    label='Retail %'
                    name=''
                    type={InputType.Number}
                    control={control}
                    disabled
                  />
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        ))}
      </div>

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
              <Grid item key={item.id} xs={6}>
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
