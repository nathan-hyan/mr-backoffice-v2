import { Outlet } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';

import useModal from '~hooks/useModal';

import { AddSubCategory, CategoryList } from './components';

function CategoryManager() {
  const [showAddSubCategoryModal, toggleAddSubCategoryModal] = useModal();

  return (
    <>
      <AddSubCategory
        show={showAddSubCategoryModal}
        handleClose={toggleAddSubCategoryModal}
        isLoading={false}
        addSubcategory={() => {}}
      />

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <CategoryList />

          <Outlet />
        </Grid>
      </Paper>
    </>
  );
}
export default CategoryManager;
