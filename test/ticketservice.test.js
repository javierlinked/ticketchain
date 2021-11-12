const TicketContract = artifacts.require("TicketContract");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("TicketContract", async accounts => {
  const [contractOwner, alice] = accounts;

  it("should assert true", async  () => {
    const contract = await TicketContract.deployed();
    console.log(await contract.contract.methods.CINEMA().call());
    return assert.isTrue(true);
  });

  it("should transfer", async () => {
    const contract = await TicketContract.deployed();

    await contract.safeTransferFrom(contractOwner, alice, 1, 10, web3.utils.fromAscii('hola'));

    assert.equal(await contract.balanceOf(alice, 1), 10);
    assert.equal(await contract.balanceOf(contractOwner, 1), 90);
    
  });
});