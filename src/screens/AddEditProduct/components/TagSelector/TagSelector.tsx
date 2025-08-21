/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
} from 'react-hook-form';
import { DeleteForeverRounded } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { Product } from 'types/data';

import { useTags } from '~contexts/Tags';

import styles from './styles.module.scss';

interface Props {
  control: Control<Product, unknown>;
  errors: FieldErrors<Product>;
}

function TagSelector({ control, errors }: Props) {
  const { tags, fetchTags } = useTags();

  useEffect(() => {
    fetchTags();
  }, []);

  const {
    fields: tagFields,
    remove: tagRemove,
    append: tagAppend,
  } = useFieldArray({ control, name: 'tag' });

  return (
    <div className={styles.container}>
      <Typography
        sx={{
          mt: 5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#454545',
          paddingBottom: '5px',
        }}
        fontWeight='bold'
      >
        Tags
        <button
          className={styles.addButton}
          type='button'
          onClick={() => tagAppend('')}
        >
          Agregar
        </button>
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {tagFields.length > 0 ? (
        tagFields.map((item, index) => (
          <Box
            key={item.id}
            sx={{
              gap: 2,
              display: 'flex',
              alignItems: 'center',
              paddingBottom: 3,
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Controller
                control={control}
                name={`tag.${index}`}
                render={({ field }) => (
                  <Autocomplete
                    freeSolo
                    options={tags.map((tag) => ({ label: tag }))}
                    getOptionLabel={(option) => option.label || ''}
                    onChange={(_, value) => {
                      const tag = value?.label?.trim();
                      if (tag) field.onChange(tag);
                    }}
                    value={field.value ? { label: field.value } : null}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={`Tag ${index + 1}`}
                        variant='outlined'
                        sx={{
                          height: 42,
                          '& .MuiOutlinedInput-root': {
                            height: 42,
                            '& fieldset': {
                              borderColor: '#454545',
                            },
                            '&:hover fieldset': {
                              borderColor: '#454545',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#454545',
                            },
                          },
                          '& .MuiInputBase-input': {
                            height: '42px',
                            padding: '0 8px',
                            display: 'flex',
                            alignItems: 'center',
                            color: '#454545',
                          },
                          '& .MuiInputLabel-root': {
                            color: '#454545',
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#454545',
                          },
                          '& .MuiAutocomplete-popupIndicator': {
                            color: '#454545',
                          },
                        }}
                        error={Boolean(errors.tag?.[index])}
                        helperText={errors.tag?.[index]?.message}
                      />
                    )}
                  />
                )}
              />
            </Box>

            <IconButton
              size='small'
              color='error'
              sx={{ width: '40px', height: '40px' }}
              onClick={() => tagRemove(index)}
            >
              <DeleteForeverRounded />
            </IconButton>
          </Box>
        ))
      ) : (
        <Typography
          textAlign='center'
          fontStyle='italic'
          color='InactiveCaptionText'
        >
          No hay tags asignados, presioná Agregar para comenzar.
        </Typography>
      )}
    </div>
  );
}

export default TagSelector;
