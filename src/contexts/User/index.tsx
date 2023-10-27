import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import { Nullable } from 'vite-env';

import LoadingScreen from '~components/LoadingScreen';
import { auth } from '~config/firebase';
import { FirestoreCollections, UserRoles } from '~constants/firebase';
import useFirestore from '~hooks/useFirestore';

interface UserWithRole extends User {
    role: UserRoles;
}

interface Context {
    loadingUser: boolean;
    user: Nullable<UserWithRole>;
}
export const UserContext = createContext<Context>({
    loadingUser: false,
    user: null,
});

interface Props {
    children: ReactNode;
}

export function UserContextProvider({ children }: Props) {
    const { getDocument } = useFirestore<{ role: UserRoles }>(
        FirestoreCollections.Users
    );

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { pathname } = useLocation();
    const [hasUser, setHasUser] = useState(false);
    const [loadingUser, setLoadingUser] = useState(true);
    const [user, setUser] = useState<Nullable<UserWithRole>>(null);

    let allowedPaths: string[];

    try {
        allowedPaths = JSON.parse(
            import.meta.env.VITE_ALLOWED_PUBLIC_ROUTES || '[]'
        );
    } catch (err) {
        allowedPaths = [];
    }

    useEffect(() => {
        onAuthStateChanged(auth, (firebaseUser) => {
            if (!hasUser && !firebaseUser) {
                setLoadingUser(false);
            }

            if (!hasUser && firebaseUser) {
                setLoadingUser(false);
                setUser({ ...firebaseUser, role: UserRoles.Customer });
                setHasUser(true);
            }

            if (!firebaseUser && !allowedPaths.includes(pathname)) {
                enqueueSnackbar(
                    `Necesitas estar logueado para visitar esta sección`,
                    {
                        variant: 'error',
                    }
                );

                navigate('/login');
            }

            if (firebaseUser && allowedPaths.includes(pathname)) {
                setUser({ ...firebaseUser, role: UserRoles.Customer });
                navigate('/products');
            }

            if (firebaseUser?.uid) {
                getDocument(firebaseUser.uid).then(({ role }) => {
                    setUser((prevState) => ({
                        ...prevState!,
                        role,
                    }));
                });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const value = useMemo(() => ({ loadingUser, user }), [loadingUser, user]);

    return (
        <UserContext.Provider value={value}>
            {loadingUser ? <LoadingScreen /> : children}
        </UserContext.Provider>
    );
}

const useUserContext = () => {
    const ctx = useContext(UserContext);

    if (!ctx) {
        throw new Error("You're not using the correct context!");
    }

    return ctx;
};

export default useUserContext;
