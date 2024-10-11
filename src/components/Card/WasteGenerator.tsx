import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function WasteGenerator() {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Sou Gerador de Resíduos</Card.Title>
                <Card.Text>
                    Clique aqui para se cadastrar como Gerador de Redíduos.
                </Card.Text>
                <Button variant="primary">Cadastrar</Button>
            </Card.Body>
        </Card>
    );
}

