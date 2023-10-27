import { Fragment, useState } from 'react';
import { faker } from '@faker-js/faker';
import { ArrowForward, MoreVert } from '@mui/icons-material';
import {
    Box,
    Divider,
    Grid,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Paper,
    Typography,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { Category } from 'types/data';
import { Nullable, StateDispatch } from 'vite-env';

import { FirestoreCollections } from '~constants/firebase';
import useFirestore from '~hooks/useFirestore';

interface Props {
    data: Category[];
    currentCategory: Nullable<Category>;
    clearCurrentCategory: StateDispatch<Category>;
    handleSelectCategory: (arg0: Category) => void;
}

function CategoryList({
    data,
    currentCategory,
    handleSelectCategory,
    clearCurrentCategory,
}: Props) {
    const { addDocument, removeDocument } = useFirestore<Category>(
        FirestoreCollections.Categories
    );

    const [anchorElement, setAnchorElement] =
        useState<Nullable<HTMLElement>>(null);

    const toggleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElement(event.currentTarget);
    };

    const handleDeleteCategory = () => {
        if (!currentCategory?.id) {
            enqueueSnackbar({
                message: 'Primero elija una categoria para ser borrada',
                variant: 'error',
            });
            return;
        }

        removeDocument(currentCategory?.id, () => {
            enqueueSnackbar({
                message: 'Categoria eliminada',
                variant: 'success',
            });

            clearCurrentCategory(null);
            setAnchorElement(null);
        });
    };

    const fakeAddCategory = () => {
        const array = [...Array(faker.number.int(24))].map(() => ({
            name: faker.commerce.department(),
            internalId: String(faker.number.int()),
        }));

        const fakeData: Category = {
            internalId: String(faker.number.int(100)),
            name: faker.commerce.department(),
            subCategories: array,
        };

        addDocument(fakeData);
        setAnchorElement(null);
    };

    return (
        <Grid item xs={4}>
            <Paper elevation={2} sx={{ p: 3 }}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="button">
                        Lista de Categorias
                    </Typography>
                    <Menu
                        anchorEl={anchorElement}
                        open={Boolean(anchorElement)}
                        onClose={() => setAnchorElement(null)}
                    >
                        <MenuItem onClick={fakeAddCategory}>
                            Agregar una categoría
                        </MenuItem>
                        <MenuItem onClick={handleDeleteCategory}>
                            Quitar una categoría
                        </MenuItem>
                    </Menu>
                    <IconButton onClick={toggleMenuOpen}>
                        <MoreVert />
                    </IconButton>
                </Box>
                <List>
                    {data.map((category, index) => (
                        <Fragment key={category.internalId}>
                            <ListItemButton
                                selected={
                                    category.internalId ===
                                    currentCategory?.internalId
                                }
                                onClick={() => handleSelectCategory(category)}
                            >
                                <ListItemIcon>
                                    <ArrowForward />
                                </ListItemIcon>
                                <ListItemText>{category.name}</ListItemText>
                            </ListItemButton>
                            {index + 1 !== data.length && <Divider />}
                        </Fragment>
                    ))}
                </List>
            </Paper>
        </Grid>
    );
}

export default CategoryList;
