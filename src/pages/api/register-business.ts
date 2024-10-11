import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { companyType, companyName, email, phone, city, address, state, hash } = req.body;

        // Validação simples para garantir que todos os campos foram preenchidos
        if (!companyType || !companyName || !email || !phone || !city || !address || !state || !hash) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        try {
            // Insere os dados da empresa no banco de dados junto com o hash da transação
            const company = await prisma.business.create({
                data: {
                    companyType,
                    companyName,
                    email,
                    phone,
                    city,
                    address,
                    state,
                    hash, // Armazena o hash da transação na blockchain
                },
            });

            // Retorna uma mensagem de sucesso
            res.status(200).json({ message: 'Empresa cadastrada com sucesso', company });
        } catch (error) {
            console.error('Erro ao cadastrar empresa:', error);
            res.status(500).json({ message: 'Erro ao cadastrar empresa.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}
