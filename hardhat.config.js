/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require('dotenv').config({ path: __dirname + '/.env.local' });

// Possible network values
const TEST_NETWORK = "TEST_NETWORK";
const LOCAL_NETWORK = "LOCAL_NETWORK";

// By default network is set to local, change it to TEST_NETWORK to make a switch
const NETWORK = LOCAL_NETWORK;

const INFURA_URL = process.env.INFURA_URL;
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

let networks = {};
if (NETWORK == TEST_NETWORK) {
  networks = {
    test_network: {
      url: INFURA_URL,
      accounts: [`0x${WALLET_PRIVATE_KEY}`],
    },
  };
}

module.exports = {
  solidity: "0.8.13",
  networks: networks,
};
