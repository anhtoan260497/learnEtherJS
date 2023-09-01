const { network, getNamedAccounts, deployments } = require("hardhat");

const { networkConfig } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

const deployFunc = async () => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log(deployer); // error , getNamedAccounts return {}
  const chainId = network.config.chainId;
  let ethUsdPriceFeed;
  if (networkConfig[chainId]?.ethUsdPriceFeed) {
    ethUsdPriceFeed = networkConfig[chainId]?.ethUsdPriceFeed;
  } else {
    console.log(deployments);
    ethUsdAgrregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeed = ethUsdAgrregator.address;
  }
  const args = [ethUsdPriceFeed];
  return;
  // console.log(deployer)
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args,
    log: true,
    blockConfirmations: networkConfig[chainId].blockConfirmations || 1,
  });

  if (
    !networkConfig[chainId]?.ethUsdPriceFeed &&
    process.env.ETHERSCAN_API_KEY
  ) {
    verify(fundMe.address, args);
  }

  //   console.log("ethUsdPriceFeed : ", ethUsdPriceFeed);

  log("------------------------------------------");
};

module.exports = deployFunc;

module.exports.tags = ["all", "fundme"];
