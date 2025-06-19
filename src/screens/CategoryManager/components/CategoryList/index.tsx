import { Fragment, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';
import { Category } from 'types/data';
import { Nullable, StateDispatch } from 'vite-env';

import CustomMenu from '~components/CustomMenu';

import DeleteAlert from '../../../../components/DeleteAlert';

interface Props {
  removeDocument: (documentId: string, callback?: (arg0: void) => void) => void;
  data: Category[];
  selectedCategory: {
    internalId: Nullable<number>;
    firebaseId: string | undefined;
  };
  clearCurrentCategory: StateDispatch<Category>;
  handleSelectCategory: (internalId: number) => void;
  openModal: (category?: Category) => void;
}

function CategoryList({
  removeDocument,
  data,
  selectedCategory,
  handleSelectCategory,
  clearCurrentCategory,
  openModal,
}: Props) {
  const [markedForDeletion, setMarkedForDeletion] =
    useState<Nullable<string>>(null);

  const handleDeleteCategory = () => {
    if (markedForDeletion) {
      removeDocument(markedForDeletion, () => {
        clearCurrentCategory(null);
      });
    }
    setMarkedForDeletion(null);
  };

  const handleEditCategory = (category: Category) => {
    openModal(category);
  };

  return (
    <>
      <DeleteAlert
        open={Boolean(markedForDeletion)}
        onClose={() => setMarkedForDeletion(null)}
        onDelete={handleDeleteCategory}
        stringToMatch={
          markedForDeletion
            ? data.find(({ id }) => id === markedForDeletion)?.name || ''
            : ''
        }
      />
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography variant='button'>Lista de Categorías</Typography>
            <CustomMenu>
              <MenuItem onClick={() => openModal()}>
                Agregar una categoría
              </MenuItem>
              {data.length > 0 && selectedCategory.firebaseId && (
                <>
                  <MenuItem
                    onClick={() =>
                      handleEditCategory(
                        data.find(
                          ({ id }) => id === selectedCategory.firebaseId
                        )!
                      )
                    }
                  >
                    Modificar categoría
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      setMarkedForDeletion(selectedCategory.firebaseId!)
                    }
                  >
                    Quitar categoría
                  </MenuItem>
                </>
              )}
            </CustomMenu>
          </Box>
          <List>
            {data.length > 0 ? (
              data.map((category, index) => (
                <Fragment key={category.internalId}>
                  <ListItemButton
                    selected={
                      category.internalId === selectedCategory.internalId
                    }
                    onClick={() => handleSelectCategory(category.internalId)}
                  >
                    <ListItemIcon>
                      {/* Agregamos el avatar para la imagen en miniatura */}
                      <Avatar
                        src={category.imageURL || undefined}
                        sx={{ width: 32, height: 32, mr: 1 }}
                      />
                    </ListItemIcon>
                    <ListItemText>{category.name}</ListItemText>
                  </ListItemButton>
                  {index + 1 !== data.length && <Divider />}
                </Fragment>
              ))
            ) : (
              <>
                <ListItemText sx={{ textAlign: 'center', mb: 3 }}>
                  No se encontraron categorías
                </ListItemText>
                <ListItemText sx={{ textAlign: 'center' }}>
                  <Button variant='contained' onClick={() => openModal()}>
                    Agregar una categoría
                  </Button>
                </ListItemText>
              </>
            )}
          </List>
        </Paper>
      </Grid>
    </>
  );
}

export default CategoryList;
