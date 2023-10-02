import { useSnackbar } from 'notistack';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '~config/firebase';

interface Props {
    children: ReactNode;
}

function PrivateRoute({ children }: Props) {
    const { enqueueSnackbar } = useSnackbar();

    if (!auth.currentUser) {
        enqueueSnackbar(`Necesitas estar logueado para visitar esta sección`, {
            variant: 'error',
        });

        return <Navigate to={'/login'} />;
    }

    return children;
}
export default PrivateRoute;
