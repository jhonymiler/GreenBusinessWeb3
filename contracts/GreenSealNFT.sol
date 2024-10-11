// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Importação no VSCode
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Importação no Remix
// import "@openzeppelin/contracts@4.9.6/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts@4.9.6/access/Ownable.sol";

contract GreenSealNFT is ERC721, Ownable {
    uint256 public currentTokenId;

    enum SealLevel { Bronze, Prata, Ouro }

    struct Seal {
        uint256 id;
        SealLevel level;
    }

    mapping(uint256 => Seal) public seals;

    constructor() ERC721("GreenSealNFT", "GSN")  {
        // Passando msg.sender como o proprietário inicial
    }

    function mintSeal(address to, SealLevel level) external onlyOwner returns (uint256) {
        currentTokenId++;
        _safeMint(to, currentTokenId);
        seals[currentTokenId] = Seal(currentTokenId, level);
        return currentTokenId;
    }
}
