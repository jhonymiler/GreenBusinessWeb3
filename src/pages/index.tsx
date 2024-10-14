// src/pages/index.tsx
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Container, Row, Button } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Menu from "@/components/Menu";
import Link from "next/link";

import { Session } from "next-auth";

export default function Home({ session }: { session: Session | null }) {
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
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
