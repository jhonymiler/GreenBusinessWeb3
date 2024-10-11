// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Importação no VSCode
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Importação no Remix
// import "@openzeppelin/contracts@4.9.6/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts@4.9.6/access/Ownable.sol";

contract GreenSealToken is ERC20, Ownable {
    constructor() ERC20("GreenSealToken", "GST") {
         _mint(msg.sender, 1000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
