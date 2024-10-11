# Use a imagem do Node.js
FROM node:20.17.0

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale o Truffle globalmente
RUN yarn global add truffle && yarn

# Copie todos os arquivos do projeto para o container
COPY . .

# Comando padrão para rodar a aplicação
CMD ["sh", "-c", "truffle migrate --reset development && yarn dev"]
