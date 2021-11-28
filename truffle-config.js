const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = process.env.MNEMONIC;
const projectId = process.env.PROJECT_ID;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/contracts"),
  compilers: {
    solc: {
      version: "0.8.10",
    }
  },
  networks: {
    develop: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*"        // Any network (default: none)           
    },
    rinkeby: {
      provider: function () {
        // return new HDWalletProvider(mnemonic, `wss://rinkeby.infura.io/ws/v3/${projectId}`);
        return new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${projectId}`);
      },
      network_id: 4,
      gas: 4500000,  //4116150
      gasPrice: 10000000000,
      networkCheckTimeout: 10000, 
    }
  }
};