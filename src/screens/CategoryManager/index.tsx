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

import SEO from '~components/SEO';
import { FirestoreCollections } from '~constants/firebase';
import useFirestore from '~hooks/useFirestore';

function CategoryManager() {
    const { subscribeToData } = useFirestore<Category>(
        FirestoreCollections.Categories
    );

    const [data, setData] = useState<Category[]>([]);

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
                    <Grid item xs={4}>
                        <Paper elevation={2} sx={{ p: 3 }}>
                            <Typography variant="button">
                                Lista de Categorias
                            </Typography>
                            <List>
                                {data.map((category, index) => (
                                    <Fragment key={category.internalId}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <ArrowForward />
                                            </ListItemIcon>
                                            <ListItemText>
                                                {category.name}
                                            </ListItemText>
                                        </ListItemButton>
                                        {index + 1 !== data.length && (
                                            <Divider />
                                        )}
                                    </Fragment>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper elevation={4} sx={{ p: 3 }}>
                            Lista de categorias
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}
export default CategoryManager;
