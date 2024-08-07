import { useLoaderData, useSubmit } from 'react-router-dom';
import { ArrowForward, DeleteForeverRounded } from '@mui/icons-material';
import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { Category } from 'types/data';

import { categoryQuery } from '~services/categories';

import NoCategoryFoundMessage from '../NoCategoryFoundMessage/NoCategoryFoundMessage';
import { CustomMenu } from './components';
import { styles } from './CurrentCategory.styles';

function CurrentCategory() {
  const { id } = useLoaderData() as { id: string };
  const submit = useSubmit();
  const { data } = useSuspenseQuery(categoryQuery(id)) as { data: Category };

  const handleDeleteCat = (subcategory?: number) => {
    const result = window.prompt(
      `¿Estás seguro de que quieres eliminar esta ${subcategory ? 'sub-' : ''}categoría?\nSi es así, escriba "OK" para continuar.\n\n`
    );

    if (result?.toUpperCase() === 'OK') {
      submit(null, {
        method: 'delete',
        action: `/categoryManager/deleteCategory/${id}${subcategory ? `?sc=${subcategory}` : ''}`,
      });
    }
  };

  const subCategoryExist = data.subCategories?.length;

  return (
    <>
      <Grid item xs={8}>
        <Paper elevation={4} sx={styles.paperContainer}>
          <Box sx={styles.boxContainer}>
            <Typography variant='button' noWrap>
              Subcategorias disponibles en: {data.name}
            </Typography>

            <CustomMenu onDeleteCategory={handleDeleteCat} />
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
                        handleDeleteCat(Number(category.internalId));
                      }}
                    >
                      <DeleteForeverRounded />
                    </IconButton>
                  }
                  key={String(category.internalId) + String(index)}
                >
                  <ListItemIcon>
                    <ArrowForward />
                  </ListItemIcon>

                  <ListItemText>{category.name}</ListItemText>
                </ListItem>
              ))
            ) : (
              <NoCategoryFoundMessage />
            )}
          </List>
        </Paper>
      </Grid>
    </>
  );
}

export default CurrentCategory;
