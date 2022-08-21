const hre = require("hardhat");

async function main() {
  const TicketContract = await hre.ethers.getContractFactory('TicketContract')
  const db = await TicketContract.deploy()

  await db.deployed()

  console.log('TicketContract deployed at:', db.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })