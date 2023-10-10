/// <reference types="vite/client" />

export type Nullable<T> = T | null;
export type StateDispatch<T> = Dispatch<SetStateAction<T>>;
