import { Fragment, useState } from 'react';
import { ArrowForward } from '@mui/icons-material';
import {
  Box,
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
import { useSuspenseQuery } from '@tanstack/react-query';
import type { Category } from 'types/data';
import { Nullable, StateDispatch } from 'vite-env';

import { CustomMenu, DeleteAlert } from '~components';
import { categoryQuery } from '~services/categories';

import NoCategoryFoundMessage from '../NoCategoryFoundMessage/NoCategoryFoundMessage';
import { styles } from './CategoryList.styles';

interface Props {
  removeDocument: (documentId: string, callback?: (arg0: void) => void) => void;
  selectedCategory: {
    internalId: Nullable<number>;
    firebaseId: string | undefined;
  };
  clearCurrentCategory: StateDispatch<Category>;
  handleSelectCategory: (arg0: number) => void;
  openModal: () => void;
}

function CategoryList({
  removeDocument,
  selectedCategory,
  handleSelectCategory,
  clearCurrentCategory,
  openModal,
}: Props) {
  const { data } = useSuspenseQuery(categoryQuery());

  const [markedForDeletion, setMarkedForDeletion] =
    useState<Nullable<string>>(null);

  const handleDeleteCategory = () => {
    removeDocument(markedForDeletion!, () => {
      clearCurrentCategory(null);
    });
    setMarkedForDeletion(null);
  };

  const toggleAddCategoryModal = () => {
    openModal();
  };

  return (
    <>
      <DeleteAlert
        open={Boolean(markedForDeletion)}
        onClose={() => setMarkedForDeletion(null)}
        onDelete={handleDeleteCategory}
        stringToMatch={
          markedForDeletion
            ? data.filter(({ id }) => id === markedForDeletion)[0].name
            : ''
        }
      />

      <Grid item xs={4}>
        <Paper elevation={2} sx={styles.container}>
          <Box sx={styles.box}>
            <Typography variant='button'>Lista de Categorias</Typography>

            <CustomMenu>
              <MenuItem onClick={toggleAddCategoryModal}>
                Agregar una categoría
              </MenuItem>
              {data.length > 0 && selectedCategory.firebaseId && (
                <MenuItem
                  onClick={() =>
                    setMarkedForDeletion(selectedCategory.firebaseId!)
                  }
                >
                  Quitar una categoría
                </MenuItem>
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
                      <ArrowForward />
                    </ListItemIcon>
                    <ListItemText>{category.name}</ListItemText>
                  </ListItemButton>
                  {index + 1 !== data.length && <Divider />}
                </Fragment>
              ))
            ) : (
              <NoCategoryFoundMessage action={openModal} />
            )}
          </List>
        </Paper>
      </Grid>
    </>
  );
}

export default CategoryList;
