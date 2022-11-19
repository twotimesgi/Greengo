const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");
const networkName = hre.network.name;

async function main() {

  const link = networkName === "hardhat" ? "hardhat" : "https://explorer.celo.org/alfajores/address"

  const Campaign = await hre.ethers.getContractFactory("Campaign");
  console.log("Deploying campaign...");
  const amount = ethers.utils.parseUnits("0.01", "ether")
  const dateInSecs = Math.floor(new Date().getTime() / 1000);
  const campaign = await Campaign.deploy("Test", amount, dateInSecs, dateInSecs + 1000);
  console.log("Campaign deployed to:", `${link}/${campaign.address}`);

  await campaign.deployed();

  const campaignData = {
    address: campaign.address,
    abi: JSON.parse(campaign.interface.format('json'))
  }

  //This writes the ABI and address to the campaign.json file
  fs.writeFileSync('./contracts/abi/campaign.json', JSON.stringify(campaignData))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
