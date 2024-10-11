import Menu from "@/components/Menu";
import Register from "@/components/Register";
import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAccount } from 'wagmi'

export default function Home() {

  const { isConnected } = useAccount()
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

      </Container >
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
