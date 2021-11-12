const TicketService = artifacts.require("TicketService");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("TicketService", function (/* accounts */) {
  it("should assert true", async function () {
    const contract = await TicketService.deployed();
    contract
    console.log(await contract.contract.methods.MINTER_ROLE().call());
    return assert.isTrue(true);
  });
});
