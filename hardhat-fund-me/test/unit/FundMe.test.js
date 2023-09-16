const { assert, expect } = require("chai");
const {
  deployments,
  ethers,
  getNamedAccounts,
  getUnnamedAccounts,
} = require("hardhat");

describe("FundMe", async () => {
  let fundMe;
  let deployer;
  let aggregator;
  let ethSenderValue = ethers.parseEther("1");

  beforeEach(async () => {
    await deployments.fixture(["all"]);
    deployer =
      (await getNamedAccounts()).deployer || (await getUnnamedAccounts())[0];
    aggregator = await ethers.getContract("MockV3Aggregator");
    fundMe = await ethers.getContract("FundMe", deployer);
  });

  describe("Constructor", async () => {
    it("set the aggregator address correctly", async () => {
      const response = await fundMe.priceFeed();
      assert.equal(response, await aggregator?.getAddress());
    });
  });

  describe("FundMe", async () => {
    it("revert fundme required", async () => {
      await expect(fundMe.fund()).to.be.revertedWith(
        "You need to spend more ETH!"
      );
    });

    it("updated ETH", async () => {
      await fundMe.fund({ value: ethSenderValue });
      const response = await fundMe.addressToAmountFunded(deployer); // mapping must has agrs to get data
      assert.equal(response.toString(), ethSenderValue.toString());
    });

    it("has funder in array", async () => {
      await fundMe.fund({ value: ethSenderValue });
      const funder = await fundMe.funders(0);
      console.log(funder);
      assert.equal(funder, deployer);
    });
  });

  describe("Widthdraw", async () => {
    beforeEach(async () => {
      await fundMe.fund({ value: ethSenderValue });
    });

    it("widthdraw ETH from single funder", async () => {
      //before - create variable to determine different state of money
      const { provider } = ethers;
      const funderBeforeBalance = await provider.getBalance(deployer); // balance in wallet before widthdraw
      const contractBeforeBalance = await provider.getBalance(
        fundMe.getAddress()
      ); // balance in contract fundme before widthdraw
      // console.log("funderBeforeBalance", funderBeforeBalance);
      // console.log("contractBeforeBalance", contractBeforeBalance);

      //act - do the transaction
      const transactionResponse = await fundMe.withdraw();
      const transactionReceipt = await transactionResponse.wait(1);
      console.log(transactionReceipt);

      //gasCost - calculate gas fee
      const { gasUsed, gasPrice } = transactionReceipt;
      const gasCost = gasUsed * gasPrice; // gasFeeCalc -- type === bigNumber

      //assert - create condition to assert
      const funderAfterBalance = await provider.getBalance(deployer); // balance in wallet after widthdraw
      const contractAfterBalance = await provider.getBalance(
        fundMe.getAddress()
      ); // balance in contract fundme after widthdraw
      assert.equal(contractAfterBalance, 0); // contractAfterBalance === 0
      assert.equal(
        (funderAfterBalance + gasCost).toString(), // funderAfterBalance  + gasCost = contractBeforeBalance + funderBeforeBalance
        (funderBeforeBalance + contractBeforeBalance).toString()
      );
    });
  });
});
