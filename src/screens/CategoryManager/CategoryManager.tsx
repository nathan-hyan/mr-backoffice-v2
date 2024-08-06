import { Outlet } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';

import useModal from '~hooks/useModal';

import { AddCategory, AddSubCategory, CategoryList } from './components';

function CategoryManager() {
  const [showAddCategoryModal, toggleAddCategoryModal] = useModal();
  const [showAddSubCategoryModal, toggleAddSubCategoryModal] = useModal();

  // const addSubcategory = (newData: Category) => {
  //   if (
  //     currentCategory &&
  //     selectedCategory.subCategories &&
  //     newData.subCategories
  //   ) {
  //     const latestId = getLatestInternalId(selectedCategory.subCategories);

  //     const dataWithInternalId: Category[] = [];

  //     newData.subCategories.forEach((item, index) => {
  //       dataWithInternalId.push({
  //         name: item.name,
  //         internalId: latestId + index + 1,
  //       });
  //     });

  //     updateDocument(selectedCategory.id!, {
  //       ...selectedCategory,
  //       id: selectedCategory.id!,
  //       subCategories: [
  //         ...selectedCategory.subCategories,
  //         ...dataWithInternalId,
  //       ],
  //     });
  //   }
  // };

  // const removeSubCategory = (newArray: Category[]) => {
  //   updateDocument(selectedCategory.id!, {
  //     ...selectedCategory,
  //     id: selectedCategory.id!,
  //     subCategories: newArray,
  //   });
  // };

  return (
    <>
      <AddCategory
        show={showAddCategoryModal}
        handleClose={toggleAddCategoryModal}
      />

      <AddSubCategory
        show={showAddSubCategoryModal}
        handleClose={toggleAddSubCategoryModal}
        isLoading={false}
        addSubcategory={() => {}}
      />

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <CategoryList
            removeDocument={() => {}}
            clearCurrentCategory={() => {}}
            openModal={toggleAddCategoryModal}
          />

          <Outlet />
        </Grid>
      </Paper>
    </>
  );
}
export default CategoryManager;
