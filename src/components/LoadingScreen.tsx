import { CircularProgress, Container, Paper, Typography } from '@mui/material';

function LoadingScreen() {
    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100dvh',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: 3,
                    p: 3,
                }}
            >
                <CircularProgress />
                <Typography>Cargando datos del usuario</Typography>
            </Paper>
        </Container>
    );
}
export default LoadingScreen;
