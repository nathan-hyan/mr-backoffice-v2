import { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material';
import { Category } from 'types/data';

interface Props {
    open: boolean;
    onClose: () => void;
    onDelete: (arg0: number) => void;
    categoryToDelete: Category | undefined;
}

function DeleteAlert({ open, onClose, onDelete, categoryToDelete }: Props) {
    const [categoryName, setCategoryName] = useState('');

    const handleClose = () => {
        setCategoryName('');
        onClose();
    };

    const handleDelete = () => {
        setCategoryName('');
        onDelete(categoryToDelete!.internalId);
    };

    return categoryToDelete ? (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="alert-dialog-title">
                Seguro desea eliminar la categoría?
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ mb: 3 }}>
                    Al ejecutar esta acción, eliminaria la categoria de manera
                    permanente. Para prevenir errores, por favor, escriba el
                    nombre de la categoria debajo para continuar
                </DialogContentText>
                <TextField
                    fullWidth
                    label="Nombre de la categoria"
                    error={categoryToDelete.name !== categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    value={categoryName}
                    placeholder={categoryToDelete.name}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button
                    onClick={handleDelete}
                    autoFocus
                    disabled={categoryToDelete.name !== categoryName}
                >
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    ) : null;
}
export default DeleteAlert;
