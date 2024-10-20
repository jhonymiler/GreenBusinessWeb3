// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Importação no VSCode
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Importação no Remix
// import "@openzeppelin/contracts@4.9.6/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts@4.9.6/token/ERC20/extensions/ERC20Burnable.sol";
// import "@openzeppelin/contracts@4.9.6/access/Ownable.sol";

contract GreenSealToken is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("GreenSealToken", "GST") {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    // Permitir que o proprietário queime tokens de qualquer conta sem aprovação prévia
    function burnFrom(address account, uint256 amount) public override {
        if (msg.sender == owner()) {
            _burn(account, amount);
        } else {
            super.burnFrom(account, amount);
        }
    }
}
