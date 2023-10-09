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
    const { handleSubmit, control, watch, reset, formState } = useForm<Product>(
        {
            defaultValues: EMPTY_FORM,
            mode: 'onChange',
        }
    );

    const { errors } = formState;

    const { addDocument, creatingLoading } = useFirestore<Product>(
        FirebaseCollections.Products
    );

    const onSubmit = (data: Product) => {
        addDocument(data).then(() => {
            reset();
            onClose();
        });
    };

    const handleCancel = () => {
        reset();
        onClose();
    };

    return (
        <Dialog open={show} onClose={handleCancel} fullWidth maxWidth="lg">
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
