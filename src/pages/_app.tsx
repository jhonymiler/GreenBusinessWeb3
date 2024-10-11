import RainbowKitUIProvider from "@/providers/RainbowKitUIProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";


import type { AppProps } from "next/app";
import { SSRProvider } from "react-bootstrap";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RainbowKitUIProvider>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </RainbowKitUIProvider>
  );
}
