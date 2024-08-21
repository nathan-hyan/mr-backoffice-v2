import { Control, Controller } from 'react-hook-form';
import {
  Autocomplete,
  Box,
  Divider,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import type { Product } from 'types/data';

import CustomSelect from '~components/CustomSelect/CustomSelect';

import { ControlPanelValues, TAG_VARIANTS } from '../constants';

interface Props {
  control: Control<ControlPanelValues, unknown>;
  generatorType: ControlPanelValues['generatorType'];
  fetchLoading: boolean;
  productList: Product[];
}

function ControlPanel({
  control,
  fetchLoading,
  productList,
  generatorType,
}: Props) {
  return (
    <>
      <Box
        display='flex'
        gap={3}
        justifyContent='space-between'
        alignItems='center'
      >
        <CustomSelect
          sx={{
            width: '50%',
          }}
          control={control}
          name='variant'
          label='Color'
          data={TAG_VARIANTS}
        />

        <FormGroup>
          <FormControlLabel
            control={
              <Controller
                control={control}
                name='showPrices'
                render={({ field }) => (
                  <Switch {...field} checked={field.value} />
                )}
              />
            }
            label='Mostrar precios'
          />
        </FormGroup>

        <Controller
          name='generatorType'
          control={control}
          render={({ field }) => (
            <ToggleButtonGroup color='primary' exclusive {...field}>
              <ToggleButton value='all'>Todos los productos</ToggleButton>
              <ToggleButton value='individual'>
                Productos individuales
              </ToggleButton>
            </ToggleButtonGroup>
          )}
        />
      </Box>

      {generatorType === 'individual' ? (
        <>
          <Divider />
          <Controller
            name='individualProducts'
            control={control}
            render={({ field }) => {
              return (
                <Autocomplete
                  {...field}
                  onChange={(_e, data) => field.onChange(data)}
                  multiple
                  options={productList}
                  getOptionLabel={(product) => product.name}
                  isOptionEqualToValue={(opt, value) => {
                    return JSON.stringify(opt) === JSON.stringify(value);
                  }}
                  loading={fetchLoading}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        variant='standard'
                        label='Productos para incluir'
                      />
                    );
                  }}
                />
              );
            }}
          />
        </>
      ) : null}
    </>
  );
}
export default ControlPanel;
