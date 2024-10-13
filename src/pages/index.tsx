// src/pages/index.tsx
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Menu from "@/components/Menu";
import Register from "@/components/Register";
import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react';

export default function Home() {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // ou uma tela de carregamento
  }

  return (
    <>
      <Head>
        <title>Empresa Verde</title>
        <meta name="description" content="Sistema de certificação ambiental" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <Container>
        <Row className='mt-5 mb-2'>
          <h1>Empresa Verde</h1>
          <p>Sistema de certificação ambiental</p>
        </Row>
        {isConnected ? <Register /> : <p>Página de apresentação</p>}
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
      // outros props que você possa precisar
    },
  };
};
