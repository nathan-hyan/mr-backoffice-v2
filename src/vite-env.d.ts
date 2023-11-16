/// <reference types="vite/client" />

export type Nullable<T> = T | null;
export type StateDispatch<T> = Dispatch<SetStateAction<T>>;

declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
