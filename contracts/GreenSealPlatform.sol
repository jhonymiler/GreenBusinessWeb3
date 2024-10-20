// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;


import "./GreenSealToken.sol";
import "./GreenSealNFT.sol";

// Importação no VSCode
import "@openzeppelin/contracts/access/Ownable.sol";

// Importação no Remix
// import "@openzeppelin/contracts@4.9.6/access/Ownable.sol";

contract GreenSealPlatform is Ownable {
    GreenSealNFT public nft;
    GreenSealToken public token;
    Transaction[] public transactions;

    struct Recycler {
        bool isRegistered;
    }

    struct WasteGenerator {
        bool isRegistered;
    }

    struct Transaction {
        address generator;
        address recycler;
        uint256 amount;
        string invoiceKey;
    }

    mapping(address => Recycler) public recyclers;
    mapping(address => WasteGenerator) public wasteGenerators;
    mapping(string => bool) public invoiceKeys;

    event RecyclerRegistered(address recycler);
    event WasteGeneratorRegistered(address indexed generator);
    event TokensIssued(address generator, uint256 amount);
    event SealPurchased(address indexed generator, uint256 sealId, GreenSealNFT.SealLevel level);

    constructor(address tokenAddress, address nftAddress) {
        token = GreenSealToken(tokenAddress);
        nft = GreenSealNFT(nftAddress);
    }

    // Funções de Registro
    function registerRecycler() external {
        recyclers[msg.sender] = Recycler({ isRegistered: true });
        emit RecyclerRegistered(msg.sender);
    }

    function registerWasteGenerator() external {
        wasteGenerators[msg.sender] = WasteGenerator({ isRegistered: true });
        emit WasteGeneratorRegistered(msg.sender);
    }

    // Registrar uma transação
    function recordTransaction(address generator, uint256 tonnes, string calldata invoiceKey) external {
        require(recyclers[msg.sender].isRegistered, "Chamador nao e um reciclador registrado");
        require(wasteGenerators[generator].isRegistered, "Gerador nao esta registrado");
        require(!invoiceKeys[invoiceKey], "Transacao com esta chave de fatura ja registrada");

        // Registrar a transacao
        transactions.push(Transaction({
            generator: generator,
            recycler: msg.sender,
            amount: tonnes,
            invoiceKey: invoiceKey
        }));
        invoiceKeys[invoiceKey] = true;

        // Emitir tokens para o gerador de residuos
        token.mint(generator, tonnes);

        emit TokensIssued(generator, tonnes);
    }

    // Comprar um selo
    function purchaseSeal(GreenSealNFT.SealLevel level, uint256 lowerLevelTokenId) external {
        require(wasteGenerators[msg.sender].isRegistered, "Chamador nao e um gerador de residuos registrado");

        uint256 requiredTokens;

        if (level == GreenSealNFT.SealLevel.Bronze) {
            requiredTokens = 10;
            // Não precisa fornecer lowerLevelTokenId
        } else if (level == GreenSealNFT.SealLevel.Prata) {
            requiredTokens = 100;
            require(nft.ownerOf(lowerLevelTokenId) == msg.sender, "Voce nao possui o selo de nivel inferior");
            require(nft.sealLevels(lowerLevelTokenId) == GreenSealNFT.SealLevel.Bronze, "Selo nao e do nivel Bronze");
            // Queimar o selo de nivel inferior
            nft.burn(lowerLevelTokenId);
        } else if (level == GreenSealNFT.SealLevel.Ouro) {
            requiredTokens = 1000;
            require(nft.ownerOf(lowerLevelTokenId) == msg.sender, "Voce nao possui o selo de nivel inferior");
            require(nft.sealLevels(lowerLevelTokenId) == GreenSealNFT.SealLevel.Prata, "Selo nao e do nivel Prata");
            // Queimar o selo de nivel inferior
            nft.burn(lowerLevelTokenId);
        } else {
            revert("Nivel de selo invalido");
        }

        // Verificar saldo de tokens
        require(token.balanceOf(msg.sender) >= requiredTokens, "Nao ha tokens suficientes para comprar este selo");

        // Queimar tokens
        token.burnFrom(msg.sender, requiredTokens);

        // Mintar o novo selo
        uint256 newSealId = nft.mintSeal(msg.sender, level);

        emit SealPurchased(msg.sender, newSealId, level);
    }
}
