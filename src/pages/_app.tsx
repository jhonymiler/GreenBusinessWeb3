// src/pages/_app.tsx
import RainbowKitUIProvider from "@/providers/RainbowKitUIProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <RainbowKitUIProvider>
        <Component {...pageProps} />
      </RainbowKitUIProvider>
    </SessionProvider>
  );
}
