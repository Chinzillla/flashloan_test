require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const INFURA = process.env.INFURA_API_KEY || "your-infura-api-key";
const SEPOLIA = process.env.SEPOLIA_PRIVATE_KEY || "your-private-key";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "your-etherscan-api-key";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.23",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.8.10", //for aave
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ]
  },
  networks: {
    hardhat: {
      forking: {
        url: `https://sepolia.infura.io/v3/${INFURA}`,
      }
    },
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
