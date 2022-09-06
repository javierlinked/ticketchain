require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-truffle5");

const dotenv = require("dotenv");
dotenv.config();
const { PROJECT_ID, MNEMONIC, ETHERSCAN_API_KEY, PK } = process.env;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      inject: false,
      // accounts: {
      //   mnemonic: MNEMONIC
      // },
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
