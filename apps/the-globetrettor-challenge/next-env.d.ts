/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VERCEL?: string;
    }
  }
}

export {};
