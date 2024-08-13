import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import {
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Nullable } from 'vite-env';

import { useGATag, useModal } from '~hooks';
import usePagination from '~hooks/usePagination';
import { brandQuery } from '~services/brands';

import { styles } from './BrandManager.styles';
import {
  AddBrandModal,
  BrandSearch,
  BrandTableRow,
  TableHeader,
} from './components';

function BrandManager() {
  useGATag();

  const { searchTerm } = useLoaderData() as { searchTerm: Nullable<string> };
  const { data: fullData } = useSuspenseQuery(brandQuery({ searchTerm }));
  const [addBrandModal, toggleAddBrandModal] = useModal();
  const [brandToEdit, setBrandToEdit] = useState<string | undefined>(undefined);

  const { handleChangePage, handleChangeRowsPerPage, page, rowsPerPage, data } =
    usePagination(fullData);

  const handleModifyBrand = (id?: string) => {
    setBrandToEdit(id);
    toggleAddBrandModal();
  };

  return (
    <>
      <AddBrandModal
        show={addBrandModal}
        onClose={toggleAddBrandModal}
        brandId={brandToEdit}
      />

      <BrandSearch />

      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table stickyHeader>
          <TableHeader />

          <TableBody>
            {data.map((brand) => (
              <BrandTableRow
                key={brand?.id}
                brand={brand}
                onModify={handleModifyBrand}
              />
            ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          colSpan={3}
          count={fullData.length || -1}
          component='div'
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <Divider />

        <Button
          variant='contained'
          sx={styles.addBrandButton}
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
