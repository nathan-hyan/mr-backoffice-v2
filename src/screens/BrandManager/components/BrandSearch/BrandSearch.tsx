import { Form } from 'react-router-dom';
import { Paper, TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { CustomInputAdornment } from '~screens/ProductList/components/SearchBox/components';

function BrandSearch() {
  const queryClient = useQueryClient();

  return (
    <Paper sx={{ p: 3 }}>
      <Form
        method='get'
        action='/brandManager'
        onSubmit={() => queryClient.invalidateQueries({ queryKey: ['brands'] })}
      >
        <TextField
          name='q'
          id='standard-basic'
          label='Buscar un producto (Dejar vacío para ver todos)...'
          variant='standard'
          fullWidth
          InputProps={{
            endAdornment: <CustomInputAdornment />,
          }}
        />
      </Form>
    </Paper>
  );
}
export default BrandSearch;
