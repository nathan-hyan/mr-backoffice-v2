/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_ALLOWED_PUBLIC_ROUTES: string[];
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
