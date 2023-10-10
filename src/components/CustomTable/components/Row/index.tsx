/* eslint-disable react/destructuring-assignment */
import { TableCell, TableRow } from '@mui/material';
import { Product } from 'types/data';

type Props = { header: 'hidden'; data?: Product } | { header: 'show' };

function Row(props: Props) {
    const { header } = props;

    const handleOnClick = (id: number) => () => {
        console.log(id);
    };

    if (header === 'hidden' && props.data) {
        const { internalId, name, stock, prices, category, barcode } =
            props.data;
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
                <TableCell>${prices.cost.value.toFixed(2)}</TableCell>
                <TableCell>${prices.cash.value.toFixed(2)}</TableCell>
                <TableCell>${prices.list.value.toFixed(2)}</TableCell>
                <TableCell>${prices.web.value.toFixed(2)}</TableCell>
                <TableCell>{category}</TableCell>
                <TableCell>{barcode}</TableCell>
                <TableCell>
                    {prices.cost.lastModified
                        ? String(prices.cost.lastModified)
                        : '-'}
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
        barcode: 'Codigo de barras',
    },
};

export default Row;
