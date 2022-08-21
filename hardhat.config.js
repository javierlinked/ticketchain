require("@nomicfoundation/hardhat-toolbox");

const dotenv = require("dotenv");
dotenv.config();
const { PROJECT_ID, MNEMONIC, ETHERSCAN_API_KEY, PK } = process.env;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${PROJECT_ID}`,
      // accounts: {
      //   mnemonic: MNEMONIC
      // },
    }
  },
  solidity: {
    version: "0.8.15",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
};
