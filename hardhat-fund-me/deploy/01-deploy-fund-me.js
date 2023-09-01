const { network, getNamedAccounts, deployments } = require("hardhat");

const { networkConfig } = require("../helper-hardhat-config");

const deployFunc = async () => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  let ethUsdPriceFeed;
  if (networkConfig[chainId]?.ethUsdPriceFeed) {
    ethUsdPriceFeed = networkConfig[chainId].ethUsdPriceFeed;
  } else {
    ethUsdAgrregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeed = ethUsdAgrregator.address;
  }

  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [ethUsdPriceFeed],
    log: true,
  });

  console.log("ethUsdPriceFeed : ", ethUsdPriceFeed);

  log("------------------------------------------");
};

module.exports = deployFunc;

module.exports.tags = ["all", "fundme"];
