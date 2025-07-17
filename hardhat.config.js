require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const INFURA = process.env.INFURA_API_KEY || "your-infura-api-key";
const SEPOLIA = process.env.SEPOLIA_PRIVATE_KEY || "your-private-key";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "your-etherscan-api-key";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.23",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA}`,
      accounts: [SEPOLIA]
    }
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY
    }
  }
};
