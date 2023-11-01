import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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
import { Nullable } from 'vite-env';

import Dimensions from './components/Dimensions';
import Information from './components/Information';
import KioskInformation from './components/KioskInformation';
import Prices from './components/Prices';
import Specifications from './components/Specifications';
import Variants from './components/Variants';
import { EMPTY_FORM } from './constants';
import { fabricateFakeData } from './utils';

import { FirestoreCollections } from '~constants/firebase';
import { useProducts } from '~contexts/Products';
import useFirestore from '~hooks/useFirestore';
import getLatestInternalId from '~utils/getLatestInternalId';

interface Props {
    show: boolean;
    onClose: () => void;
    productToEdit?: Nullable<Product>;
}

function AddProductModal({ show, onClose, productToEdit }: Props) {
    const { handleSubmit, control, watch, reset, formState, setValue } =
        useForm<Product>({
            defaultValues: EMPTY_FORM,
            mode: 'onChange',
        });

    const { errors } = formState;

    const { productList } = useProducts();

    const { addDocument, updateDocument, creatingLoading } =
        useFirestore<Product>(FirestoreCollections.Products);

    const onSubmit = (data: Product) => {
        if (productToEdit) {
            updateDocument(productToEdit.id, data, () => {
                reset();
                onClose();
            });

            return;
        }

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
        fabricateFakeData().forEach(({ field, value }) => {
            setValue(field as keyof Product, value);
        });
    };

    useEffect(() => {
        if (show && !productToEdit) {
            setValue('internalId', getLatestInternalId(productList) + 1);
        }

        if (productToEdit) {
            const keys = Object.keys(productToEdit) as (keyof Product)[];

            keys.forEach((field) => {
                setValue(field, productToEdit[field]);
            });
        }
    }, [productList, productToEdit, setValue, show]);

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

AddProductModal.defaultProps = {
    productToEdit: null,
};

export default AddProductModal;
