import { FirebaseError } from 'firebase/app';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useSnackbar } from 'notistack';

import { database } from '~config/firebase';

function useFirestore<T>(collectionName: string) {
    const { enqueueSnackbar } = useSnackbar();
    const collectionRef = collection(database, collectionName);

    const fetchData = async () => {
        try {
            const res = await getDocs(collectionRef);
            return res.docs.map((item) => ({
                id: item.id,
                ...(item.data() as T),
            }));
        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                enqueueSnackbar(err.message, { variant: 'error' });
                return [] as T[];
            }

            enqueueSnackbar('Ocurrió un error inesperado.', {
                variant: 'error',
            });
            return [] as T[];
        }
    };

    const addDocument = async (newDocument: T) => {
        try {
            const res = await addDoc(
                collectionRef,
                newDocument as Record<string, unknown>
            );
            enqueueSnackbar('Producto creado correctamente', {
                variant: 'success',
            });

            return res;
        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                enqueueSnackbar(err.message, { variant: 'error' });
                return [] as T[];
            }

            enqueueSnackbar('Ocurrió un error inesperado.', {
                variant: 'error',
            });
            return [] as T[];
        }
    };

    return { fetchData, addDocument };
}
export default useFirestore;
