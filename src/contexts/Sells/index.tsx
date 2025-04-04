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

interface VentasContextType {
  ventas: Venta[];
  createVenta: (venta: Venta) => Promise<void>;
  updateVenta: (id: string, updatedVenta: Venta) => void;
  deleteVenta: (id: string) => void;
  fetchVentas: () => void;
  fetchLoading: boolean;
  creatingLoading: boolean;
  updateLoading: boolean;
  searchVentas: (criteria: {
    customerName?: string;
    creationDate?: string;
    orderNumber?: string;
  }) => Promise<Venta[]>;
  getNextOrderNumber: () => Promise<string>;
  fetchAllVentas: () => Promise<Venta[]>;
}

const VentasContext = createContext<VentasContextType | null>(null);

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

  /* const deleteVenta = useCallback(
    (id: string) => removeDocument(id),
    [removeDocument]
  ); */

  const deleteVenta = useCallback(
    async (id?: string, orderNumber?: string) => {
      try {
        if (id) {
          // Elimina directamente por ID
          await removeDocument(id);
          console.log(`Venta con ID ${id} eliminada correctamente.`);
        } else if (orderNumber) {
          // Busca el documento por orderNumber y elimina
          const baseQuery = queryDocuments();
          const results = await getDocs(baseQuery);
          const ventaToDelete = results.docs.find(
            (doc) => (doc.data() as Venta).orderNumber === orderNumber
          );

          if (ventaToDelete) {
            await removeDocument(ventaToDelete.id);
            console.log(
              `Venta con orderNumber ${orderNumber} eliminada correctamente.`
            );
          } else {
            console.warn(
              `No se encontró una venta con orderNumber ${orderNumber}.`
            );
          }
        } else {
          console.error(
            'No se proporcionó ni ID ni orderNumber para eliminar la venta.'
          );
        }
      } catch (error) {
        console.error('Error al eliminar la venta:', error);
      }
    },
    [removeDocument, queryDocuments]
  );

  const searchVentas = useCallback(
    async (criteria: {
      customerName?: string;
      creationDate?: string;
      orderNumber?: string;
    }) => {
      const baseQuery = queryDocuments();
      const results = await getDocs(baseQuery);
      const allVentas = results.docs.map((doc) => doc.data() as Venta);

      let filteredVentas = allVentas.filter(
        (venta) => venta.customerInfo && venta.orderDate
      );

      if (criteria.customerName) {
        filteredVentas = filteredVentas.filter(
          (venta) =>
            venta.customerInfo.name &&
            venta.customerInfo.name
              .toLowerCase()
              .includes((criteria.customerName ?? '').toLowerCase())
        );
      }

      if (criteria.creationDate) {
        filteredVentas = filteredVentas.filter((venta) => {
          const [day, month, year] = venta.orderDate.split('/');

          return (
            day?.includes(criteria.creationDate ?? '') ||
            month?.includes(criteria.creationDate ?? '') ||
            year?.includes(criteria.creationDate ?? '')
          );
        });
      }

      if (criteria.orderNumber) {
        filteredVentas = filteredVentas.filter(
          (venta) =>
            venta.orderNumber &&
            (venta.orderNumber ?? '').includes(criteria.orderNumber)
        );
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

  const fetchAllVentas = useCallback(async () => {
    const results = await getDocs(queryDocuments());
    return results.docs.map((doc) => doc.data() as Venta);
  }, [queryDocuments]);

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
      fetchAllVentas,
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
      fetchAllVentas,
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
