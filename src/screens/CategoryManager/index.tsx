import { Fragment, useEffect, useState } from 'react';
import { ArrowForward } from '@mui/icons-material';
import {
    Divider,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';
import { Category } from 'types/data';
import { Nullable } from 'vite-env';

import CategoryList from './components/CategoryList';

import SEO from '~components/SEO';
import { FirestoreCollections } from '~constants/firebase';
import useFirestore from '~hooks/useFirestore';

function CategoryManager() {
    const { subscribeToData } = useFirestore<Category>(
        FirestoreCollections.Categories
    );

    const [data, setData] = useState<Category[]>([]);
    const [currentCategory, setCurrentCategory] =
        useState<Nullable<Category>>(null);

    const handleSelectCategory = (category: Category) => {
        setCurrentCategory(category);
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
            <SEO
                title="Administrador de Categorias"
                description="Creación y edición de categorias para los productos"
            />
            <Paper sx={{ p: 3 }}>
                <Grid container spacing={2}>
                    <CategoryList
                        clearCurrentCategory={setCurrentCategory}
                        data={data}
                        currentCategory={currentCategory}
                        handleSelectCategory={handleSelectCategory}
                    />
                    {currentCategory && (
                        <Grid item xs={8}>
                            <Paper elevation={4} sx={{ p: 3 }}>
                                <Typography variant="button">
                                    Subcategorias disponibles en{' '}
                                    {currentCategory.name}
                                </Typography>
                                <List
                                    sx={{
                                        mt: 3,
                                        maxHeight: '30rem',
                                        overflow: 'hidden scroll',
                                    }}
                                >
                                    {currentCategory.subCategories &&
                                        currentCategory.subCategories.map(
                                            (category, index) => (
                                                <Fragment
                                                    key={category.internalId}
                                                >
                                                    <ListItemButton>
                                                        <ListItemIcon>
                                                            <ArrowForward />
                                                        </ListItemIcon>
                                                        <ListItemText>
                                                            {category.name}
                                                        </ListItemText>
                                                    </ListItemButton>
                                                    {index + 1 !==
                                                        currentCategory.subCategories!
                                                            .length && (
                                                        <Divider />
                                                    )}
                                                </Fragment>
                                            )
                                        )}
                                </List>
                            </Paper>
                        </Grid>
                    )}
                </Grid>
            </Paper>
        </>
    );
}
export default CategoryManager;
