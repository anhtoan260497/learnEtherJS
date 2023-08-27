//imports
const { ethers, run, network } = require("hardhat");

//async main
const main = async () => {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("deploying contract...");
  const simpleStorage = await simpleStorageFactory.deploy();
  await simpleStorage.waitForDeployment()
  if(network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY ){
    console.log('waiting for blocks txns..')
    await simpleStorage.deploymentTransaction().wait(6)
    await verify(await simpleStorage.getAddress(),[])
  }

  console.log(`Deploy contract to ${await simpleStorage.getAddress()}`)

  const currentValue = await simpleStorage.retrieve()
  console.log(`Current Value is ${currentValue}`)

  const transactionRepsonse = await simpleStorage.store(7)
  await transactionRepsonse.wait(1)
  const updatedValue =  await simpleStorage.retrieve()
  console.log(`Updated value is : ${updatedValue}`)
};

const verify = async (contractAddress, args) => {
  console.log("Verify contract....");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (err) {
    if (err.message === "already verifired") {
      console.log("already verify");
    } else {
      console.log(err);
    }
  }
};

// main()
main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
