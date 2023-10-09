/* eslint-disable react-hooks/exhaustive-deps */
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { Product } from 'types/data';

import { INITIAL_CONTEXT } from './constants';

import { FirebaseCollections } from '~constants/firebase';
import useFirestore from '~hooks/useFirestore';

interface Props {
    children: ReactNode;
}

const ProductContext = createContext(INITIAL_CONTEXT);

export default function ProductProvider({ children }: Props) {
    const [productList, setProductList] = useState<Product[]>([]);
    const { fetchData } = useFirestore<Product>(FirebaseCollections.Products);

    const value = useMemo(
        () => ({
            productList,
        }),
        [productList]
    );

    useEffect(() => {
        fetchData().then((res) => setProductList(res));
    }, [fetchData]);

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
}

export const useProducts = () => {
    const ctx = useContext(ProductContext);

    if (!ctx) {
        throw new Error("You're not using the correct context!");
    }

    return ctx;
};
