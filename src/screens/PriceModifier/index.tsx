import { useForm } from 'react-hook-form';
import { Box, Paper, Typography } from '@mui/material';

import Form from './components/Form';
import { PriceModifierForm } from './constants';
import { batchUpdateData } from './utils';

import { useProducts } from '~contexts/Products';

function PriceModifier() {
    const { productList } = useProducts();

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

    const onSubmit = (e: PriceModifierForm) => {
        const result = batchUpdateData(e, productList);

        console.log({ result });
    };

    return (
        <Paper elevation={3} sx={{ padding: '1rem 2rem' }}>
            <Typography variant="body1">Price modifier!</Typography>

            <Box sx={{ my: '3rem' }}>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Form control={control} errors={errors} />
                </form>
            </Box>
        </Paper>
    );
}
export default PriceModifier;
