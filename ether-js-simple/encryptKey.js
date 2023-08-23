const ethers = require('ethers')
const fs = require('fs')
require('dotenv').config()

const main = async () => {
    const wallet  = new ethers.Wallet(process.env.PRIVATE_KEY)
    const encryptJsonKey = await wallet.encrypt(process.env.PRIVATE_KEY_PASSWORD, process.env.PRIVATE_KEY)
    console.log(encryptJsonKey)
    fs.writeFileSync('./encryptedKey.json',encryptJsonKey)
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
