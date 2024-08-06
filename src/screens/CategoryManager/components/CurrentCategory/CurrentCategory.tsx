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
import type { Category } from 'types/data';
import { Nullable } from 'vite-env';

import { CustomMenu, DeleteAlert } from '~components';

import NoCategoryFoundMessage from '../NoCategoryFoundMessage/NoCategoryFoundMessage';
import { styles } from './CurrentCategory.styles';

interface Props {
  currentCategory: Category;
  removeSubcategory: (arg0: Category[]) => void;
  openModal: () => void;
}

function CurrentCategory({
  currentCategory,
  openModal,
  removeSubcategory,
}: Props) {
  const [markedForDelete, setMarkedForDelete] =
    useState<Nullable<number>>(null);

  const handleDeleteModal = (id: number) => {
    setMarkedForDelete(id);
  };

  const handleClose = () => {
    setMarkedForDelete(null);
  };

  const deleteSubCategory = () => {
    let newArray: typeof currentCategory.subCategories = [];
    const idToDelete = currentCategory.subCategories?.filter(
      ({ internalId }) => internalId === markedForDelete
    )[0].internalId;

    if (currentCategory.subCategories) {
      newArray = currentCategory.subCategories.filter(
        ({ internalId }) => internalId !== idToDelete
      );
    }

    removeSubcategory(newArray);
    handleClose();
  };

  const subCategoryExist = currentCategory.subCategories?.length;

  return (
    currentCategory && (
      <>
        <DeleteAlert
          open={Boolean(markedForDelete)}
          onClose={handleClose}
          onDelete={deleteSubCategory}
          stringToMatch={
            markedForDelete
              ? currentCategory.subCategories?.filter(
                  ({ internalId }) => internalId === markedForDelete
                )[0].name || ''
              : ''
          }
        />
        <Grid item xs={8}>
          <Paper elevation={4} sx={styles.paperContainer}>
            <Box sx={styles.boxContainer}>
              <Typography variant='button' noWrap>
                Subcategorias disponibles en {currentCategory.name}
              </Typography>

              <CustomMenu>
                <MenuItem onClick={openModal}>
                  Agregar una sub-categoría
                </MenuItem>
              </CustomMenu>
            </Box>

            <List sx={styles.list}>
              {subCategoryExist ? (
                currentCategory.subCategories?.map((category, index) => (
                  <ListItem
                    divider={
                      index + 1 !== currentCategory.subCategories!.length
                    }
                    secondaryAction={
                      <IconButton
                        edge='end'
                        color='error'
                        onClick={() => {
                          handleDeleteModal(category.internalId);
                        }}
                      >
                        <DeleteForeverRounded />
                      </IconButton>
                    }
                    key={category.internalId}
                  >
                    <ListItemIcon>
                      <ArrowForward />
                    </ListItemIcon>

                    <ListItemText>{category.name}</ListItemText>
                  </ListItem>
                ))
              ) : (
                <NoCategoryFoundMessage action={openModal} />
              )}
            </List>
          </Paper>
        </Grid>
      </>
    )
  );
}
export default CurrentCategory;
