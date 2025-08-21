/* eslint-disable no-console */
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getDocs } from 'firebase/firestore';

import { FirestoreCollections } from '~constants/firebase';
import useFirestore from '~hooks/useFirestore';

interface Props {
  children: ReactNode;
}

interface Tag {
  tag: string;
}

interface TagContextType {
  tags: string[];
  fetchTags: () => Promise<void>;
  loading: boolean;
}

const TagContext = createContext<TagContextType | null>(null);

export default function TagProvider({ children }: Props) {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { queryDocuments } = useFirestore<Tag>(FirestoreCollections.Tags);

  const fetchTags = useCallback(async () => {
    setLoading(true);
    try {
      const query = queryDocuments();
      const snapshot = await getDocs(query);

      const tagList = snapshot.docs
        .map((doc) => {
          const data = doc.data();
          return data.tag;
        })
        .filter(Boolean);

      setTags(tagList);
    } catch (error) {
      console.error('Error al obtener tags:', error);
    } finally {
      setLoading(false);
    }
  }, [queryDocuments]);

  useEffect(() => {}, []);

  const value = useMemo(() => {
    return {
      tags,
      fetchTags,
      loading,
    };
  }, [tags, fetchTags, loading]);

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
}

export const useTags = () => {
  const ctx = useContext(TagContext);
  if (!ctx) throw new Error("You're not using el TagContext correctamente!");
  return ctx;
};
