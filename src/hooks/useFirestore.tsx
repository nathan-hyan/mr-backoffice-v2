import { FirebaseError } from 'firebase/app';
import {
    addDoc,
    collection,
    getDocs,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import { useSnackbar } from 'notistack';
import { SortBy } from '~components/SortByBox/constants';

import { database } from '~config/firebase';

// TODO: Its best to have the collection names as enums to avoid any errors
function useFirestore<T>(collectionName: string) {
    const { enqueueSnackbar } = useSnackbar();
    const collectionRef = collection(database, collectionName);

    const fetchData = async (
        filterBy: SortBy,
        searchQuery: string | undefined
    ) => {
        const sorting = {
            [SortBy.Name]: 'name',
            [SortBy.LastModified]: 'prices.cost.lastModified',
            [SortBy.InternalId]: 'internalId',
        };

        const regexpQuery = new RegExp(`/${searchQuery}/`, 'i');

        const filtered = query(
            collectionRef,
            where('name', '>=', regexpQuery),
            where('name', '<=', regexpQuery + '~')
        );

        const q = query(filtered, orderBy(sorting[filterBy], 'asc'));

        try {
            const res = await getDocs(q);

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
