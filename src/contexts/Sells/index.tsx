/* eslint-disable no-param-reassign */
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { getDocs } from 'firebase/firestore';
import { Venta } from 'types/data';

import { FirestoreCollections } from '~constants/firebase';
import useFirestore from '~hooks/useFirestore';

interface Props {
  children: ReactNode;
}

const VentasContext = createContext(null);

export default function VentasProvider({ children }: Props) {
  const [ventas, setVentas] = useState<Venta[]>([]);

  const {
    subscribeToData,
    addDocument,
    updateDocument,
    removeDocument,
    fetchLoading,
    creatingLoading,
    updateLoading,
    getLastDocument,
    queryDocuments,
  } = useFirestore<Venta>(FirestoreCollections.Ventas);

  const fetchVentas = useCallback(() => {
    return subscribeToData((data: Venta[]) => {
      setVentas(data);
    });
  }, [subscribeToData]);

  const createVenta = useCallback(
    async (venta: Venta) => {
      const lastVenta = await getLastDocument('orderNumber');
      const lastOrderNumber = lastVenta
        ? parseInt(lastVenta.orderNumber, 10)
        : 0;
      const newOrderNumber = (lastOrderNumber + 1).toString().padStart(5, '0');
      venta.orderNumber = newOrderNumber;
      await addDocument(venta);
    },
    [addDocument, getLastDocument]
  );

  const updateVenta = useCallback(
    (id: string, updatedVenta: Venta) => updateDocument(id, updatedVenta),
    [updateDocument]
  );

  const deleteVenta = useCallback(
    (id: string) => removeDocument(id),
    [removeDocument]
  );

  const searchVentas = useCallback(
    async (criteria: { customerName?: string; creationDate?: string }) => {
      const baseQuery = queryDocuments();
      const results = await getDocs(baseQuery);
      const allVentas = results.docs.map((doc) => doc.data() as Venta);

      let filteredVentas = allVentas;

      if (criteria.customerName) {
        filteredVentas = filteredVentas.filter((venta) =>
          venta.customerInfo.name
            .toLowerCase()
            .includes(criteria.customerName.toLowerCase())
        );
      }

      if (criteria.creationDate) {
        filteredVentas = filteredVentas.filter((venta) => {
          const [day, month, year] = venta.orderDate.split('/');

          return (
            day.includes(criteria.creationDate) ||
            month.includes(criteria.creationDate) ||
            year.includes(criteria.creationDate)
          );
        });
      }

      return filteredVentas;
    },
    [queryDocuments]
  );

  const getNextOrderNumber = useCallback(async () => {
    const lastVenta = await getLastDocument('orderNumber');
    const lastOrderNumber = lastVenta ? parseInt(lastVenta.orderNumber, 10) : 0;
    return (lastOrderNumber + 1).toString().padStart(5, '0');
  }, [getLastDocument]);

  const value = useMemo(
    () => ({
      ventas,
      createVenta,
      updateVenta,
      deleteVenta,
      fetchVentas,
      fetchLoading,
      creatingLoading,
      updateLoading,
      searchVentas,
      getNextOrderNumber,
    }),
    [
      ventas,
      createVenta,
      updateVenta,
      deleteVenta,
      fetchVentas,
      fetchLoading,
      creatingLoading,
      updateLoading,
      searchVentas,
      getNextOrderNumber,
    ]
  );

  return (
    <VentasContext.Provider value={value}>{children}</VentasContext.Provider>
  );
}

export { VentasContext, VentasProvider };

export const useVentas = () => {
  const ctx = useContext(VentasContext);

  if (!ctx) {
    throw new Error("You're not using the correct context!");
  }

  return ctx;
};
