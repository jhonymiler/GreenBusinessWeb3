// src/pages/index.tsx
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Menu from "@/components/Menu";
import Register from "@/components/Register";
import { Container } from "react-bootstrap";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
    const session = await getServerSession(context.req, context.res, authOptions);

    return {
        props: {
            session,
        },
    };
};
