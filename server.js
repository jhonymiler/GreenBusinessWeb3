const { createServer } = require('http');
const next = require('next');
const { JsonRpcProvider, Contract } = require('ethers'); // Importação usando require
const { PrismaClient } = require('@prisma/client');
require('dotenv').config(); // Configurações do dotenv

const prisma = new PrismaClient();

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

function getImg(level) {
    switch (level) {
        case 0:
            return '/bronze.png';
        case 1:
            return '/silver.png';
        case 2:
            return '/gold.png';
        default:
            return '/bronze.png';
    }
}

async function startListening() {
    console.log(process.env.NEXT_PUBLIC_RPC_URL);

    const provider = new JsonRpcProvider('http://ganache:8545');
    const nftAddress = process.env.NEXT_PUBLIC_CONTRACT_NFT;

    const nftABI = require('./build/contracts/GreenSealNFT.json').abi;

    const nftContract = new Contract(nftAddress, nftABI, provider);

    nftContract.on('SealMinted', async (to, tokenId, level) => {
        try {
            const business = await prisma.business.findUnique({
                where: { hash: to.toLowerCase() },
            });

            if (!business) {
                console.error(`Empresa não encontrada para o endereço: ${to}`);
                return;
            }

            await prisma.seal.create({
                data: {
                    token_id: tokenId.toString(),
                    level: level,
                    image: getImg(level),
                    business_id: business.id,
                },
            });

            console.log(`Selo mintado: TokenID ${tokenId}, Nível ${level}, Para ${to}`);
        } catch (err) {
            console.error('Erro ao criar selo:', err);
        }
    });

    nftContract.on('SealBurned', async (from, tokenId, level) => {
        await prisma.seal.delete({
            where: { token_id: tokenId.toString() },
        });
        console.log(`Selo queimado: TokenID ${tokenId}, Nível ${level}, De ${from}`);
    });
}

app.prepare().then(() => {
    startListening();

    createServer((req, res) => {
        handle(req, res);
    }).listen(3000, (err) => {
        if (err) throw err;
        console.log('> Servidor pronto na porta 3000');
    });
});
