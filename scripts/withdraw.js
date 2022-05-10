// scripts/withdraw.js

const hre = require("hardhat");
const abi = require("../artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json");

async function getBalance(provider, address) {
  const balanceBigInt = await provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function main() {
  const contractAddress = "0x442C1134b6F3B57a39a02Eff26fDA5d005898113";
  const contractABI = abi.abi;

  // Get the node connection and wallet connection.
  const provider = new hre.ethers.getDefaultProvider(process.env.POLYGON_URL);
  // Ensure that signer is the SAME address as the original contract deployer,
  // or else this script will fail with an error.
  const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // Instantiate connected contract.
  const buyMeACoffee = new hre.ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  // Check starting balances.
  console.log(
    "current balance of owner: ",
    await getBalance(provider, signer.address),
    "Matic"
  );
  const contractBalance = await getBalance(provider, buyMeACoffee.address);
  console.log(
    "current balance of contract: ",
    await getBalance(provider, buyMeACoffee.address),
    "Matic"
  );

  // Withdraw funds if there are funds to withdraw.
  if (contractBalance !== "0.0") {
    console.log("withdrawing funds..");
    bu
    const withdrawTxn = await buyMeACoffee.withdrawTips({
      gasPrice: 50000000000000,
    });
    await withdrawTxn.wait();
  } else {
    console.log("no funds to withdraw!");
  }

  // Check ending balance.
  console.log(
    "current balance of owner: ",
    await getBalance(provider, signer.address),
    "Matic"
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
