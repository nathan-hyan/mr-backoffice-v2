import { ChangeEvent, useEffect, useState } from 'react';
import type { Brand } from 'types/data';
import { Nullable } from 'vite-env';

import { FirestoreCollections } from '~constants/firebase';
import { useFirestore } from '~hooks';
import { getLatestInternalId } from '~utils';

export type BrandType = Nullable<Brand & { id: string }>;

function useBrandManager() {
  const [markedForDeletion, setMarkedForDeletion] = useState<BrandType>(null);
  const [markedForUpdate, setMarkedForUpdate] = useState<BrandType>(null);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<BrandType[]>([]);
  const [dataCopy, setDataCopy] = useState<BrandType[]>([]);
  const [latestId, setLatestId] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { addDocument, removeDocument, updateDocument, subscribeToData } =
    useFirestore<Brand>(FirestoreCollections.Brands);

  const toggleModal = (documentToEdit?: BrandType) => {
    setShowModal((prevState) => !prevState);

    if (documentToEdit) {
      setMarkedForUpdate(documentToEdit);
    } else {
      setMarkedForUpdate(null);
    }
  };

  const handleAddDocument = (newData: { name: string }) => {
    addDocument({ ...newData, internalId: latestId + 1 });
  };

  const handleDeleteBrand = () => {
    if (!markedForDeletion) {
      return;
    }

    removeDocument(markedForDeletion.id);
    setMarkedForDeletion(null);
  };

  const handleUpdateBrand = (newName: string) => {
    if (!markedForUpdate) {
      return;
    }

    updateDocument(markedForUpdate.id, {
      ...markedForUpdate,
      name: newName,
    });

    setMarkedForUpdate(null);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const unsubscribe = subscribeToData((response) => {
      setData(response);
      setDataCopy(response);
      setLatestId(getLatestInternalId(response));
    });

    return () => {
      unsubscribe();
    };
  }, [subscribeToData]);

  return {
    setMarkedForDeletion,
    setData,
    handleAddDocument,
    handleChangePage,
    handleChangeRowsPerPage,
    handleDeleteBrand,
    handleUpdateBrand,
    toggleModal,
    showModal,
    data,
    dataCopy,
    page,
    rowsPerPage,
    markedForDeletion,
    markedForUpdate,
  };
}
export default useBrandManager;
