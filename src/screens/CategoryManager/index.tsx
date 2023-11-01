import { useEffect, useState } from 'react';
import { Grid, Paper } from '@mui/material';
import { Category } from 'types/data';
import { Nullable } from 'vite-env';

import AddCategory from './components/AddCategory';
import AddSubCategory from './components/AddSubCategory';
import CategoryList from './components/CategoryList';
import CurrentCategory from './components/CurrentCategory';

import { FirestoreCollections } from '~constants/firebase';
import useFirestore from '~hooks/useFirestore';
import getLatestInternalId from '~utils/getLatestInternalId';

function CategoryManager() {
    const {
        subscribeToData,
        removeDocument,
        addDocument,
        updateDocument,
        creatingLoading,
    } = useFirestore<Category>(FirestoreCollections.Categories);

    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showAddSubCategoryModal, setShowAddSubCategoryModal] =
        useState(false);
    const [data, setData] = useState<Category[]>([]);
    const [currentCategory, setCurrentCategory] =
        useState<Nullable<number>>(null);

    const handleSelectCategory = (internalId: number) => {
        setCurrentCategory(internalId);
    };

    const toggleModals =
        (modalToToggle: 'addCategory' | 'addSubCategory') => () => {
            if (modalToToggle === 'addCategory') {
                setShowAddCategoryModal((prevState) => !prevState);
            }

            if (modalToToggle === 'addSubCategory') {
                setShowAddSubCategoryModal((prevState) => !prevState);
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

    const addSubcategory = (newData: Category) => {
        if (
            currentCategory &&
            selectedCategory.subCategories &&
            newData.subCategories
        ) {
            const latestId = getLatestInternalId(
                selectedCategory.subCategories
            );

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
                        openModal={toggleModals('addCategory')}
                    />

                    {currentCategory && (
                        <CurrentCategory
                            currentCategory={selectedCategory}
                            openModal={toggleModals('addSubCategory')}
                            removeSubcategory={removeSubCategory}
                        />
                    )}
                </Grid>
            </Paper>
        </>
    );
}
export default CategoryManager;
