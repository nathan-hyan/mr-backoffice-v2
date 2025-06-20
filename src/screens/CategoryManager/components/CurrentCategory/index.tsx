import { useState } from 'react';
import { ArrowForward, DeleteForeverRounded } from '@mui/icons-material';
import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';
import { Category } from 'types/data';
import { Nullable } from 'vite-env';

import CustomMenu from '~components/CustomMenu';
import DeleteAlert from '~components/DeleteAlert';

interface Props {
  currentCategory: Category;
  removeSubcategory: (arg0: Category[]) => void;
  openModal: () => void;
  openSubSubCategoryModal: (subCategoryId: number) => void;
  handleSelectSubCategory: (internalId: number) => void;
  removeSubSubCategory: (subSubCategoryId: number) => void;
}

function CurrentCategory({
  currentCategory,
  openModal,
  removeSubcategory,
  openSubSubCategoryModal,
  handleSelectSubCategory,
  removeSubSubCategory,
}: Props) {
  const [markedForDelete, setMarkedForDelete] =
    useState<Nullable<number>>(null);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<Nullable<number>>(null);

  const handleDeleteModal = (id: number) => {
    setMarkedForDelete(id);
  };

  const handleClose = () => {
    setMarkedForDelete(null);
  };

  const deleteSubCategory = () => {
    if (!currentCategory.subCategories) return;
    const newArray = currentCategory.subCategories.filter(
      (sub) => sub.internalId !== markedForDelete
    );
    removeSubcategory(newArray);
    handleClose();
  };

  return (
    currentCategory && (
      <>
        <DeleteAlert
          open={Boolean(markedForDelete)}
          onClose={handleClose}
          onDelete={deleteSubCategory}
          stringToMatch={
            markedForDelete
              ? currentCategory.subCategories?.find(
                  ({ internalId }) => internalId === markedForDelete
                )?.name || ''
              : ''
          }
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper elevation={4} sx={{ p: 3 }}>
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
              >
                <Typography variant='button' noWrap>
                  Subcategorías en {currentCategory.name}
                </Typography>
                <CustomMenu>
                  <MenuItem onClick={openModal}>
                    Agregar una sub-categoría
                  </MenuItem>
                </CustomMenu>
              </Box>
              <List
                sx={{
                  mt: 3,
                  maxHeight: '30rem',
                  overflow: 'hidden auto',
                }}
              >
                {currentCategory.subCategories?.length ? (
                  currentCategory.subCategories.map((subCategory) => (
                    <ListItem
                      key={subCategory.internalId}
                      secondaryAction={
                        <IconButton
                          edge='end'
                          color='error'
                          onClick={() => {
                            handleDeleteModal(subCategory.internalId);
                          }}
                        >
                          <DeleteForeverRounded />
                        </IconButton>
                      }
                      onClick={() => {
                        setSelectedSubCategory(subCategory.internalId);
                        handleSelectSubCategory(subCategory.internalId);
                      }}
                      sx={{
                        cursor: 'pointer',
                        backgroundColor:
                          selectedSubCategory === subCategory.internalId
                            ? 'rgba(0, 0, 0, 0.1)'
                            : 'transparent',
                      }}
                    >
                      <ListItemIcon>
                        <ArrowForward />
                      </ListItemIcon>
                      <ListItemText>{subCategory.name}</ListItemText>
                    </ListItem>
                  ))
                ) : (
                  <Typography textAlign='center' sx={{ mt: 2 }}>
                    No se encontraron subcategorías.
                  </Typography>
                )}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper elevation={4} sx={{ p: 3 }}>
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
              >
                <Typography variant='button' noWrap>
                  Sub‑Subcategorías
                </Typography>
                <CustomMenu>
                  <MenuItem
                    onClick={() =>
                      selectedSubCategory
                        ? openSubSubCategoryModal(selectedSubCategory)
                        : null
                    }
                    disabled={!selectedSubCategory}
                  >
                    Agregar sub‑subcategoría
                  </MenuItem>
                </CustomMenu>
              </Box>
              <List
                sx={{
                  mt: 3,
                  maxHeight: '30rem',
                  overflow: 'hidden auto',
                }}
              >
                {currentCategory.subCategories
                  ?.find((sub) => sub.internalId === selectedSubCategory)
                  ?.subSubCategories?.map((subSubCategory) => (
                    <ListItem
                      key={subSubCategory.internalId}
                      secondaryAction={
                        <IconButton
                          edge='end'
                          color='error'
                          onClick={() =>
                            removeSubSubCategory(subSubCategory.internalId)
                          }
                        >
                          <DeleteForeverRounded />
                        </IconButton>
                      }
                    >
                      <ListItemIcon>
                        <ArrowForward />
                      </ListItemIcon>
                      <ListItemText>{subSubCategory.name}</ListItemText>
                    </ListItem>
                  )) || (
                  <Typography textAlign='center' sx={{ mt: 2 }}>
                    No hay sub‑subcategorías cargadas.
                  </Typography>
                )}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </>
    )
  );
}

export default CurrentCategory;
