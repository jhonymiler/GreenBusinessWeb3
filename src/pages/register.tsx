// src/pages/index.tsx
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Menu from "@/components/Menu";
import Register from "@/components/Register";
import { Container } from "react-bootstrap";

export default function Home() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // ou uma tela de carregamento
    }

    return (
        <>
            <Menu />

            <Container className="mt-5">
                <h1>Cadastro de empresa</h1>
                <Register />
            </Container>
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
