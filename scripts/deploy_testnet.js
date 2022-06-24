const hre = require("hardhat");

async function main() {
  const CONTRIBUTION_END_TIME = 2000;
  const QUORUM = 60;
  const VOTE_TIME = 500;
  const [deployer] = await hre.ethers.getSigners();

  const DAO = await hre.ethers.getContractFactory("DAO");
  const dao = await DAO.deploy(CONTRIBUTION_END_TIME, VOTE_TIME, QUORUM);

  await dao.deployed();
  console.log("Contract address:", dao.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });


  //Contract address: 0x7d7827f9A8CBf2FC848269D4542e40128088AFA1 - deployed to Infura