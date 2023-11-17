import { ChangeEvent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Add,
  ArrowForward,
  DeleteOutline,
  Edit,
  HighlightOff,
} from '@mui/icons-material';
import {
  Button,
  Divider,
  IconButton,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import { Brand } from 'types/data';
import { Nullable } from 'vite-env';

import CustomMenu from '~components/CustomMenu';
import DeleteAlert from '~components/DeleteAlert';
import { FirestoreCollections } from '~constants/firebase';
import useFirestore from '~hooks/useFirestore';
import useGATag from '~hooks/useGATag';
import getLatestInternalId from '~utils/getLatestInternalId';

import AddBrandModal from './components/AddBrandModal';

type BrandType = Nullable<Brand & { id: string }>;

function BrandManager() {
  useGATag();
  const [markedForDeletion, setMarkedForDeletion] = useState<BrandType>(null);
  const [markedForUpdate, setMarkedForUpdate] = useState<BrandType>(null);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<BrandType[]>([]);
  const [dataCopy, setDataCopy] = useState<BrandType[]>([]);
  const [latestId, setLatestId] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<{ name: string }>({
    defaultValues: { name: '' },
    mode: 'onSubmit',
  });

  const { addDocument, removeDocument, updateDocument, subscribeToData } =
    useFirestore<Brand>(FirestoreCollections.Brands);

  const toggleModal = (documentToEdit?: BrandType) => {
    setShowModal((prevState) => !prevState);

    if (documentToEdit) {
      setMarkedForUpdate(documentToEdit);
    } else {
      setMarkedForUpdate(null);
    }
  };

  const handleAddDocument = (newData: { name: string }) => {
    addDocument({ ...newData, internalId: latestId + 1 });
  };

  const handleDeleteBrand = () => {
    if (!markedForDeletion) {
      return;
    }

    removeDocument(markedForDeletion.id);
    setMarkedForDeletion(null);
  };

  const handleUpdateBrand = (newName: string) => {
    if (!markedForUpdate) {
      return;
    }

    updateDocument(markedForUpdate.id, {
      ...markedForUpdate,
      name: newName,
    });

    setMarkedForUpdate(null);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const performSearch = (criteria: { name: string }) => {
    const newData = dataCopy.filter(
      (currentBrand) =>
        currentBrand?.name
          .toLowerCase()
          .includes(criteria.name.toLocaleLowerCase())
    );

    setData(newData);
  };

  const handleClearSearch = () => {
    reset();
    setData(dataCopy);
  };

  useEffect(() => {
    const unsubscribe = subscribeToData((response) => {
      setData(response);
      setDataCopy(response);
      setLatestId(getLatestInternalId(response));
    });

    return () => {
      unsubscribe();
    };
  }, [subscribeToData]);

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
      <Paper sx={{ p: 3 }}>
        <form noValidate onSubmit={handleSubmit(performSearch)}>
          <Controller
            name='name'
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Este campo es obligatorio',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label='Buscar una marca'
                required
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                fullWidth
                variant='outlined'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton color='warning' onClick={handleClearSearch}>
                        <HighlightOff />
                      </IconButton>
                      <IconButton color='primary' type='submit'>
                        <ArrowForward />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </form>
      </Paper>
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
                <TableRow key={brand?.id}>
                  <TableCell align='left'>{brand?.internalId}</TableCell>
                  <TableCell width='80%'>{brand?.name}</TableCell>
                  <TableCell align='right'>
                    <CustomMenu>
                      <MenuItem onClick={() => toggleModal(brand)}>
                        <ListItemIcon>
                          <Edit />
                        </ListItemIcon>
                        <ListItemText>Modificar</ListItemText>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setMarkedForDeletion(brand || null);
                        }}
                      >
                        <ListItemIcon>
                          <DeleteOutline />
                        </ListItemIcon>
                        <ListItemText>Eliminar Producto</ListItemText>
                      </MenuItem>
                    </CustomMenu>
                  </TableCell>
                </TableRow>
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
