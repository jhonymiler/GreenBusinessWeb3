
# GreenBusinessWeb3

## Instruções de Instalação

### Passo a Passo da Instalação do MetaMask

1. Acesse a loja de extensões do seu navegador (Chrome, Firefox, etc.).
2. Busque por "MetaMask" e instale a extensão oficial.
3. Após a instalação, abra a extensão e siga as instruções para configurar sua carteira.
4. Quando solicitado, adicione uma nova rede e selecione a rede apropriada para este projeto (ex: Ethereum Mainnet, Testnet).

### Adicionar a Conta ao MetaMask

1. Abra o MetaMask e vá para a opção de importar uma conta.
2. Insira a chave privada da primeira conta da lista abaixo:

```
   Available Accounts
   ==================
   (0) 0xa508dD875f10C33C52a8abb20E16fc68E981F186 (100 ETH)
   (1) 0xd4039eB67CBB36429Ad9DD30187B94f6A5122215 (100 ETH)
   (2) 0x7633Fe8542c2218B5A25777477F63D395aA5aFB4 (100 ETH)
   (3) 0xd5cC383881D6d9A7dc1891A0235E11D03Cb992d3 (100 ETH)
   (4) 0xa1D9cBa049eAfF292F654e416773470Ad939d6Ae (100 ETH)
   (5) 0xc86E95d8c0a8352C0c633b51dc3de22Bd96D9E50 (100 ETH)
   (6) 0x5D109a0eB89D225181cd2bF03eE3f60f8B1cd2e6 (100 ETH)
   (7) 0x4c3Da80eAEc19399Bc4ce3486ec58755a875d645 (100 ETH)
   (8) 0xFc9077ACeD8cedAf17796e2992067b9BF8dd0764 (100 ETH)
   (9) 0x8d242e4bc081e2eeD5eb9d6BF734DdF5d2F435e0 (100 ETH)

   Private Keys
   ==================
   (0) 0x22aabb811efca4e6f4748bd18a46b502fa85549df9fa07da649c0a148d7d5530
   (1) 0x64e02814da99b567a92404a5ac82c087cd41b0065cd3f4c154c14130f1966aaf
   (2) 0xd8f1eaefad7a8410020a1ebb39d68bfe78cede745e235e3f9e7d50cfe7454b14
   (3) 0x390f8b5dd939337d7ca7ccb18f0a81deade0ff1595e9149e9ae94f5a6d74117f
   (4) 0x03af29fc0ada658eae910100911c47d1c1ec11555359fc8f9aba2c9c2682f2c0
   (5) 0xe81d183d832dfc9ad417fa4c0eed5a68ca0b01c2ad56904188f8a3f7c13b1938
   (6) 0xb36054b09ad0f09f554a4f43bd08854b7fe4c4d6e686191db1a8b2bc3c24c3ba
   (7) 0x054efa1eee99e1804826501e678f6e867bb34c4970e08245e1000ae3618bf7fc
   (8) 0x78331762940660e755900794a8792bcf2bd8ae24eb068ec8e5a0715a28259f1c
   (9) 0x45d1442d025d4953eea1de3f4942007c320eed3a0804f38991c838ec09cc8225

   HD Wallet
   ==================
   Mnemonic:      minimum symptom minute gloom tragic situate silver mechanic salad amused elite beef
```

3. Confirme e a conta será adicionada ao seu MetaMask.

### Iniciar a Aplicação

1. Certifique-se de que você tem Docker instalado em sua máquina.
2. No diretório do projeto, execute o seguinte comando para iniciar a aplicação:

   ```bash
   docker-compose up -d
   ```

3. Isso irá iniciar a aplicação em segundo plano.
4. Liste os logs do container da aplicação e você verá os contratos que fizeram deploy. Copie os endereços dos contratos:
```bash
   2_deploy_contracts.js
   =====================

      Replacing 'GreenSealToken'
      --------------------------
      > transaction hash:    0xd899a5ba93dc303bbc2b08838149a1f2052112a6129d50ee24a8c2fe8d17ef80
   - Fetching solc version list from solc-bin. Attempt #1
   - Downloading compiler. Attempt #1.
   - Blocks: 0            Seconds: 0
      > Blocks: 0            Seconds: 0
      > contract address:    0xa506e15a75677487C24229f9A3e81CbC61C75164 # Endereço do primeiro contrato
      > block number:        95
      > block timestamp:     1728684169
      > account:             0xa508dD875f10C33C52a8abb20E16fc68E981F186
      > balance:             68.95083236
      > gas used:            841656 (0xcd7b8)
      > gas price:           20 gwei
      > value sent:          0 ETH
      > total cost:          0.01683312 ETH


      Replacing 'GreenSealNFT'
      ------------------------
      > transaction hash:    0xdd72707d4e04acb9ccdd148bdae513483c71bc754c54683dfb69f31b0fa0b413
   - Fetching solc version list from solc-bin. Attempt #1
   - Downloading compiler. Attempt #1.
   - Blocks: 0            Seconds: 0
      > Blocks: 0            Seconds: 0
      > contract address:    0x10F0D87964C436E591bF941B42Dc241C141Db3B9 # Endereço do segundo contrato
      > block number:        96
      > block timestamp:     1728684170
      > account:             0xa508dD875f10C33C52a8abb20E16fc68E981F186
      > balance:             68.92124504
      > gas used:            1479366 (0x1692c6)
      > gas price:           20 gwei
      > value sent:          0 ETH
      > total cost:          0.02958732 ETH


      Replacing 'GreenSealPlatform'
      -----------------------------
      > transaction hash:    0xf5a91796fbc8abcaaf967b04dd60a142cd83820d8f7a4dd870c4733f9380bcac
   - Fetching solc version list from solc-bin. Attempt #1
   - Downloading compiler. Attempt #1.
   - Blocks: 0            Seconds: 0
      > Blocks: 0            Seconds: 0
      > contract address:    0x75Cd67E5d038BA0cF748c8B4e08553Fa586CC9e4 # Endereço do terceiro contrato
      > block number:        97
      > block timestamp:     1728684170
      > account:             0xa508dD875f10C33C52a8abb20E16fc68E981F186
      > balance:             68.90044194
      > gas used:            1040155 (0xfdf1b)
      > gas price:           20 gwei
      > value sent:          0 ETH
      > total cost:          0.0208031 ETH

      > Saving artifacts
      -------------------------------------
      > Total cost:          0.06722354 ETH

   Summary
   =======
   > Total deployments:   3
   > Final cost:          0.06722354 ETH
```
5. Em posse dos endereços alimente o arquivo .env:
```
NEXT_PUBLIC_CONTRACT_TOKEN=0x10F0D87964C436E591bF941B42Dc241C141Db3B9
NEXT_PUBLIC_CONTRACT_NFT=0x10F0D87964C436E591bF941B42Dc241C141Db3B9
NEXT_PUBLIC_CONTRACT_PLATFORM=0x75Cd67E5d038BA0cF748c8B4e08553Fa586CC9e4
```
   
6. Entre dentro do container da aplicação e rode o comando de migração das tabelas do banco de dados:
   
```
npx prisma migrate dev --name init
```

### Acessar a Aplicação

- Abra o navegador e acesse o seguinte endereço: [http://localhost:3000](http://localhost:3000)

Pronto! Sua aplicação estará funcionando localmente.
