import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useRegisterRecycler } from '@/contracts/managment';

export default function Recycler() {

    const { hash, isPending, isConfirming, isConfirmed, submit } = useRegisterRecycler();

    return (
        <Card >
            <Card.Body>
                <Card.Title>Sou Recicladora</Card.Title>
                <Card.Text>
                    Clique aqui para se cadastrar como recicladora.
                    {hash && <div>Transaction Hash: {hash}</div>}
                    {isConfirming && <div>Waiting for confirmation...</div>}
                    {isConfirmed && <div>Transaction confirmed.</div>}
                </Card.Text>
                <Button variant="primary" disabled={isPending} onClick={submit} >Cadastrar</Button>
            </Card.Body>
        </Card>
    );
}

