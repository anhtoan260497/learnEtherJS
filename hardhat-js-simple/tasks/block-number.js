const {task} =  require('hardhat/config')

task("block-number","Prints current block number").setAction(
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`current Block number: ${blockNumber}`)
    }
)

module.exports = {}