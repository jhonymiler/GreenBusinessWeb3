import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useContractPlatform } from '@/contracts/managment';
import { toast } from 'react-hot-toast';

export default function Recycler() {

    const { hash, isPending, isConfirming, isConfirmed, submit } = useContractPlatform('registerRecycler', []);

    if (isConfirmed) {
        toast.success(
            <div>
                Recicladora cadastrada com sucesso! 🎉 <br />
                Hash: {hash}
            </div>
        );
    }

    return (
        <Card >
            <Card.Body>
                <Card.Title>Sou Recicladora</Card.Title>
                <Card.Text>
                    Clique aqui para se cadastrar como recicladora.
                    {isConfirming && <div>Waiting for confirmation...</div>}
                </Card.Text>
                <Button variant="primary" disabled={isPending} onClick={submit} >Cadastrar</Button>
            </Card.Body>
        </Card>
    );
}

