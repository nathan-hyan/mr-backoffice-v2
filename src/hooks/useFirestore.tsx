import { useCallback, useState } from 'react';
import { FirebaseError } from 'firebase/app';
import {
    addDoc,
    collection,
    DocumentData,
    DocumentReference,
    getDocs,
    onSnapshot,
} from 'firebase/firestore';
import { useSnackbar } from 'notistack';

import { database } from '~config/firebase';
import { FirebaseCollections } from '~constants/firebase';

function useFirestore<T>(collectionName: FirebaseCollections) {
    const { enqueueSnackbar } = useSnackbar();
    const [fetchLoading, setFetchLoading] = useState(true);
    const [creatingLoading, setCreatingLoading] = useState(false);

    const fetchData: () => Promise<({ id: string } & T)[]> =
        useCallback(async () => {
            const collectionRef = collection(database, collectionName);
            setFetchLoading(true);
            try {
                const res = await getDocs(collectionRef);

                setFetchLoading(false);

                return res.docs.map((item) => ({
                    id: item.id,
                    ...(item.data() as T),
                }));
            } catch (err: unknown) {
                setFetchLoading(false);

                if (err instanceof FirebaseError) {
                    enqueueSnackbar(err.message, { variant: 'error' });
                    return [];
                }

                enqueueSnackbar('Ocurrió un error inesperado.', {
                    variant: 'error',
                });

                return [];
            }
        }, [collectionName, enqueueSnackbar]);

    type Callback = (data: ({ id: string } & T)[]) => void;

    const subscribeToData = useCallback(
        (callback: Callback) => {
            const collectionRef = collection(database, collectionName);

            return onSnapshot(collectionRef, (snapshot) => {
                try {
                    setFetchLoading(false);

                    const response = snapshot.docs.map((item) => ({
                        id: item.id,
                        ...(item.data() as T),
                    }));

                    callback(response);
                } catch (err: unknown) {
                    setFetchLoading(false);

                    if (err instanceof FirebaseError) {
                        enqueueSnackbar(err.message, { variant: 'error' });
                    }

                    enqueueSnackbar('Ocurrió un error inesperado.', {
                        variant: 'error',
                    });

                    // callback([]);
                }
            });

            // let data:  = [];

            // (snapshot) => {
            //             try {
            //                 setFetchLoading(false);

            //                 return snapshot.docs.map((item) => ({
            //                     id: item.id,
            //                     ...(item.data() as T),
            //                 }));
            //             } catch (err: unknown) {
            //                 setFetchLoading(false);

            //                 if (err instanceof FirebaseError) {
            //                     enqueueSnackbar(err.message, { variant: 'error' });
            //                     return [];
            //                 }

            //                 enqueueSnackbar('Ocurrió un error inesperado.', {
            //                     variant: 'error',
            //                 });

            //                 return [];
            //             }
        },
        [collectionName, enqueueSnackbar]
    );

    const addDocument: (
        newDocument: T
    ) => Promise<
        DocumentReference<Record<string, unknown>, DocumentData> | T[]
    > = async (newDocument) => {
        setCreatingLoading(true);
        const collectionRef = collection(database, collectionName);

        try {
            const res = await addDoc(
                collectionRef,
                newDocument as Record<string, unknown>
            );
            enqueueSnackbar('Producto creado correctamente', {
                variant: 'success',
            });
            setCreatingLoading(false);

            return res;
        } catch (err: unknown) {
            setCreatingLoading(false);
            if (err instanceof FirebaseError) {
                enqueueSnackbar(err.message, { variant: 'error' });
                return [];
            }

            enqueueSnackbar('Ocurrió un error inesperado.', {
                variant: 'error',
            });
            return [];
        }
    };

    return {
        fetchData,
        addDocument,
        fetchLoading,
        creatingLoading,
        subscribeToData,
    };
}
export default useFirestore;
