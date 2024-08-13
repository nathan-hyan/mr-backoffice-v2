import { useLoaderData } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import {
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Nullable } from 'vite-env';

import { useGATag, useModal } from '~hooks';
import usePagination from '~hooks/usePagination';
import { brandQuery } from '~services/brands';

import { BrandSearch, BrandTableRow } from './components';

function BrandManager() {
  useGATag();

  const { searchTerm } = useLoaderData() as { searchTerm: Nullable<string> };
  const { data: fullData } = useSuspenseQuery(brandQuery({ searchTerm }));
  const [, toggleAddBrandModal] = useModal();

  const { handleChangePage, handleChangeRowsPerPage, page, rowsPerPage, data } =
    usePagination(fullData);

  return (
    <>
      <BrandSearch />
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align='left'>Id Interno</TableCell>

              <TableCell width='80%'>Marca</TableCell>

              <TableCell align='right' />
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((brand) => (
              <BrandTableRow
                key={brand?.id}
                brand={brand}
                setMarkedForDeletion={() => {}}
                toggleModal={toggleAddBrandModal}
              />
            ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          colSpan={3}
          count={data.length}
          component='div'
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <Divider />

        <Button
          variant='contained'
          sx={{ m: 2 }}
          startIcon={<Add />}
          onClick={toggleAddBrandModal}
        >
          Agregar una marca
        </Button>
      </TableContainer>
    </>
  );
}
export default BrandManager;
