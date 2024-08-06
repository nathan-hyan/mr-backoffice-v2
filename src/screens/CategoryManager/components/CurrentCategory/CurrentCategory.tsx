import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
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
import { useSuspenseQuery } from '@tanstack/react-query';
import type { Category } from 'types/data';
import { Nullable } from 'vite-env';

import { CustomMenu, DeleteAlert } from '~components';
import { categoryQuery } from '~services/categories';

import NoCategoryFoundMessage from '../NoCategoryFoundMessage/NoCategoryFoundMessage';
import { styles } from './CurrentCategory.styles';

interface Props {
  removeSubcategory: (arg0: Category[]) => void;
  openModal: () => void;
}

function CurrentCategory({ openModal, removeSubcategory }: Props) {
  const { id } = useLoaderData() as { id: string };
  const { data } = useSuspenseQuery(categoryQuery(id)) as { data: Category };

  const [markedForDelete, setMarkedForDelete] =
    useState<Nullable<number>>(null);

  const handleDeleteModal = (id: number) => {
    setMarkedForDelete(id);
  };

  const handleClose = () => {
    setMarkedForDelete(null);
  };

  const deleteSubCategory = () => {
    let newArray: typeof data.subCategories = [];
    const idToDelete = data.subCategories?.filter(
      ({ internalId }) => internalId === markedForDelete
    )[0].internalId;

    if (data.subCategories) {
      newArray = data.subCategories.filter(
        ({ internalId }) => internalId !== idToDelete
      );
    }

    removeSubcategory(newArray);
    handleClose();
  };

  const subCategoryExist = data.subCategories?.length;

  return (
    data && (
      <>
        <DeleteAlert
          open={Boolean(markedForDelete)}
          onClose={handleClose}
          onDelete={deleteSubCategory}
          stringToMatch={
            markedForDelete
              ? data.subCategories?.filter(
                  ({ internalId }) => internalId === markedForDelete
                )[0].name || ''
              : ''
          }
        />

        <Grid item xs={8}>
          <Paper elevation={4} sx={styles.paperContainer}>
            <Box sx={styles.boxContainer}>
              <Typography variant='button' noWrap>
                Subcategorias disponibles en: {data.name}
              </Typography>

              <CustomMenu>
                <MenuItem onClick={openModal}>
                  Agregar una sub-categoría
                </MenuItem>
              </CustomMenu>
            </Box>

            <List sx={styles.list}>
              {subCategoryExist ? (
                data.subCategories?.map((category, index) => (
                  <ListItem
                    divider={index + 1 !== data.subCategories!.length}
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
