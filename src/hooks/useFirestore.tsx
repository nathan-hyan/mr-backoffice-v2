import { useCallback, useState } from 'react';
import { FirebaseError } from 'firebase/app';
import {
    addDoc,
    collection,
    deleteDoc,
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

    const throwError = useCallback(
        (err: unknown) => {
            if (err instanceof FirebaseError) {
                enqueueSnackbar(err.message, { variant: 'error' });
            } else {
                enqueueSnackbar('Ocurrió un error inesperado.', {
                    variant: 'error',
                });
            }
        },
        [enqueueSnackbar]
    );

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
                    throwError(err);
                }
            });
        },
        [collectionName, throwError]
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
            enqueueSnackbar('Item creado correctamente', {
                variant: 'success',
            });
            setCreatingLoading(false);

            return res;
        } catch (err: unknown) {
            setCreatingLoading(false);
            throwError(err);
            return [];
        }
    };

    const removeDocument = (
        documentId: string,
        callback?: (arg0: void) => void
    ) => {
        const docRef = doc(database, collectionName, documentId);

        deleteDoc(docRef)
            .then((data) => {
                enqueueSnackbar('Item eliminado correctamente', {
                    variant: 'success',
                });

                if (callback) {
                    callback(data);
                }
            })
            .catch((err) => throwError(err));
    };

    const updateDocument = (
        documentId: string,
        newData: DataWithId,
        callback?: (arg0: void) => void
    ) => {
        const docRef = doc(database, collectionName, documentId);

        updateDoc(docRef, newData)
            .then((data) => {
                enqueueSnackbar('Item editado correctamente', {
                    variant: 'info',
                });

                if (callback) {
                    callback(data);
                }
            })
            .catch((err) => throwError(err));
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
        removeDocument,
        fetchLoading,
        creatingLoading,
        subscribeToData,
    };
}
export default useFirestore;
