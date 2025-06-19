/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Grid, Paper } from '@mui/material';
import { Category, Department } from 'types/data';
import { Nullable } from 'vite-env';

import { FirestoreCollections } from '~constants/firebase';
import useFirestore from '~hooks/useFirestore';
import getLatestInternalId from '~utils/getLatestInternalId';

import AddCategory from './components/AddCategory';
import AddDepartment from './components/AddDepartment/AddDepartment';
import DepartmentList from './components/AddDepartment/departmentList';
import AddSubCategory from './components/AddSubCategory';
import AddSubSubCategory from './components/AddSubSubCategory';
import CategoryList from './components/CategoryList';
import CurrentCategory from './components/CurrentCategory';

function CategoryManager() {
  const {
    subscribeToData: subscribeToDepartments,
    addDocument: addDepartment,
    updateDocument: updateDepartment,
    removeDocument: removeDepartment,
    creatingLoading: creatingDepartmentLoading,
  } = useFirestore<Department>(FirestoreCollections.Departments);

  const {
    subscribeToData,
    removeDocument,
    addDocument,
    updateDocument,
    creatingLoading: creatingCategoryLoading,
  } = useFirestore<Category>(FirestoreCollections.Categories);

  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Nullable<Department>>(null);

  const [showAddDepartmentModal, setShowAddDepartmentModal] = useState(false);
  const [departmentToEdit, setDepartmentToEdit] =
    useState<Nullable<Department>>(null);

  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] =
    useState<Nullable<Category>>(null);

  const [showAddSubCategoryModal, setShowAddSubCategoryModal] = useState(false);
  const [showAddSubSubCategoryModal, setShowAddSubSubCategoryModal] =
    useState(false);

  const [data, setData] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] =
    useState<Nullable<number>>(null);
  const [currentSubCategory, setCurrentSubCategory] =
    useState<Nullable<number>>(null);

  useEffect(() => {
    const unsubscribe = subscribeToDepartments((response) => {
      setDepartments(response);
      if (!selectedDepartment && response.length > 0) {
        setSelectedDepartment(response[0]);
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line
  }, [subscribeToDepartments]);

  useEffect(() => {
    const unsubscribe = subscribeToData((response) => {
      setData(response);
    });
    return () => unsubscribe();
  }, [subscribeToData]);

  const handleSelectDepartment = (department: Department) => {
    setSelectedDepartment(department);
    setCurrentCategory(null);
    setCurrentSubCategory(null);
  };

  const handleSelectCategory = (internalId: number) => {
    setCurrentCategory(internalId);
    setCurrentSubCategory(null);
  };

  const handleSelectSubCategory = (internalId: number) => {
    setCurrentSubCategory(internalId);
  };

  const openDepartmentModal = (dep?: Department) => {
    if (dep) {
      setDepartmentToEdit(dep);
    } else {
      setDepartmentToEdit(null);
    }
    setShowAddDepartmentModal(true);
  };

  const closeDepartmentModal = () => {
    setShowAddDepartmentModal(false);
    setDepartmentToEdit(null);
  };

  const openCategoryModal = (cat?: Category) => {
    if (cat) {
      setCategoryToEdit(cat);
    } else {
      setCategoryToEdit(null);
    }
    setShowAddCategoryModal(true);
  };

  const closeCategoryModal = () => {
    setShowAddCategoryModal(false);
    setCategoryToEdit(null);
  };

  const handleSubmitCategory = (newData: Category) => {
    if (!selectedDepartment) return;

    if (categoryToEdit) {
      updateDocument(categoryToEdit.id!, {
        ...categoryToEdit,
        ...newData,
      });
    } else {
      const newInternalId = getLatestInternalId(data) + 1;
      addDocument({
        ...newData,
        internalId: newInternalId,
        departmentId: selectedDepartment.internalId,
      });
    }
  };

  const addSubcategory = (newData: Category) => {
    if (currentCategory && selectedDepartment) {
      const selectedCategory = data.find(
        (category) => category.internalId === currentCategory
      );
      if (
        selectedCategory &&
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
          subCategories: [
            ...selectedCategory.subCategories,
            ...dataWithInternalId,
          ],
        });
      }
    }
  };

  return (
    <>
      <AddDepartment
        show={showAddDepartmentModal}
        handleClose={closeDepartmentModal}
        submitDepartment={(dep) => {
          if (departmentToEdit) {
            updateDepartment(departmentToEdit.id!, {
              ...departmentToEdit,
              ...dep,
            });
          } else {
            const newDep = {
              ...dep,
              internalId: getLatestInternalId(departments) + 1,
              categories: [],
            };
            addDepartment(newDep);
          }
        }}
        isLoading={creatingDepartmentLoading}
        initialData={departmentToEdit || undefined}
      />
      <AddCategory
        show={showAddCategoryModal}
        handleClose={closeCategoryModal}
        submitCategory={handleSubmitCategory}
        isLoading={creatingCategoryLoading}
        initialData={categoryToEdit || undefined}
      />
      <AddSubCategory
        show={showAddSubCategoryModal}
        handleClose={() => setShowAddSubCategoryModal((prev) => !prev)}
        isLoading={creatingCategoryLoading}
        addSubcategory={addSubcategory}
      />
      <AddSubSubCategory
        show={showAddSubSubCategoryModal}
        handleClose={() => setShowAddSubSubCategoryModal((prev) => !prev)}
        isLoading={creatingCategoryLoading}
        addSubSubCategory={() => {}}
      />
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <DepartmentList
              data={departments}
              selectedDepartment={selectedDepartment}
              handleSelectDepartment={handleSelectDepartment}
              openModal={openDepartmentModal}
              removeDepartment={removeDepartment}
            />
          </Grid>
          <Grid item xs={3}>
            <CategoryList
              removeDocument={removeDocument}
              clearCurrentCategory={setCurrentCategory}
              data={data.filter(
                (cat) => cat.departmentId === selectedDepartment?.internalId
              )}
              selectedCategory={{
                internalId: currentCategory,
                firebaseId: data.find(
                  (cat) => cat.internalId === currentCategory
                )?.id,
              }}
              handleSelectCategory={handleSelectCategory}
              openModal={openCategoryModal}
            />
          </Grid>
          {currentCategory && (
            <Grid item xs={6}>
              <CurrentCategory
                currentCategory={data.find(
                  (cat) => cat.internalId === currentCategory
                )}
                openModal={() => {}}
                removeSubcategory={() => {}}
                handleSelectSubCategory={handleSelectSubCategory}
                openSubSubCategoryModal={() => {}}
                removeSubSubCategory={() => {}}
              />
            </Grid>
          )}
        </Grid>
      </Paper>
    </>
  );
}

export default CategoryManager;
