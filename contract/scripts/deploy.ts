import '@nomiclabs/hardhat-ethers'
import { ethers } from 'hardhat'

async function main() {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)

  console.log('Account balance:', (await deployer.getBalance()).toString())

  const TicketService = await ethers.getContractFactory('TicketContract')
  const contract = await TicketService.deploy()

  console.log('Token address:', contract.address)

  // The transaction that was sent to the network to deploy the Contract
  console.log('Token transaction:', contract.deployTransaction.hash)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
