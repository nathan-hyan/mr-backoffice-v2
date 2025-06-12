import { Control, FieldErrors } from 'react-hook-form';
import {
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { Product } from 'types/data';

import { InputType } from '~components/CustomInput/constants';
import CustomInput from '~components/CustomInput/CustomInput';
import {
  DIMENSIONS_FORM,
  LOCAL_INFO_FORM,
} from '~screens/AddEditProduct/constants';

import styles from './styles.module.scss';

interface Props {
  control: Control<Product, unknown>;
  errors: FieldErrors<Product>;
}

function Dimensions({ control, errors }: Props) {
  // Separa los items
  const [first, second, third] = DIMENSIONS_FORM;

  return (
    <div className={styles.container}>
      <Typography
        sx={{
          mt: 5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#454545',
          fontWeight: 800,
        }}
      >
        Dimensiones
      </Typography>
      <Divider sx={{ my: 2 }} />
      <div className={styles.input}>
        <CustomInput
          key={first.id}
          label={first.label}
          name={`dimensions.${first.name}`}
          type={InputType.Number}
          control={control}
          error={errors.dimensions ? errors.dimensions[first.name] : undefined}
        />
        <CustomInput
          key={second.id}
          label={second.label}
          name={`dimensions.${second.name}`}
          type={InputType.Number}
          control={control}
          error={errors.dimensions ? errors.dimensions[second.name] : undefined}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.inputHalf}>
          <CustomInput
            key={third.id}
            label={third.label}
            name={`dimensions.${third.name}`}
            type={InputType.Number}
            control={control}
            error={
              errors.dimensions ? errors.dimensions[third.name] : undefined
            }
            sx={{ mt: 2 }}
          />
        </div>
        <div className={styles.radioHalf}>
          <FormControl component='fieldset'>
            <RadioGroup row name='dimensionUnit' defaultValue='mm'>
              <FormControlLabel
                value='mm'
                control={
                  <Radio
                    sx={{
                      color: '#9c9c9c',
                      '&.Mui-checked': {
                        color: '#1976d2',
                      },
                    }}
                  />
                }
                label='mm'
              />
              <FormControlLabel
                value='cm'
                control={
                  <Radio
                    sx={{
                      color: '#9c9c9c',
                      '&.Mui-checked': {
                        color: '#1976d2',
                      },
                    }}
                  />
                }
                label='cm'
              />
              <FormControlLabel
                value='mt'
                control={
                  <Radio
                    sx={{
                      color: '#9c9c9c',
                      '&.Mui-checked': {
                        color: '#1976d2',
                      },
                    }}
                  />
                }
                label='mt'
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div>
        {LOCAL_INFO_FORM.map((item) => (
          <div className={styles.row} key={item.id}>
            <div className={styles.inputHalf}>
              <CustomInput
                name={item.name}
                control={control}
                label={item.label}
                type={item.type}
                error={errors[item.name] && errors[item.name]}
              />
            </div>
            <div className={styles.radioHalf}>
              <FormControl component='fieldset'>
                <RadioGroup
                  row
                  name={`unit-${item.name}`}
                  defaultValue='gramos'
                >
                  <FormControlLabel
                    value='gramos'
                    control={
                      <Radio
                        sx={{
                          color: '#9c9c9c',
                          '&.Mui-checked': {
                            color: '#1976d2',
                          },
                        }}
                      />
                    }
                    label='Gramos'
                  />
                  <FormControlLabel
                    value='kilos'
                    control={
                      <Radio
                        sx={{
                          color: '#9c9c9c',
                          '&.Mui-checked': {
                            color: '#1976d2',
                          },
                        }}
                      />
                    }
                    label='Kilos'
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Dimensions;
