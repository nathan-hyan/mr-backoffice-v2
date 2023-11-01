import { useState } from 'react';
import { ArrowForward, DeleteForeverRounded } from '@mui/icons-material';
import {
    Box,
    Button,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Paper,
    Typography,
} from '@mui/material';
import { Category } from 'types/data';
import { Nullable } from 'vite-env';

import CustomMenu from '~components/CustomMenu';
import DeleteAlert from '~components/DeleteAlert';

interface Props {
    currentCategory: Category;
    removeSubcategory: (arg0: Category[]) => void;
    openModal: () => void;
}

function CurrentCategory({
    currentCategory,
    openModal,
    removeSubcategory,
}: Props) {
    const [markedForDelete, setMarkedForDelete] =
        useState<Nullable<number>>(null);

    const handleDeleteModal = (id: number) => {
        setMarkedForDelete(id);
    };

    const handleClose = () => {
        setMarkedForDelete(null);
    };

    const deleteSubCategory = () => {
        let newArray: typeof currentCategory.subCategories = [];
        const idToDelete = currentCategory.subCategories?.filter(
            ({ internalId }) => internalId === markedForDelete
        )[0].internalId;

        if (currentCategory.subCategories) {
            newArray = currentCategory.subCategories.filter(
                ({ internalId }) => internalId !== idToDelete
            );
        }

        removeSubcategory(newArray);
        handleClose();
    };

    return (
        currentCategory && (
            <>
                <DeleteAlert
                    open={Boolean(markedForDelete)}
                    onClose={handleClose}
                    onDelete={deleteSubCategory}
                    stringToMatch={
                        markedForDelete
                            ? currentCategory.subCategories?.filter(
                                  ({ internalId }) =>
                                      internalId === markedForDelete
                              )[0].name || ''
                            : ''
                    }
                />
                <Grid item xs={8}>
                    <Paper elevation={4} sx={{ p: 3 }}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography variant="button" noWrap>
                                Subcategorias disponibles en{' '}
                                {currentCategory.name}
                            </Typography>
                            <CustomMenu>
                                <MenuItem onClick={openModal}>
                                    Agregar una sub-categoría
                                </MenuItem>
                            </CustomMenu>
                        </Box>
                        <List
                            sx={{
                                mt: 3,
                                maxHeight: '30rem',
                                overflow: 'hidden auto',
                            }}
                        >
                            {currentCategory.subCategories?.length ? (
                                currentCategory.subCategories.map(
                                    (category, index) => (
                                        <ListItem
                                            divider={
                                                index + 1 !==
                                                currentCategory.subCategories!
                                                    .length
                                            }
                                            secondaryAction={
                                                <IconButton
                                                    edge="end"
                                                    color="error"
                                                    onClick={() => {
                                                        handleDeleteModal(
                                                            category.internalId
                                                        );
                                                    }}
                                                >
                                                    <DeleteForeverRounded />
                                                </IconButton>
                                            }
                                            key={category.internalId}
                                        >
                                            <ListItemIcon>
                                                <ArrowForward />
                                            </ListItemIcon>
                                            <ListItemText>
                                                {category.name}
                                            </ListItemText>
                                        </ListItem>
                                    )
                                )
                            ) : (
                                <>
                                    <ListItemText
                                        sx={{ textAlign: 'center', mb: 3 }}
                                    >
                                        No se encontraron sub-categorias
                                    </ListItemText>
                                    <ListItemText sx={{ textAlign: 'center' }}>
                                        <Button
                                            variant="contained"
                                            onClick={openModal}
                                        >
                                            Agregar sub-categorías
                                        </Button>
                                    </ListItemText>
                                </>
                            )}
                        </List>
                    </Paper>
                </Grid>
            </>
        )
    );
}
export default CurrentCategory;
