module.exports = {
  networks: {
    development: {
      host: "172.30.128.1", // Endereço do Ganache
      port: 7545,           // Porta padrão do Ganache
      network_id: "*",      // Qualquer network id
      gas: 6721975,         // Limite de gas
    },
  },
  compilers: {
    solc: {
      version: "0.8.19",
      settings: {
        optimizer: {
          enabled: true,
          runs: 1500
        }
      }
    },
  },
};
