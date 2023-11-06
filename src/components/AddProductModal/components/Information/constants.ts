import { RegisterOptions } from 'react-hook-form';
import { Product } from 'types/data';

import { InputType } from '~components/AddProductModal/constants';

export const INFORMATION_RULES: (
    isRequired: boolean,
    itemType: InputType
) =>
    | Omit<
          RegisterOptions<Product, keyof Product>,
          'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
      >
    | undefined = (isRequired, itemType) => {
    return {
        required: {
            value: isRequired,
            message: 'Este campo es obligatorio',
        },
        validate: {
            positive:
                itemType === InputType.Number
                    ? (val) =>
                          Number(val) > 0 ||
                          'El numero no puede ser cero o negativo'
                    : () => true,
        },
    };
};

export const isRequiredRule = {
    required: {
        value: true,
        message: 'Por favor, elija una categoria',
    },
};
