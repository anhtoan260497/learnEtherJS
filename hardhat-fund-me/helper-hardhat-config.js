const networkConfig = {
  4: {
    name: "rinkby",
    ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    blockConfirmations : 6
  },
  5: {
    name: "goerli",
    ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    blockConfirmations : 6
  },
};

const DECIMALS = 8
const INITIAL_ANSWER = 200000000000

module.exports = { networkConfig , DECIMALS, INITIAL_ANSWER };
