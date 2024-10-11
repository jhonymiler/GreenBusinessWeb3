const GreenSealToken = artifacts.require("GreenSealToken");
const GreenSealNFT = artifacts.require("GreenSealNFT");
const GreenSealPlatform = artifacts.require("GreenSealPlatform");

module.exports = async function (deployer, network, accounts) {

    // Deploy the GreenSealToken with initialOwner
    await deployer.deploy(GreenSealToken, { from: accounts[0] });
    const tokenInstance = await GreenSealToken.deployed();

    // Deploy the GreenSealNFT with initialOwner
    await deployer.deploy(GreenSealNFT, { from: accounts[0] });
    const nftInstance = await GreenSealNFT.deployed();

    // Deploy the GreenSealPlatform with token and NFT addresses and initialOwner
    await deployer.deploy(GreenSealPlatform, tokenInstance.address, nftInstance.address);
    const platformInstance = await GreenSealPlatform.deployed();

    // Transfer ownership of the token and NFT contracts to the platform contract
    await tokenInstance.transferOwnership(platformInstance.address);
    await nftInstance.transferOwnership(platformInstance.address);
};
