import { Fragment } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Add, ArrowForward } from '@mui/icons-material';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { Category } from 'types/data';

import useModal from '~hooks/useModal';
import { categoryQuery } from '~services/categories';

import AddCategory from '../AddCategory/AddCategory';
import NoCategoryFoundMessage from '../NoCategoryFoundMessage/NoCategoryFoundMessage';
import { styles } from './CategoryList.styles';

function CategoryList() {
  const { id } = useLoaderData() as { id: string };
  const { data } = useSuspenseQuery(categoryQuery(id)) as { data: Category[] };
  const [showAddCategoryModal, toggleAddCategoryModal] = useModal();

  const navigate = useNavigate();

  return (
    <>
      <AddCategory
        show={showAddCategoryModal}
        handleClose={toggleAddCategoryModal}
      />

      <Grid item xs={4}>
        <Paper elevation={2} sx={styles.container}>
          <Box sx={styles.box}>
            <Typography variant='button'>Lista de Categorias</Typography>

            <IconButton edge='end' onClick={toggleAddCategoryModal}>
              <Add />
            </IconButton>
          </Box>

          <List>
            {data.length > 0 ? (
              data.map((category, index) => (
                <Fragment key={category.internalId}>
                  <ListItemButton
                    selected={category.internalId === Number(id)}
                    onClick={() =>
                      navigate(`/categoryManager/${category.internalId}`)
                    }
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
              <NoCategoryFoundMessage />
            )}
          </List>
        </Paper>
      </Grid>
    </>
  );
}

export default CategoryList;
