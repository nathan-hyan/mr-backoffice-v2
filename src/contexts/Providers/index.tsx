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
import { Providers } from 'types/data';

import { FirestoreCollections } from '~constants/firebase';
import useFirestore from '~hooks/useFirestore';

interface Props {
  children: ReactNode;
}

interface ProvidersContextType {
  providers: Providers[];
  createProvider: (provider: Providers) => Promise<void>;
  updateProvider: (id: string, updatedProvider: Providers) => void;
  deleteProvider: (id: string) => void;
  fetchProviders: () => void;
  fetchLoading: boolean;
  creatingLoading: boolean;
  updateLoading: boolean;
  searchProviders: (criteria: {
    name?: string;
    creationDate?: string;
  }) => Promise<Providers[]>;
  calculateDaysUntilExpiration: (
    orderDate: string,
    nextexpiration: string
  ) => number;
  getProviderWithRestDays: () => Promise<string>;
  fetchAllProviders: () => Promise<Providers[]>;
}

const ProvidersContext = createContext<ProvidersContextType | null>(null);

export default function ProvidersProvider({ children }: Props) {
  const [providers, setProviders] = useState<Providers[]>([]);

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
  } = useFirestore<Providers>(FirestoreCollections.Providers);

  const fetchProviders = useCallback(() => {
    return subscribeToData((data: Providers[]) => {
      setProviders(data);
    });
  }, [subscribeToData]);

  const createProvider = useCallback(
    async (provider: Providers) => {
      const today = new Date().toISOString().split('T')[0];
      provider.orderDate = today;
      try {
        const docRef = await addDocument(provider);

        if ('id' in docRef) {
          const newProvider = { ...provider, id: docRef.id };

          setProviders((prevProviders) => [...prevProviders, newProvider]);

          await updateDocument(docRef.id, newProvider);
        } else {
          console.error('Failed to create document ID:', docRef);
        }
      } catch (error) {
        console.error('Error creating provider:', error);
      }
    },
    [addDocument, updateDocument]
  );

  const updateProvider = useCallback(
    async (id: string, updatedProvider: Providers) => {
      if (!id || !updatedProvider) {
        throw new Error('Invalid id or updatedProvider');
      }
      await updateDocument(id, updatedProvider);
      setProviders((prevProviders) =>
        prevProviders.map((provider) =>
          provider.id === id ? updatedProvider : provider
        )
      );
    },
    [updateDocument]
  );

  const deleteProvider = useCallback(
    async (id: string) => {
      await removeDocument(id);
      setProviders((prevProviders) =>
        prevProviders.filter((provider) => provider.id !== id)
      );
    },
    [removeDocument]
  );

  const searchProviders = useCallback(
    async (criteria: { name?: string; creationDate?: string }) => {
      const baseQuery = queryDocuments();
      const results = await getDocs(baseQuery);
      const allProviders = results.docs.map((doc) => doc.data() as Providers);

      let filteredProviders = allProviders;

      if (criteria.name) {
        filteredProviders = filteredProviders.filter(
          (provider) =>
            provider.name &&
            provider.name
              .toLowerCase()
              .includes((criteria.name ?? '').toLowerCase())
        );
      }

      if (criteria.creationDate) {
        filteredProviders = filteredProviders.filter((provider) => {
          const [year, month, day] = provider.orderDate.split('-');

          return (
            day?.includes(criteria.creationDate ?? '') ||
            month?.includes(criteria.creationDate ?? '') ||
            year?.includes(criteria.creationDate ?? '')
          );
        });
      }

      return filteredProviders;
    },
    [queryDocuments]
  );

  const calculateDaysUntilExpiration = useCallback(
    (orderDate: string, nextexpiration: string): number => {
      const today = new Date();
      const expirationDate = new Date(nextexpiration);
      const timeDiff = expirationDate.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return daysDiff;
    },
    []
  );

  const getProviderWithRestDays = useCallback(
    async (providerId: string) => {
      const provider = await getLastDocument(providerId);
      if (provider) {
        const restDays = calculateDaysUntilExpiration(
          provider.orderDate,
          provider.nextexpiration
        );
        provider.restDays = restDays.toString();
      }
      return provider;
    },
    [getLastDocument, calculateDaysUntilExpiration]
  );

  const fetchAllProviders = useCallback(async () => {
    const results = await getDocs(queryDocuments());
    return results.docs.map((doc) => doc.data() as Providers);
  }, [queryDocuments]);

  const value = useMemo(
    () => ({
      providers,
      createProvider,
      updateProvider,
      deleteProvider,
      fetchProviders,
      fetchLoading,
      creatingLoading,
      updateLoading,
      searchProviders,
      calculateDaysUntilExpiration,
      fetchAllProviders,
      getProviderWithRestDays,
    }),
    [
      providers,
      createProvider,
      updateProvider,
      deleteProvider,
      fetchProviders,
      fetchLoading,
      creatingLoading,
      updateLoading,
      searchProviders,
      calculateDaysUntilExpiration,
      fetchAllProviders,
      getProviderWithRestDays,
    ]
  );

  return (
    <ProvidersContext.Provider value={value}>
      {children}
    </ProvidersContext.Provider>
  );
}

export { ProvidersContext, ProvidersProvider };

export const useProviders = () => {
  const ctx = useContext(ProvidersContext);

  if (!ctx) {
    throw new Error("You're not using the correct context!");
  }

  return ctx;
};
