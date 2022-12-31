const hre = require("hardhat");

const contractAddress = "0x193b6C015284273aB130DcccaB00fB71F1C0E795";

async function main() {
    await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [],
    });

    console.log("Contract verified!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});