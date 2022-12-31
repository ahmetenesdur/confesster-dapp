const hre = require("hardhat");
const fs = require('fs-extra')

async function main() {
  const Confesster = await hre.ethers.getContractFactory("Confesster");
  const confesster = await Confesster.deploy();

  await confesster.deployed();

  console.log("Confesster deployed to:", confesster.address);

  // We also save the contract's artifacts and address in the frontend directory
  // so that we can use it in our frontend
  fs.writeFileSync(
    "config.js",
    `
    export const contractAddress = "${confesster.address}";
    export const ownerAddress = "${confesster.signer.address}";
    `
  )
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
