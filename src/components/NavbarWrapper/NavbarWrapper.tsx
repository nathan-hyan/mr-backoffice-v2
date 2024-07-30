import { Outlet, useNavigation } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import { closeSnackbar, SnackbarAction, SnackbarProvider } from 'notistack';

import NavigationBar from '~components/NavigationBar/NavigationBar';
import SEO from '~components/SEO/SEO';
import LoadingScreen from '~components/LoadingScreen/LoadingScreen';

import { ROUTES } from '~config/routes';

function NavbarWrapper() {
  const { state, location } = useNavigation();

  const renderCloseButton: SnackbarAction = (snackbarId) => (
    <Button
      variant='text'
      type='button'
      color='inherit'
      onClick={() => closeSnackbar(snackbarId)}
    >
      Cerrar
    </Button>
  );

  const currentRouteInfo = ROUTES().find(
    ({ path }) => path === location?.pathname
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
          currentRouteInfo?.description || 'Tienda Mundo Regalo // Backoffice'
        }
      />
      <NavigationBar />
      <Container
        maxWidth='xl'
        sx={{
          display: 'flex',
          gap: 3,
          flexDirection: 'column',
          mt: 12,
        }}
      >
        {state === 'loading' ? <LoadingScreen /> : <Outlet />}
      </Container>
    </SnackbarProvider>
  );
}
export default NavbarWrapper;
