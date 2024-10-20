import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Container, Row, Button } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Menu from "@/components/Menu";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { useSession } from "next-auth/react";

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
    console.log('Session on client:', session);
  }, [session]);

  if (!mounted) {
    return null; // ou uma tela de carregamento
  }

  return (
    <>
      <Menu />
      <Container>
        <Row className='mt-5 mb-2'>
          <h1>Empresa Verde</h1>
          <p>Sistema de certificação ambiental</p>
        </Row>
        <Row className='mt-5 mb-2'>
          {session?.user?.isRegistered ? (
            <p>Bem-vindo, {session.user.name}! Você já está registrado.</p>
          ) : (
            <>
              <p>Você ainda não está registrado.</p>
              <Link href="/register" passHref legacyBehavior>
                <Button variant="primary">
                  Registrar-se
                </Button>
              </Link>
            </>
          )}
        </Row>
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
