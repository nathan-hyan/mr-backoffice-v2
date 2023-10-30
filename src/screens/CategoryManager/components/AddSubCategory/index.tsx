import { Controller, useFieldArray, useForm } from 'react-hook-form';
import {
    AddCircleRounded,
    CancelRounded,
    DeleteForeverRounded,
    SaveAltRounded,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField,
} from '@mui/material';
import { Category } from 'types/data';

interface IAddSubCategories {
    subCategories: { name: string }[];
}
interface Props {
    show: boolean;
    handleClose: () => void;
    isLoading: boolean;
    addSubcategory: (arg0: Category) => void;
}

function AddSubCategory({
    show,
    handleClose,
    isLoading,
    addSubcategory,
}: Props) {
    const { handleSubmit, control, formState, reset } =
        useForm<IAddSubCategories>({
            defaultValues: {
                subCategories: [
                    {
                        name: '',
                    },
                ],
            },
        });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'subCategories',
    });

    const { errors } = formState;

    const onSubmit = (data: IAddSubCategories) => {
        addSubcategory(data as Category);

        reset();
        handleClose();
    };

    const handleCloseAndCancel = () => {
        reset();
        handleClose();
    };

    return (
        <Dialog
            open={show}
            onClose={handleCloseAndCancel}
            fullWidth
            maxWidth="lg"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle>Agregar Sub-categoría</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ingrese los siguientes datos para poder crear una
                        categoría
                    </DialogContentText>

                    {fields.map((input, index) => (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 3,
                                mt: 3,
                            }}
                            key={input.id}
                        >
                            <Controller
                                name={`subCategories.${index}.name`}
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Este campo es obligatorio',
                                    },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Nombre de la sub-categoría"
                                        required
                                        error={
                                            errors.subCategories &&
                                            !!errors.subCategories[index]?.name
                                        }
                                        helperText={
                                            errors.subCategories &&
                                            errors.subCategories[index]?.name
                                                ?.message
                                        }
                                        fullWidth
                                        variant="outlined"
                                    />
                                )}
                            />
                            {fields.length > 1 && (
                                <IconButton
                                    size="small"
                                    color="error"
                                    sx={{ width: '40px', height: '40px' }}
                                    onClick={() => {
                                        remove(index);
                                    }}
                                >
                                    <DeleteForeverRounded />
                                </IconButton>
                            )}
                        </Box>
                    ))}
                </DialogContent>
                <DialogActions sx={{ m: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<CancelRounded />}
                        color="error"
                        onClick={handleClose}
                        disabled={isLoading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<AddCircleRounded />}
                        color="primary"
                        onClick={() =>
                            append({
                                name: '',
                            })
                        }
                        disabled={isLoading}
                    >
                        Agregar otra sub-categoría
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SaveAltRounded />}
                        disabled={isLoading}
                    >
                        Guardar
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
export default AddSubCategory;
