const { run } = require("hardhat");

const verify = async (contractAddress, args) => {
  console.log("Verifying contract...");
  try {
    await run("verify", {
      address: contractAddress,
      constructorArguments: args,
    });

    console.log("verify Address", contractAddress);
    console.log("verify args", args);
  } catch (err) {
    if (err.message.toLowerCase().includes("already verify")) {
      console.log("Already Verified!");
      return;
    }
    console.log(err);
  }
};

module.exports = { verify };
