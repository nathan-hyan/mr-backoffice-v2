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

import DeleteAlert from '~components/DeleteAlert';
import useGATag from '~hooks/useGATag';

import useBrandManager from './BrandManager.hooks';
import AddBrandModal from './components/AddBrandModal';
import BrandSearch from './components/BrandSearch';
import BrandTableRow from './components/BrandTableRow';

function BrandManager() {
  const {
    setData,
    setMarkedForDeletion,
    handleAddDocument,
    handleChangePage,
    handleChangeRowsPerPage,
    handleDeleteBrand,
    handleUpdateBrand,
    toggleModal,
    showModal,
    data,
    dataCopy,
    page,
    rowsPerPage,
    markedForDeletion,
    markedForUpdate,
  } = useBrandManager();
  useGATag();

  return (
    <>
      <DeleteAlert
        open={Boolean(markedForDeletion)}
        onClose={() => setMarkedForDeletion(null)}
        onDelete={handleDeleteBrand}
        stringToMatch={markedForDeletion ? markedForDeletion.name : ''}
      />
      <AddBrandModal
        show={showModal}
        onCancel={toggleModal}
        addDocument={handleAddDocument}
        updateDocument={handleUpdateBrand}
        documentToUpdate={markedForUpdate}
      />
      <BrandSearch dataCopy={dataCopy} setData={setData} />
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
                  toggleModal={toggleModal}
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
          onClick={() => toggleModal()}
        >
          Agregar una marca
        </Button>
      </TableContainer>
    </>
  );
}
export default BrandManager;
