// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "./GreenSealToken.sol";
import "./GreenSealNFT.sol";

// Importação no VSCode
import "@openzeppelin/contracts/access/Ownable.sol";

// Importação no Remix
// import "@openzeppelin/contracts@4.9.6/access/Ownable.sol";

contract GreenSealPlatform is Ownable {
    GreenSealToken public token;
    GreenSealNFT public nft;

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
    Transaction[] public transactions;

    event RecyclerRegistered(address recycler);
    event WasteGeneratorRegistered(address generator);
    event TokensIssued(address generator, uint256 amount);
    event SealPurchased(address generator, uint256 sealId, GreenSealNFT.SealLevel level);

    constructor(address tokenAddress, address nftAddress){
        token = GreenSealToken(tokenAddress);
        nft = GreenSealNFT(nftAddress);
    }

    // Funções de registro
    function registerRecycler() external {
        recyclers[msg.sender] = Recycler({ isRegistered: true });
        emit RecyclerRegistered(msg.sender);
    }

    function registerWasteGenerator() external {
        wasteGenerators[msg.sender] = WasteGenerator({ isRegistered: true });
        emit WasteGeneratorRegistered(msg.sender);
    }

    // Função para registrar transações
    function recordTransaction(address generator, uint256 tonnes, string calldata invoiceKey) external {
        require(recyclers[msg.sender].isRegistered, "Caller is not a registered recycler");
        require(wasteGenerators[generator].isRegistered, "Generator is not registered");
        require(!invoiceKeys[invoiceKey], "Transaction with this invoice key already recorded");

        // Registrar a transação
        transactions.push(Transaction({
            generator: generator,
            recycler: msg.sender,
            amount: tonnes,
            invoiceKey: invoiceKey
        }));
        invoiceKeys[invoiceKey] = true;

        // Emitir tokens para o gerador de resíduos
        token.mint(generator, tonnes);

        emit TokensIssued(generator, tonnes);
    }

    // Função para comprar selos
    function purchaseSeal(GreenSealNFT.SealLevel level) external {
        require(wasteGenerators[msg.sender].isRegistered, "Caller is not a registered waste generator");

        uint256 requiredTokens;
        if (level == GreenSealNFT.SealLevel.Bronze) {
            requiredTokens = 10;
        } else if (level == GreenSealNFT.SealLevel.Prata) {
            requiredTokens = 100;
        } else if (level == GreenSealNFT.SealLevel.Ouro) {
            requiredTokens = 1000;
        } else {
            revert("Invalid seal level");
        }

        require(token.balanceOf(msg.sender) >= requiredTokens, "Not enough tokens to purchase this seal");

        // O gerador precisa aprovar a transferência de tokens primeiro
        token.transferFrom(msg.sender, address(this), requiredTokens);

        // Mintar o NFT do selo
        uint256 sealId = nft.mintSeal(msg.sender, level);

        emit SealPurchased(msg.sender, sealId, level);
    }
}
