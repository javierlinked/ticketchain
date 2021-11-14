const TicketContract = artifacts.require("TicketContract");

// beforeEach(async function () {
//   console.log("beforeEach");
// });
/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("TicketContract", async accounts => {
  let contractOwner, alice, bob;
  let contract;

  beforeEach(async () => {
    console.log("beforeEach");
    [contractOwner, alice, bob] = accounts;
    contract = await TicketContract.new();
  });

  // 1 Partner mints tickets

  
// 2 Partner transfers tickets
// 3 Customer transfers tickets
// 4 Presents tickets and X burns tickets

  it("should assert true", async () => {
    console.log(await contract.contract.methods.CINEMA().call());
    return assert.isTrue(true);
  });

  it("should transfer", async () => {
    const abountToTransfer = 2;

    // en un objecto se pasa el msg como contexto ?
    await contract.safeTransferFrom(contractOwner, alice, 1, abountToTransfer, web3.utils.fromAscii('hola'), { from: contractOwner });

    // error
    // await contract.safeTransferFrom(contractOwner, alice, 1, 10, web3.utils.fromAscii('hola'), {from: alice});


    assert.equal(await contract.balanceOf(alice, 1), abountToTransfer);
    assert.equal(await contract.balanceOf(contractOwner, 1), 100 - abountToTransfer);

  });

  it("should transfer2", async () => {
    const abountToTransfer = 2;

    // en un objecto se pasa el msg como contexto ?
    await contract.safeTransferFrom(contractOwner, alice, 1, abountToTransfer, web3.utils.fromAscii('hola'), { from: contractOwner });

    // error
    // await contract.safeTransferFrom(contractOwner, alice, 1, 10, web3.utils.fromAscii('hola'), {from: alice});


    assert.equal(await contract.balanceOf(alice, 1), abountToTransfer);
    assert.equal(await contract.balanceOf(contractOwner, 1), 100 - abountToTransfer);

  });


  it("should transfer3", async () => {
    const abountToTransfer = 2;

    // en un objecto se pasa el msg como contexto ?
    await contract.safeTransferFrom(contractOwner, alice, 1, abountToTransfer, web3.utils.fromAscii('hola'), { from: contractOwner});
    // error
    // await contract.safeTransferFrom(contractOwner, alice, 1, 10, web3.utils.fromAscii('hola'), {from: alice});


    assert.equal(await contract.balanceOf(alice, 1), abountToTransfer);
    assert.equal(await contract.balanceOf(contractOwner, 1), 100 - abountToTransfer);

  });
});