import { Outlet } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import { closeSnackbar, SnackbarAction, SnackbarProvider } from 'notistack';

import NavigationBar from '~components/NavigationBar';

function NavbarWrapper() {
    const renderCloseButton: SnackbarAction = (snackbarId) => (
        <Button
            variant="text"
            type="button"
            color="inherit"
            onClick={() => closeSnackbar(snackbarId)}
        >
            Cerrar
        </Button>
    );
    return (
        <SnackbarProvider
            maxSnack={5}
            autoHideDuration={3000}
            action={renderCloseButton}
        >
            <NavigationBar />
            <Container
                sx={{
                    display: 'flex',
                    gap: 3,
                    flexDirection: 'column',
                }}
            >
                <Outlet />
            </Container>
        </SnackbarProvider>
    );
}
export default NavbarWrapper;
