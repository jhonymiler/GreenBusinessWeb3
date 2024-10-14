import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ConnectWallet from '../ConnectWallet';
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import Link from 'next/link'; // Importando o componente Link do Next.js

export default function Menu() {

    return (
        <>
            <Head>
                <title>Empresa Verde</title>
                <meta name="description" content="Sistema de certificação ambiental" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} href="/">Home</Nav.Link> {/* Link otimizado */}
                        <Nav.Link as={Link} href="/authorizeds">Empresas autorizadas</Nav.Link>
                        <Nav.Link as={Link} href="/certifieds">Empresas verdes</Nav.Link>
                        <Nav.Link as={Link} href="/register">Me Registrar</Nav.Link>
                    </Nav>
                    <ConnectWallet />
                </Container>
            </Navbar>
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
