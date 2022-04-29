require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan")

const ALCHEMY_API_KEY = "bVbrOKfXH2T5GoMdybab9DA_4d6lwGIO";
const RINKEBY_PRIVATE_KEY = "ea2a4564813a36a9a00e2b236081ac120ef38f1a8d67cbd1d588c2e4cc01802d";
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${RINKEBY_PRIVATE_KEY}`]
    }
  },
  etherscan: {

    apiKey: "HIX6PQFP1MX8JJJUD2KW4HUIX14917SDHM"
  }
};
