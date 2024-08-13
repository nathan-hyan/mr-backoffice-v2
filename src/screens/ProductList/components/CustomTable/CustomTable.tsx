import { useLoaderData, useNavigate } from 'react-router-dom';
import { AddRounded } from '@mui/icons-material';
import {
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
} from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Product } from 'types/data';

import usePagination from '~hooks/usePagination';
import { ProductQuery, productQuery } from '~services/products';

import { Row } from './components';

function CustomTable() {
  const navigate = useNavigate();

  const { searchCriteria, searchTerm, sortBy } =
    useLoaderData() as ProductQuery;
  const { data: productData } = useSuspenseQuery(
    productQuery({
      searchCriteria,
      searchTerm,
      sortBy,
    })
  ) as { data: Product[] };

  const {
    data: paginatedData,
    handleChangePage,
    handleChangeRowsPerPage,
    page,
    rowsPerPage,
  } = usePagination(productData);

  return (
    <TableContainer component={Paper} sx={{ mb: 3 }}>
      <Table stickyHeader>
        <TableHead>
          <Row header='show' />
        </TableHead>
        {paginatedData ? (
          <TableBody>
            {paginatedData.map((product) => (
              <Row
                header='hidden'
                data={product}
                key={product.id + product.internalId}
              />
            ))}
          </TableBody>
        ) : null}
      </Table>
      <TablePagination
        rowsPerPageOptions={[3, 5, 10, 25]}
        component='div'
        count={productData?.length || -1}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Divider />
      <Button
        variant='contained'
        sx={{ m: 2 }}
        startIcon={<AddRounded />}
        onClick={() => {
          navigate('/add');
        }}
      >
        Agregar producto
      </Button>
    </TableContainer>
  );
}

export default CustomTable;
