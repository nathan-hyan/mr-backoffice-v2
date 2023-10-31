import { Outlet, useLocation } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import { closeSnackbar, SnackbarAction, SnackbarProvider } from 'notistack';

import NavigationBar from '~components/NavigationBar';
import SEO from '~components/SEO';
import { ROUTES } from '~config/routes';

function NavbarWrapper() {
    const location = useLocation();
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

    const currentRouteInfo = ROUTES.find(
        ({ path }) => path === location.pathname
    );

    return (
        <SnackbarProvider
            maxSnack={5}
            autoHideDuration={3000}
            action={renderCloseButton}
        >
            <SEO
                title={currentRouteInfo?.title || ''}
                description={
                    currentRouteInfo?.description ||
                    'Tienda Mundo Regalo // Backoffice'
                }
            />
            <NavigationBar />
            <Container
                maxWidth="xl"
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
