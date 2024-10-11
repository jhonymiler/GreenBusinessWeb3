import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useContractPlatform } from '@/contracts/managment';


export default function WasteGenerator() {
    const { hash, isPending, isConfirming, isConfirmed, submit } = useContractPlatform('registerRecycler', []);

    return (
        <Card>
            <Card.Body>
                <Card.Title>Sou Gerador de Resíduos</Card.Title>
                <Card.Text>
                    Clique aqui para se cadastrar como Gerador de Redíduos.
                    {hash && <div>Transaction Hash: {hash}</div>}
                    {isConfirming && <div>Waiting for confirmation...</div>}
                    {isConfirmed && <div>Transaction confirmed.</div>}
                </Card.Text>
                <Button variant="primary" disabled={isPending} onClick={submit} >Cadastrar</Button>
            </Card.Body>
        </Card>
    );
}

