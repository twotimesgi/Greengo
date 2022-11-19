import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
require('dotenv').config({ path: __dirname + '/.env' })

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 80001
    },
    alfajores: {
      url: `https://alfajores-forno.celo-testnet.org`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};

export default config;
