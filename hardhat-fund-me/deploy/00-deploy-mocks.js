const { getNamedAccounts, deployments, network } = require("hardhat");

const {
  networkConfig,
  DECIMALS,
  INITIAL_ANSWER,
} = require("../helper-hardhat-config");

module.exports = async () => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  const ethUsdPriceFeed = networkConfig[chainId]?.ethUsdPriceFeed;

  if (!ethUsdPriceFeed) {
    log("Local network detected ");
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_ANSWER],
    });

    log("Mocks deployed");
    log("-----------------------------");
  }
};


module.exports.tags = ['all','mocks']