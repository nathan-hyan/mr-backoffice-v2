import { ChangeEvent, useState } from 'react';
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
import type { Product } from 'types/data';

import { GACategories, GATypes } from '~constants/gaTagTypes';
import { useGATag } from '~hooks';

import Row from './components/Row';

function CustomTable() {
  const navigate = useNavigate();
  const { tagAction } = useGATag(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const data = useLoaderData() as Product[];

  const handleChangePage = (_event: unknown, newPage: number) => {
    tagAction(GACategories.Event, GATypes.Click, `Changed to page ${newPage}`);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    tagAction(
      GACategories.Event,
      GATypes.Click,
      `Changed rows per page to ${+event.target.value}`
    );
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <TableContainer component={Paper} sx={{ mb: 3 }}>
      <Table stickyHeader>
        <TableHead>
          <Row header='show' />
        </TableHead>
        {data ? (
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => (
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
        count={data?.length || -1}
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
