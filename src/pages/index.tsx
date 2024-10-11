import Recycler from "@/components/Card/Recycler";
import WasteGenerator from "@/components/Card/WasteGenerator";
import Menu from "@/components/Menu";
import Head from "next/head";
import { Col, Container, Row } from "react-bootstrap";

export default function Home() {
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
        <Row>
          <Col xs={12} md={6}>
            <Recycler />
          </Col>
          <Col xs={12} md={6}>
            <WasteGenerator />
          </Col>
        </Row>
      </Container >
    </>
  );
}
