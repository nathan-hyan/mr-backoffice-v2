import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, LinearProgress, Paper, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { Product } from 'types/data';

import Alert from './components/Alert';
import Form from './components/Form';
import { PriceModifierForm } from './constants';
import { batchUpdateData } from './utils';

import { FirestoreCollections } from '~constants/firebase';
import { useProducts } from '~contexts/Products';
import useFirestore from '~hooks/useFirestore';

function PriceModifier() {
    const [showAlert, setShowAlert] = useState(false);
    const [newData, setNewData] = useState<Product[]>([]);
    const [customPercent, setCustomPercent] = useState(0);

    const { productList } = useProducts();
    const { updateDocument } = useFirestore(FirestoreCollections.Products);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<PriceModifierForm>({
        defaultValues: {
            type: 'incr',
            cost: 0,
            list: 0,
            cash: 0,
            web: 0,
        },
    });

    const toggleShowAlert = () => {
        setShowAlert((prevState) => !prevState);
    };

    const onSubmit = (e: PriceModifierForm) => {
        const result = batchUpdateData(e, productList);
        setNewData(result);

        toggleShowAlert();
    };

    const modifyPrices = () => {
        const totalProductCount = newData.length;
        const percentDivider = 100 / totalProductCount;

        newData.forEach((product) => {
            setCustomPercent((prevState) =>
                prevState + percentDivider >= 100
                    ? 100
                    : Math.round(prevState + percentDivider)
            );

            updateDocument(product.id, product);
        });

        toggleShowAlert();
    };

    return (
        <>
            <Alert
                onClick={modifyPrices}
                open={showAlert}
                handleClose={toggleShowAlert}
            />
            <Paper elevation={3} sx={{ padding: '1rem 2rem' }}>
                <Typography variant="body1">Price modifier!</Typography>
                <Box sx={{ my: '3rem' }}>
                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <Form
                            control={control}
                            errors={errors}
                            disabled={customPercent > 0 && customPercent < 100}
                        />
                    </form>
                </Box>
                {customPercent === 100 && (
                    <Typography
                        color={grey[100]}
                        sx={{
                            textAlign: 'center',
                            py: '1rem',
                            borderRadius: '10px',
                        }}
                        bgcolor={green[500]}
                    >
                        Proceso finalizado!
                    </Typography>
                )}
                {customPercent > 0 && customPercent < 100 && (
                    <LinearProgress
                        variant="determinate"
                        value={customPercent}
                    />
                )}
            </Paper>
        </>
    );
}
export default PriceModifier;
