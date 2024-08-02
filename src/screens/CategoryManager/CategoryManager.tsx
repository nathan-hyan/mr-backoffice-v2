import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import type { Category } from 'types/data';
import { Nullable } from 'vite-env';

import { FirestoreCollections } from '~constants/firebase';
import { useFirestore, useModal } from '~hooks';
import { getLatestInternalId } from '~utils';

import {
  AddCategory,
  AddSubCategory,
  CategoryList,
  CurrentCategory,
} from './components';

function CategoryManager() {
  const { removeDocument, addDocument, updateDocument, creatingLoading } =
    useFirestore<Category>(FirestoreCollections.Categories);

  const data = useLoaderData() as Category[];
  const [showAddCategoryModal, toggleAddCategoryModal] = useModal();
  const [showAddSubCategoryModal, toggleAddSubCategoryModal] = useModal();
  const [currentCategory, setCurrentCategory] =
    useState<Nullable<number>>(null);

  const handleSelectCategory = (internalId: number) => {
    setCurrentCategory(internalId);
  };

  const addCategory = (newData: Category) => {
    const newInternalId = getLatestInternalId(data) + 1;

    const subCategoriesWithInternalId: Category[] = [];

    newData.subCategories?.forEach((item, index) => {
      subCategoriesWithInternalId.push({
        name: item.name,
        internalId: index + 1,
      });
    });

    addDocument({
      ...newData,
      subCategories: subCategoriesWithInternalId,
      internalId: newInternalId,
    });
  };

  const selectedCategory = data.filter(
    (category) => currentCategory === category.internalId
  )[0];

  const addSubcategory = (newData: Category) => {
    if (
      currentCategory &&
      selectedCategory.subCategories &&
      newData.subCategories
    ) {
      const latestId = getLatestInternalId(selectedCategory.subCategories);

      const dataWithInternalId: Category[] = [];

      newData.subCategories.forEach((item, index) => {
        dataWithInternalId.push({
          name: item.name,
          internalId: latestId + index + 1,
        });
      });

      updateDocument(selectedCategory.id!, {
        ...selectedCategory,
        id: selectedCategory.id!,
        subCategories: [
          ...selectedCategory.subCategories,
          ...dataWithInternalId,
        ],
      });
    }
  };

  const removeSubCategory = (newArray: Category[]) => {
    updateDocument(selectedCategory.id!, {
      ...selectedCategory,
      id: selectedCategory.id!,
      subCategories: newArray,
    });
  };

  return (
    <>
      <AddCategory
        show={showAddCategoryModal}
        handleClose={toggleAddCategoryModal}
        submitCategory={addCategory}
        isLoading={creatingLoading}
      />

      <AddSubCategory
        show={showAddSubCategoryModal}
        handleClose={toggleAddSubCategoryModal}
        isLoading={creatingLoading}
        addSubcategory={addSubcategory}
      />

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <CategoryList
            removeDocument={removeDocument}
            clearCurrentCategory={setCurrentCategory}
            data={data}
            selectedCategory={{
              internalId: currentCategory,
              firebaseId: selectedCategory?.id,
            }}
            handleSelectCategory={handleSelectCategory}
            openModal={toggleAddCategoryModal}
          />

          {currentCategory && (
            <CurrentCategory
              currentCategory={selectedCategory}
              openModal={toggleAddSubCategoryModal}
              removeSubcategory={removeSubCategory}
            />
          )}
        </Grid>
      </Paper>
    </>
  );
}
export default CategoryManager;
