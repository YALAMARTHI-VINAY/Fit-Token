/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_INFURA_ID: string;
  readonly VITE_FIT_TOKEN_ADDRESS: string;
  readonly VITE_FITBIT_CLIENT_ID: string;
  readonly VITE_GOOGLE_FIT_CLIENT_ID: string;
  readonly VITE_DEV_MODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
