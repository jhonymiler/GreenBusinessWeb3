import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Container, Row, Button } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Menu from '@/components/Menu';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import { useGetBalance } from '@/contracts/managment';

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const userAddress = session?.user?.address;

  const { balance, isError, isLoading } = useGetBalance(userAddress);

  useEffect(() => {
    setMounted(true);
    console.log('Session on client:', session);
  }, [session]);

  if (!mounted) {
    return null; // or a loading screen
  }

  return (
    <>
      <Menu />
      <Container>
        <Row className='mt-5 mb-2'>
          {session?.user?.isRegistered ? (
            <>
              <h2>Balanço do Token</h2>
              <p>Bem-vindo, {session.user.name}!</p>
              {isLoading ? (
                <p>Carregando balanço...</p>
              ) : isError ? (
                <p>Erro ao carregar balanço.</p>
              ) : (
                <p>Seu balanço: {balance?.toString() || '0'} tokens</p>
              )}
            </>
          ) : (
            <>
              <h1>Empresa Verde</h1>
              <p>Sistema de certificação ambiental</p>
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
