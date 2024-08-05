import { Form } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  TextField,
} from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';

import { productQuery } from '~services/products';

function UserFeedbackTesting() {
  const { data } = useSuspenseQuery(
    productQuery({
      searchCriteria: 'name',
      searchTerm: null,
      sortBy: 'name',
    })
  );

  const arrayData = Array.isArray(data) ? data : [data];

  return (
    <>
      <Form action='/uft/add' method='post'>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel id='product'>Producto</InputLabel>
            <Select
              labelId='product'
              id='product'
              label='Producto'
              name='productId'
            >
              {arrayData.map(({ name, id }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id='comment'
            multiline
            label='Comment'
            variant='filled'
            name='comment'
          />
          <Rating name='rating' />
          <Button variant='contained' type='submit'>
            Enviar
          </Button>
        </Box>
      </Form>
    </>
  );
}
export default UserFeedbackTesting;
