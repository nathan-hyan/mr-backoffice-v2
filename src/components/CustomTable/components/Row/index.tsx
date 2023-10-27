/* eslint-disable react/destructuring-assignment */
import { TableCell, TableRow } from '@mui/material';
import { Product } from 'types/data';

import { useProducts } from '~contexts/Products';

type Props = { header: 'hidden'; data?: Product } | { header: 'show' };

function Row(props: Props) {
    const { header } = props;
    const { getSubcategories, categories } = useProducts();

    const handleOnClick = (id: number) => () => {
        return id;
    };

    const translateCategories = (category: string, subCategory: string) => {
        const translatedCategory = categories.find(({ id }) => category === id);
        const translatedSubCategory = getSubcategories(category).find(
            ({ internalId }) => internalId === subCategory
        );

        return { translatedCategory, translatedSubCategory };
    };

    if (header === 'hidden' && props.data) {
        const {
            internalId,
            name,
            stock,
            prices,
            category: untranslatedCategory,
            subCategory: untranslatedSubCategory,
            barcode,
        } = props.data;

        const date = prices.cost.lastModified
            ? prices.cost.lastModified.toDate()
            : null;

        const {
            translatedCategory: category,
            translatedSubCategory: subCategory,
        } = translateCategories(untranslatedCategory, untranslatedSubCategory);

        return (
            <TableRow
                selected={stock <= 0}
                hover
                onClick={handleOnClick(internalId)}
                sx={{
                    cursor: 'pointer',
                }}
            >
                <TableCell>{internalId}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{stock}</TableCell>
                <TableCell>
                    ${(Number(prices.cost.value) || 0).toFixed(2)}
                </TableCell>
                <TableCell>
                    ${(Number(prices.cash.value) || 0).toFixed(2)}
                </TableCell>
                <TableCell>
                    ${(Number(prices.list.value) || 0).toFixed(2)}
                </TableCell>
                <TableCell>
                    ${(Number(prices.web.value) || 0).toFixed(2)}
                </TableCell>
                <TableCell>
                    {category?.name} / {subCategory?.name}
                </TableCell>
                <TableCell>{barcode}</TableCell>
                <TableCell>
                    {date ? date.toLocaleDateString('es-ES') : '-'}
                </TableCell>
            </TableRow>
        );
    }
    if (props.header === 'show') {
        return (
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Costo</TableCell>
                <TableCell>Contado</TableCell>
                <TableCell>Lista</TableCell>
                <TableCell>Web</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Codigo de barras</TableCell>
                <TableCell>Ult. Mod. Precio Costo</TableCell>
            </TableRow>
        );
    }
}

Row.defaultProps = {
    data: {
        internalId: 'ID',
        name: 'Nombre',
        stock: 'Stock',
        prices: {
            cost: { value: 'Costo', lastModified: 'Ult. Mod. Precio Costo' },
            cash: { value: 'Contado' },
            list: { value: 'Lista' },
            web: { value: 'Web' },
        },
        category: 'Categoria',
        subCategory: 'Subcategoria',
        barcode: 'Codigo de barras',
    },
};

export default Row;
