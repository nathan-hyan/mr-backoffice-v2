import { Controller, useFieldArray, useForm } from 'react-hook-form';
import {
    AddRounded,
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
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { Product } from 'types/data';

import {
    DIMENSIONS_FORM,
    EMPTY_FORM,
    InputType,
    LOCAL_INFO_FORM,
    PRICE_FORM,
    PRODUCT_FORM,
    PROVIDER_PRODUCT_CODE_FORM_EMPTY,
    SPECIFICATIONS_FORM_EMPTY,
    VARIANTS_FORM_EMPTY,
} from './constants';

import CircularProgressWithLabel from '~components/CircularProgressWithLabel';
import useFileUpload from '~hooks/useFileUpload';
import useFirestore from '~hooks/useFirestore';

interface Props {
    show: boolean;
    onClose: () => void;
}

function AddProductModal({ show, onClose }: Props) {
    const { handleSubmit, control, reset, setValue, watch } = useForm<Product>({
        defaultValues: EMPTY_FORM,
    });
    const { addDocument } = useFirestore<Product>('products');
    const { handleFileUpload, isUploading, uploadProgress } =
        useFileUpload(watch);

    const {
        fields: specificationFields,
        remove: specificationRemove,
        append: specificationAppend,
    } = useFieldArray({ control, name: 'specifications' });

    const {
        fields: variantsFields,
        remove: variantsRemove,
        append: variantsAppend,
    } = useFieldArray({ control, name: 'variants' });

    const {
        fields: providerProductCodeFields,
        remove: providerProductCodeRemove,
        append: providerProductCodeAppend,
    } = useFieldArray({ control, name: 'providerProductCode' });

    const onSubmit = (data: Product) => {
        addDocument(data).then(() => {});
    };

    return (
        <Dialog
            open={show}
            onClose={onClose}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <DialogTitle>Crear producto</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Ingrese los siguientes datos para poder crear un producto
                </DialogContentText>
                <Typography sx={{ mt: 5 }} fontWeight="bold">
                    Información
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    {PRODUCT_FORM.map((item) => (
                        <Controller
                            key={item.id}
                            name={item.name}
                            control={control}
                            rules={{
                                required: {
                                    value: item.required || item.id !== 2,
                                    message: 'Este campo es obligatorio',
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    multiline={item.multiline}
                                    label={item.label}
                                    type={item.type}
                                    required={item.required}
                                    fullWidth
                                    variant="standard"
                                />
                            )}
                        />
                    ))}
                    <Controller
                        name="category"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: {
                                value: true,
                                message: 'Por favor, elija una categoria',
                            },
                        }}
                        render={({ field }) => (
                            <FormControl fullWidth variant="standard">
                                <InputLabel id="demo-simple-select-label">
                                    Categoria
                                </InputLabel>
                                <Select {...field} labelId="category">
                                    <MenuItem value="libreria">
                                        Librería
                                    </MenuItem>
                                    <MenuItem value="imprenta">
                                        Imprenta
                                    </MenuItem>
                                    <MenuItem value="servicios">
                                        Servicios
                                    </MenuItem>
                                    <MenuItem value="regaleria">
                                        Regalería
                                    </MenuItem>
                                    <MenuItem value="biju-cosmetica">
                                        Bijú / Cosmética
                                    </MenuItem>
                                    <MenuItem value="electronica">
                                        Electrónica
                                    </MenuItem>
                                    <MenuItem value="cotillon">
                                        Cotillón
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                    <TextField label="Subcategoria" variant="standard" />

                    <Divider sx={{ mt: 3 }} />
                    <label htmlFor="upload-image">
                        <Button
                            variant="contained"
                            component="span"
                            fullWidth
                            disabled={isUploading}
                            startIcon={
                                uploadProgress !== null && isUploading ? (
                                    <CircularProgressWithLabel
                                        color="primary"
                                        value={uploadProgress}
                                    />
                                ) : null
                            }
                        >
                            Subir imágenes
                        </Button>
                        <input
                            id="upload-image"
                            hidden
                            accept="image/*"
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                        />
                    </label>

                    {/* {imagesToUploadDisplay.map((image) => (
                        <img src={image} key={image} />
                    ))} */}
                    <Divider />

                    <Typography sx={{ mt: 5 }} fontWeight="bold">
                        Precios
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    {PRICE_FORM.map((item) => (
                        <Controller
                            key={item.id}
                            name={`prices.${item.name}.value`}
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={item.label}
                                    type={item.type}
                                    required={item.required}
                                    fullWidth
                                    variant="standard"
                                />
                            )}
                        />
                    ))}

                    <Typography
                        sx={{
                            mt: 5,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                        fontWeight="bold"
                    >
                        Información del local
                        <Button
                            onClick={() =>
                                providerProductCodeAppend(
                                    PROVIDER_PRODUCT_CODE_FORM_EMPTY
                                )
                            }
                            startIcon={<AddRounded />}
                        >
                            Agregar
                        </Button>
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    {providerProductCodeFields.length > 0 ? (
                        providerProductCodeFields.map((item, index) => (
                            <Box
                                key={item.id}
                                sx={{
                                    gap: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Controller
                                    name={`providerProductCode.${index}.id`}
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Id del producto"
                                            type={InputType.Number}
                                            required
                                            fullWidth
                                        />
                                    )}
                                />
                                <Controller
                                    name={`providerProductCode.${index}.name`}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Nombre del proveedor"
                                            required
                                            fullWidth
                                        />
                                    )}
                                />
                                <IconButton
                                    size="small"
                                    color="error"
                                    sx={{ width: '40px', height: '40px' }}
                                    onClick={() => {
                                        providerProductCodeRemove(index);
                                    }}
                                >
                                    <DeleteForeverRounded />
                                </IconButton>
                            </Box>
                        ))
                    ) : (
                        <Typography
                            textAlign="center"
                            fontStyle="italic"
                            color="InactiveCaptionText"
                        >
                            No hay informacion del prestador, presione
                            &quot;Agregar&quot; para comenzar
                        </Typography>
                    )}
                    <Divider />
                    {LOCAL_INFO_FORM.map((item) => (
                        <Controller
                            key={item.id}
                            name={item.name}
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={item.label}
                                    type={item.type}
                                    required
                                    fullWidth
                                    variant="standard"
                                />
                            )}
                        />
                    ))}
                    <Typography sx={{ mt: 5 }} fontWeight="bold">
                        Dimensiones
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    {DIMENSIONS_FORM.map((item) => (
                        <Controller
                            key={item.id}
                            name={`dimensions.${item.name}`}
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={item.label}
                                    type={item.type}
                                    variant="standard"
                                    fullWidth
                                />
                            )}
                        />
                    ))}
                    <Typography
                        sx={{
                            mt: 5,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                        fontWeight="bold"
                    >
                        Especificaciónes
                        <Button
                            onClick={() =>
                                specificationAppend(SPECIFICATIONS_FORM_EMPTY)
                            }
                            startIcon={<AddRounded />}
                        >
                            Agregar
                        </Button>
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    {specificationFields.length > 0 ? (
                        specificationFields.map((item, index) => (
                            <Box
                                key={item.id}
                                sx={{
                                    gap: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Controller
                                    name={`specifications.${index}.title`}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Título"
                                            fullWidth
                                        />
                                    )}
                                />
                                <Controller
                                    name={`specifications.${index}.description`}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Descripción"
                                            fullWidth
                                        />
                                    )}
                                />
                                <IconButton
                                    size="small"
                                    color="error"
                                    sx={{ width: '40px', height: '40px' }}
                                    onClick={() => {
                                        specificationRemove(index);
                                    }}
                                >
                                    <DeleteForeverRounded />
                                </IconButton>
                            </Box>
                        ))
                    ) : (
                        <Typography
                            textAlign="center"
                            fontStyle="italic"
                            color="InactiveCaptionText"
                        >
                            No hay especificaciónes, presione
                            &quot;Agregar&quot; para comenzar
                        </Typography>
                    )}
                    <Divider />
                    <Typography
                        sx={{
                            mt: 5,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                        fontWeight="bold"
                    >
                        Variantes
                        <Button
                            onClick={() => variantsAppend(VARIANTS_FORM_EMPTY)}
                            startIcon={<AddRounded />}
                        >
                            Agregar
                        </Button>
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    {variantsFields.length > 0 ? (
                        variantsFields.map((item, index) => (
                            <Box
                                key={item.id}
                                sx={{
                                    gap: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Controller
                                    name={`variants.${index}.barCode`}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Cod. Barra"
                                            fullWidth
                                        />
                                    )}
                                />
                                <Controller
                                    name={`variants.${index}.color`}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Color"
                                            fullWidth
                                        />
                                    )}
                                />
                                <Controller
                                    name={`variants.${index}.stock`}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Stock"
                                            type={InputType.Number}
                                            fullWidth
                                        />
                                    )}
                                />
                                <IconButton
                                    size="small"
                                    color="error"
                                    sx={{ width: '40px', height: '40px' }}
                                    onClick={() => {
                                        variantsRemove(index);
                                    }}
                                >
                                    <DeleteForeverRounded />
                                </IconButton>
                            </Box>
                        ))
                    ) : (
                        <Typography
                            textAlign="center"
                            fontStyle="italic"
                            color="InactiveCaptionText"
                        >
                            No hay variantes del producto, presione
                            &quot;Agregar&quot; para comenzar
                        </Typography>
                    )}
                    <Divider />
                </Box>
            </DialogContent>
            <DialogActions sx={{ m: 2 }}>
                <Button
                    sx={{
                        color: 'GrayText',
                        borderColor: 'GrayText',
                    }}
                    variant="outlined"
                    startIcon={<CancelRounded />}
                    color="inherit"
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveAltRounded />}
                >
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default AddProductModal;
