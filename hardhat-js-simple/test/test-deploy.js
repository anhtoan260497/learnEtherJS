const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", () => {
  let SimpleStorageFactory, simpleStorage;
  beforeEach(async () => {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorageFactory.deploy();
  });
  it("Should start with a favorite number of 0", async () => {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    assert.equal(currentValue.toString(), expectedValue);
  });

  it("Should update when called store", async () => {
    const expectedValue = "7";
    const transactionResponse = await simpleStorage.store(7);
    await transactionResponse.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    assert.equal(updatedValue.toString(), expectedValue);
  });
});
