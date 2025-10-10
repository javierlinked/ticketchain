import { HardhatUserConfig } from "hardhat/config";
import { CONFIG } from "./utils/config.js";
// Import Hardhat Ignition plugin
import hardhatIgnitionPlugin from "@nomicfoundation/hardhat-ignition";
import hardhatVerify from "@nomicfoundation/hardhat-verify";

const config: HardhatUserConfig = {
  plugins: [hardhatIgnitionPlugin, hardhatVerify],
  solidity: '0.8.20',
  verify: {
    etherscan: {
      apiKey: CONFIG.ETHERSCAN_API_KEY,
    }
  },
  networks: {
    hardhat: {
      chainId: 31337,
      type: 'edr-simulated',
      chainType: 'l1'
    },
    localhost: {
      chainId: 31337,
      url: 'http://127.0.0.1:8545',
      type: 'http',
    },
    sepolia: {
      chainId: 11155111,
      url: `https://sepolia.infura.io/v3/${CONFIG.INFURA_API_KEY}`,
      accounts: [CONFIG.DEPLOYER_KEY],
      type: 'http',
    },
    mainnet: {
      chainId: 1,
      url: `https://mainnet.infura.io/v3/${CONFIG.INFURA_API_KEY}`,
      accounts: [CONFIG.DEPLOYER_KEY],
      type: 'http',
    },
  },
};

export default config;
