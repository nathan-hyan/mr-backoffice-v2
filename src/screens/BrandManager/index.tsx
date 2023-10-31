import { Paper, Typography } from '@mui/material';

function BrandManager() {
    return (
        <>
            <Paper sx={{ p: 3 }}>
                <Typography>Buscar una marca</Typography>
            </Paper>
            <Paper sx={{ p: 3, flex: 1 }}>
                <Typography>Tabla donde estan todas las marcas</Typography>
            </Paper>
            <Paper sx={{ p: 3 }}>
                <Typography>Agregar marca? no se</Typography>
            </Paper>
        </>
    );
}
export default BrandManager;
