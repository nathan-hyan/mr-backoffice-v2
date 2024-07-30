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

import DeleteAlert from '~components/DeleteAlert/DeleteAlert';
import { useGATag, useModal } from '~hooks';

import type { BrandType } from './BrandManager.hooks';
import useBrandManager from './BrandManager.hooks';
import AddBrandModal from './components/AddBrandModal';
import BrandSearch from './components/BrandSearch';
import BrandTableRow from './components/BrandTableRow';

function BrandManager() {
  useGATag();
  const {
    setMarkedForDeletion,
    handleAddDocument,
    handleChangePage,
    handleChangeRowsPerPage,
    handleDeleteBrand,
    handleUpdateBrand,
    page,
    rowsPerPage,
    markedForDeletion,
    markedForUpdate,
  } = useBrandManager();

  const data = useLoaderData() as BrandType[];
  const [showAddBrandModal, toggleAddBrandModal] = useModal();

  return (
    <>
      <DeleteAlert
        open={Boolean(markedForDeletion)}
        onClose={() => setMarkedForDeletion(null)}
        onDelete={handleDeleteBrand}
        stringToMatch={markedForDeletion ? markedForDeletion.name : ''}
      />
      <AddBrandModal
        show={showAddBrandModal}
        onCancel={toggleAddBrandModal}
        addDocument={handleAddDocument}
        updateDocument={handleUpdateBrand}
        documentToUpdate={markedForUpdate}
      />
      <BrandSearch dataCopy={[]} setData={[]} />
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
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((brand) => (
                <BrandTableRow
                  key={brand?.id}
                  brand={brand}
                  setMarkedForDeletion={setMarkedForDeletion}
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
