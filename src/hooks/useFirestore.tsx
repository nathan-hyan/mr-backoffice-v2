import { useCallback, useState } from 'react';
import { FirebaseError } from 'firebase/app';
import {
    addDoc,
    collection,
    doc,
    DocumentData,
    DocumentReference,
    getDoc,
    onSnapshot,
    updateDoc,
} from 'firebase/firestore';
import { useSnackbar } from 'notistack';

import { database } from '~config/firebase';
import { FirestoreCollections } from '~constants/firebase';

function useFirestore<T>(collectionName: FirestoreCollections) {
    type DataWithId = { id: string } & T;
    type Callback = (data: DataWithId[]) => void;

    const { enqueueSnackbar } = useSnackbar();
    const [fetchLoading, setFetchLoading] = useState(true);
    const [creatingLoading, setCreatingLoading] = useState(false);

    const subscribeToData = useCallback(
        (callback: Callback) => {
            setFetchLoading(true);
            const collectionRef = collection(database, collectionName);

            return onSnapshot(collectionRef, (snapshot) => {
                try {
                    setFetchLoading(false);

                    const response = snapshot.docs.map((item) => ({
                        ...(item.data() as T),
                        id: item.id,
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
                }
            });
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

    const updateDocument = (
        documentId: string,
        newData: DataWithId,
        callback?: (arg0: void) => void
    ) => {
        const docRef = doc(database, collectionName, documentId);

        updateDoc(docRef, newData).then(callback);
    };

    const getDocument = async (documentId: string) => {
        const docRef = doc(database, collectionName, documentId);

        const response = await getDoc(docRef);

        return response.data() as T;
    };

    return {
        updateDocument,
        addDocument,
        getDocument,
        fetchLoading,
        creatingLoading,
        subscribeToData,
    };
}
export default useFirestore;
