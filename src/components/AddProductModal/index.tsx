import { useForm } from 'react-hook-form';
import { faker } from '@faker-js/faker';
import { CancelRounded, SaveAltRounded } from '@mui/icons-material';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { Product } from 'types/data';

import Dimensions from './components/Dimensions';
import Information from './components/Information';
import KioskInformation from './components/KioskInformation';
import Prices from './components/Prices';
import Specifications from './components/Specifications';
import Variants from './components/Variants';
import { EMPTY_FORM } from './constants';

import { FirebaseCollections } from '~constants/firebase';
import useFirestore from '~hooks/useFirestore';

interface Props {
    show: boolean;
    onClose: () => void;
}

function AddProductModal({ show, onClose }: Props) {
    const { handleSubmit, control, watch, reset, formState, setValue } =
        useForm<Product>({
            defaultValues: EMPTY_FORM,
            mode: 'onChange',
        });

    const { errors } = formState;

    const { addDocument, creatingLoading } = useFirestore<Product>(
        FirebaseCollections.Products
    );

    const onSubmit = (data: Product) => {
        if (data.imageURL.length < 1) {
            enqueueSnackbar(`Elija una imágen antes de continuar`, {
                variant: 'error',
            });

            return;
        }

        addDocument(data).then(() => {
            reset();
            onClose();
        });
    };

    const handleCancel = () => {
        reset();
        onClose();
    };

    const fillFakeData = () => {
        setValue('name', faker.commerce.productName());
        setValue('description', faker.commerce.productDescription());
        setValue('internalId', faker.number.int(100));
        setValue('stock', faker.number.int({ min: 0, max: 50 }));
        setValue(
            'barcode',
            String(faker.number.int({ min: 11111111111, max: 99999999999 }))
        );
        setValue(
            'category',
            [
                'libreria',
                'imprenta',
                'servicios',
                'regaleria',
                'biju-cosmetica',
                'electronica',
                'cotillon',
            ][faker.number.int({ min: 1, max: 7 })]
        );
        setValue('subCategory', faker.commerce.department());

        setValue(
            'prices.cash.value',
            Number(faker.commerce.price({ min: 5, max: 300 }))
        );
        setValue(
            'prices.list.value',
            Number(faker.commerce.price({ min: 5, max: 300 }))
        );
        setValue(
            'prices.web.value',
            Number(faker.commerce.price({ min: 5, max: 300 }))
        );
        setValue(
            'prices.cost.value',
            Number(faker.commerce.price({ min: 5, max: 300 }))
        );

        setValue('brand', faker.commerce.product());
        setValue('businessOwner', faker.person.fullName());
        setValue('storePosition', faker.location.countryCode());
        setValue('weight', faker.number.int({ min: 2, max: 10 }));

        setValue('dimensions.width', faker.number.int({ min: 2, max: 10 }));
        setValue('dimensions.height', faker.number.int({ min: 2, max: 10 }));
        setValue('dimensions.depth', faker.number.int({ min: 2, max: 10 }));
    };

    return (
        <Dialog open={show} onClose={handleCancel} fullWidth maxWidth="lg">
            {import.meta.env.VITE_LOCAL_ENV && (
                <Button onClick={fillFakeData}>Fill with fake data</Button>
            )}
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>Crear producto</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Ingrese los siguientes datos para poder crear un
                        producto
                    </DialogContentText>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <Information
                            setValue={setValue}
                            control={control}
                            watch={watch}
                            errors={errors}
                        />
                        <Prices control={control} errors={errors} />
                        <Variants control={control} errors={errors} />
                        <Specifications control={control} errors={errors} />
                        <KioskInformation control={control} errors={errors} />
                        <Dimensions control={control} errors={errors} />
                    </Box>
                </DialogContent>

                <DialogActions sx={{ m: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<CancelRounded />}
                        color="error"
                        onClick={handleCancel}
                        disabled={creatingLoading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SaveAltRounded />}
                        disabled={creatingLoading}
                    >
                        Guardar
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
export default AddProductModal;
