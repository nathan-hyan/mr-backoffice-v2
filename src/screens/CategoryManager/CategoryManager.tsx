import { useEffect, useState } from 'react';
import { Grid, Paper } from '@mui/material';
import { Category } from 'types/data';
import { Nullable } from 'vite-env';

import { FirestoreCollections } from '~constants/firebase';
import useFirestore from '~hooks/useFirestore';
import getLatestInternalId from '~utils/getLatestInternalId';

import AddCategory from './components/AddCategory';
import AddSubCategory from './components/AddSubCategory';
import AddSubSubCategory from './components/AddSubSubCategory';
import CategoryList from './components/CategoryList';
import CurrentCategory from './components/CurrentCategory';

function CategoryManager() {
  const {
    subscribeToData,
    removeDocument,
    addDocument,
    updateDocument,
    creatingLoading,
  } = useFirestore<Category>(FirestoreCollections.Categories);

  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddSubCategoryModal, setShowAddSubCategoryModal] = useState(false);
  const [showAddSubSubCategoryModal, setShowAddSubSubCategoryModal] =
    useState(false);

  const [data, setData] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] =
    useState<Nullable<number>>(null);
  const [currentSubCategory, setCurrentSubCategory] =
    useState<Nullable<number>>(null);

  const handleSelectCategory = (internalId: number) => {
    setCurrentCategory(internalId);
    setCurrentSubCategory(null);
  };

  const handleSelectSubCategory = (internalId: number) => {
    setCurrentSubCategory(internalId);
  };

  const toggleModals =
    (modalToToggle: 'addCategory' | 'addSubCategory' | 'addSubSubCategory') =>
    () => {
      if (modalToToggle === 'addCategory') {
        setShowAddCategoryModal((prevState) => !prevState);
      }

      if (modalToToggle === 'addSubCategory') {
        setShowAddSubCategoryModal((prevState) => !prevState);
      }

      if (modalToToggle === 'addSubSubCategory') {
        setShowAddSubSubCategoryModal((prevState) => !prevState);
      }
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

  const selectedSubCategory = selectedCategory?.subCategories?.filter(
    (subCategory) => currentSubCategory === subCategory.internalId
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

  const addSubSubCategory = (newData: { name: string }[]) => {
    if (currentCategory && currentSubCategory && selectedSubCategory) {
      const latestId = getLatestInternalId(
        selectedSubCategory.subSubCategories || []
      );

      const dataWithInternalId = newData.map((item, index) => ({
        name: item.name,
        internalId: latestId + index + 1,
      }));

      const updatedSubCategories = (selectedCategory.subCategories ?? []).map(
        (sub) =>
          sub.internalId === currentSubCategory
            ? {
                ...sub,
                subSubCategories: [
                  ...(sub.subSubCategories || []),
                  ...dataWithInternalId,
                ],
              }
            : sub
      );

      if (selectedCategory.id) {
        updateDocument(selectedCategory.id, {
          ...selectedCategory,
          subCategories: updatedSubCategories,
        });
      }
    }
  };

  const removeSubCategory = (newArray: Category[]) => {
    updateDocument(selectedCategory.id!, {
      ...selectedCategory,
      id: selectedCategory.id!,
      subCategories: newArray,
    });
  };
  const removeSubSubCategory = (subSubCategoryId: number) => {
    if (currentCategory && currentSubCategory && selectedSubCategory) {
      const updatedSubSubCategories =
        selectedSubCategory.subSubCategories?.filter(
          (subSub) => subSub.internalId !== subSubCategoryId
        );

      const updatedSubCategories = (selectedCategory.subCategories ?? []).map(
        (sub) =>
          sub.internalId === currentSubCategory
            ? {
                ...sub,
                subSubCategories: updatedSubSubCategories,
              }
            : sub
      );

      if (selectedCategory.id) {
        updateDocument(selectedCategory.id, {
          ...selectedCategory,
          subCategories: updatedSubCategories,
        });
      }
    }
  };

  useEffect(() => {
    const unsubscribe = subscribeToData((response) => {
      setData(response);
    });

    return () => {
      unsubscribe();
    };
  }, [subscribeToData]);

  return (
    <>
      <AddCategory
        show={showAddCategoryModal}
        handleClose={toggleModals('addCategory')}
        submitCategory={addCategory}
        isLoading={creatingLoading}
      />

      <AddSubCategory
        show={showAddSubCategoryModal}
        handleClose={toggleModals('addSubCategory')}
        isLoading={creatingLoading}
        addSubcategory={addSubcategory}
      />

      <AddSubSubCategory
        show={showAddSubSubCategoryModal}
        handleClose={toggleModals('addSubSubCategory')}
        isLoading={creatingLoading}
        addSubSubCategory={addSubSubCategory}
      />

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CategoryList
              removeDocument={removeDocument}
              clearCurrentCategory={setCurrentCategory}
              data={data}
              selectedCategory={{
                internalId: currentCategory,
                firebaseId: selectedCategory?.id,
              }}
              handleSelectCategory={handleSelectCategory}
              openModal={toggleModals('addCategory')}
            />
          </Grid>

          {currentCategory && (
            <Grid item xs={8}>
              <CurrentCategory
                currentCategory={selectedCategory}
                openModal={toggleModals('addSubCategory')}
                removeSubcategory={removeSubCategory}
                handleSelectSubCategory={handleSelectSubCategory}
                openSubSubCategoryModal={toggleModals('addSubSubCategory')}
                removeSubSubCategory={removeSubSubCategory}
              />
            </Grid>
          )}
        </Grid>
      </Paper>
    </>
  );
}
export default CategoryManager;
