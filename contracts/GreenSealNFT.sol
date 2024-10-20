// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Importação no VSCode
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Importação no Remix
// import "@openzeppelin/contracts@4.9.6/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts@4.9.6/access/Ownable.sol";

contract GreenSealNFT is ERC721, Ownable {
    uint256 public currentTokenId;

    enum SealLevel { Bronze, Prata, Ouro }

    mapping(uint256 => SealLevel) public sealLevels;

    event SealMinted(address indexed to, uint256 indexed tokenId, SealLevel level);
    event SealBurned(address indexed from, uint256 indexed tokenId, SealLevel level);

    constructor() ERC721("GreenSealNFT", "GSN") {}

    function mintSeal(address to, SealLevel level) external onlyOwner returns (uint256) {
        currentTokenId++;
        _safeMint(to, currentTokenId);
        sealLevels[currentTokenId] = level;
        
        emit SealMinted(to, currentTokenId, level);
        return currentTokenId;
    }

    function burn(uint256 tokenId) external onlyOwner {
        require(_exists(tokenId), "Token nao existe");
        SealLevel level = sealLevels[tokenId];
        address owner = ownerOf(tokenId);
        _burn(tokenId);
        delete sealLevels[tokenId];
        
        emit SealBurned(owner, tokenId, level);
    }

    // Tornar NFTs intransferíveis
    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal override {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
        require(from == address(0) || to == address(0), "Transferencias nao permitidas");
    }

    // Remover funções de aprovação
    function approve(address /*to*/, uint256 /*tokenId*/) public virtual override {
        revert("Aprovacao nao permitida");
    }

    function setApprovalForAll(address /*operator*/, bool /*approved*/) public virtual override {
        revert("Aprovacao nao permitida");
    }
}