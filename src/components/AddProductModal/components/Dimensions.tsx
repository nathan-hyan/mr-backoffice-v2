import { Control, FieldErrors } from 'react-hook-form';
import { Divider, Typography } from '@mui/material';
import { Product } from 'types/data';

import { DIMENSIONS_FORM } from '~components/AddProductModal/constants';
import { InputType } from '~components/CustomInput/constants';
import CustomInput from '~components/CustomInput/CustomInput';

interface Props {
    control: Control<Product, unknown>;
    errors: FieldErrors<Product>;
}

function Dimensions({ control, errors }: Props) {
    return (
        <>
            <Typography sx={{ mt: 5 }} fontWeight="bold">
                Dimensiones
            </Typography>
            <Divider sx={{ my: 2 }} />
            {DIMENSIONS_FORM.map((item) => (
                <CustomInput
                    key={item.id}
                    label={item.label}
                    name={`dimensions.${item.name}`}
                    type={InputType.Number}
                    control={control}
                    error={
                        errors.dimensions
                            ? errors.dimensions[item.name]
                            : undefined
                    }
                />
            ))}
        </>
    );
}
export default Dimensions;
