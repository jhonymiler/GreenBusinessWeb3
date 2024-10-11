import ConnectWallet from "@/components/ConnectWallet";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Empresa Verde</title>
        <meta name="description" content="Sistema de certificação ambiental" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Empresa Verde</h1>
        <p>Sistema de certificação ambiental</p>
        <ConnectWallet />
      </main>
    </>
  );
}
