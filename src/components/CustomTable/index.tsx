import { useState } from 'react';
import { AddRounded } from '@mui/icons-material';
import {
    Button,
    Divider,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TablePagination,
} from '@mui/material';
import { Product } from 'types/data';

import Row from './components/Row';

import AddProductModal from '~components/AddProductModal';

interface Props {
    products?: Product[];
}

function CustomTable({ products }: Props) {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal((prevState) => !prevState);
    };

    return (
        <>
            <AddProductModal show={showModal} onClose={toggleModal} />
            <TableContainer component={Paper} sx={{ mb: 3, minHeight: 440, height: "30vh" }}>
                <Table stickyHeader>
                    <TableHead>
                        <Row header="show" />
                    </TableHead>
                    {products ? (
                        <TableBody>
                            {products.map((product) => (
                                <Row
                                    header="hidden"
                                    data={product}
                                    key={product.internalId}
                                />
                            ))}
                        </TableBody>
                    ) : null}
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={-1}
                    rowsPerPage={5}
                    page={0}
                    onPageChange={() => console.log('OnPageChange')}
                    onRowsPerPageChange={() => console.log('Handle')}
                />
                <Divider />
                <Button
                    variant="contained"
                    sx={{ m: 2 }}
                    startIcon={<AddRounded />}
                    onClick={toggleModal}
                >
                    Agregar producto
                </Button>
            </TableContainer>
        </>
    );
}

CustomTable.defaultProps = {
    products: [],
};

export default CustomTable;
