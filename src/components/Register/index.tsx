import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useContractPlatform } from '@/contracts/managment';

export default function Register() {
    const [formData, setFormData] = useState({
        companyType: 'geradora', // default option
        companyName: '',
        email: '',
        phone: '',
        city: '',
        address: '',
        state: '',
        hash: ''
    });

    // Chama os hooks incondicionalmente
    const recyclerHook = useContractPlatform('registerRecycler', []);
    const wasteProducerHook = useContractPlatform('registerWasteGenerator', []);
    const [registred, setRegistred] = useState(false);

    // Determina o hook com base no tipo de empresa selecionado
    const { isPending, isConfirming, isConfirmed, hash, submit } = formData.companyType === 'recicladora'
        ? recyclerHook
        : wasteProducerHook;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Submete a transação na blockchain
        await submit();

        // Verifica se a transação foi confirmada
        if (isConfirmed && hash && !registred) {
            try {
                // Atualiza o hash no formData para enviar para o backend
                const updatedFormData = { ...formData, hash };

                // Envia para a API de cadastro
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedFormData),
                });

                console.log(response);

                if (response.ok) {
                    toast.success('Empresa cadastrada com sucesso!');
                    setFormData({
                        companyType: 'geradora',
                        companyName: '',
                        email: '',
                        phone: '',
                        city: '',
                        address: '',
                        state: '',
                        hash: ''
                    });
                    setRegistred(false)
                } else {
                    toast.error('Falha no cadastro. Tente novamente.');
                }
            } catch (error) {
                console.error(error);
                toast.error('Erro ao se conectar com o servidor.');
            }
        } else {
            toast.error('Erro na transação. Não foi possível confirmar.');
        }
    };

    useEffect(() => {
        if (isConfirmed && hash) {
            const business = formData.companyType === 'geradora' ? "Geradora de resíduos" : "Recicladora";
            toast.success(`${business} cadastrada com sucesso na blockchain! 🎉`);
        }
    }, [isConfirmed, hash, formData]);


    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>Cadastro de Empresa</Card.Title>
                    <Card.Text>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formCompanyType">
                                    <Form.Label>Tipo de Empresa</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label="Recicladora"
                                        name="companyType"
                                        value="recicladora"
                                        checked={formData.companyType === 'recicladora'}
                                        onChange={handleChange}
                                        inline
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Geradora de Resíduos"
                                        name="companyType"
                                        value="geradora"
                                        checked={formData.companyType === 'geradora'}
                                        onChange={handleChange}
                                        inline
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formCompanyName">
                                    <Form.Label>Razão Social</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nome da Empresa"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formPhone">
                                    <Form.Label>Telefone</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Telefone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formCity">
                                    <Form.Label>Cidade</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Cidade"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formAddress">
                                <Form.Label>Endereço</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Endereço"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formState" className='mb-4'>
                                <Form.Label>Estado</Form.Label>
                                <Form.Select
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecione...</option>
                                    <option value="AC">Acre</option>
                                    <option value="AL">Alagoas</option>
                                    <option value="AP">Amapá</option>
                                    <option value="AM">Amazonas</option>
                                    <option value="BA">Bahia</option>
                                    <option value="CE">Ceará</option>
                                    <option value="DF">Distrito Federal</option>
                                    <option value="ES">Espírito Santo</option>
                                    <option value="GO">Goiás</option>
                                    <option value="MA">Maranhão</option>
                                    <option value="MT">Mato Grosso</option>
                                    <option value="MS">Mato Grosso do Sul</option>
                                    <option value="MG">Minas Gerais</option>
                                    <option value="PA">Pará</option>
                                    <option value="PB">Paraíba</option>
                                    <option value="PR">Paraná</option>
                                    <option value="PE">Pernambuco</option>
                                    <option value="PI">Piauí</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="RN">Rio Grande do Norte</option>
                                    <option value="RS">Rio Grande do Sul</option>
                                    <option value="RO">Rondônia</option>
                                    <option value="RR">Roraima</option>
                                    <option value="SC">Santa Catarina</option>
                                    <option value="SP">São Paulo</option>
                                    <option value="SE">Sergipe</option>
                                    <option value="TO">Tocantins</option>
                                </Form.Select>
                            </Form.Group>

                            {isConfirming && <div>Aguardando confirmação...</div>}

                            <Button type='submit' className='mt-4' variant="success" disabled={isPending}>
                                {isPending ? "Processando..." : "Cadastrar"}
                            </Button>
                        </Form>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}
