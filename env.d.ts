/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_ALLOWED_PUBLIC_ROUTES: string;
    readonly VITE_FIREBASE_API_KEY: string;
    readonly VITE_FIREBASE_AUTH_DOMAIN: string;
    readonly VITE_FIREBASE_PROJECT_ID: string;
    readonly VITE_FIREBASE_STORAGE_BUCKET: string;
    readonly VITE_FIREBASE_MESSAGING_SENDER_ID: number;
    readonly VITE_FIREBASE_MESSAGING_APP_ID: string;
    readonly VITE_FIREBASE_MESSAGING_MEASURAMENT_ID: string;
    readonly VITE_LOCAL_ENV: boolean;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
