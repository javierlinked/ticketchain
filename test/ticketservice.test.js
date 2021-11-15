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
  const data = web3.utils.fromAscii('additional data');

  beforeEach(async () => {
    [contractOwner, alice, bob] = accounts;
    contract = await TicketContract.new();
    console.log('contractOwner', await web3.eth.getBalance(  contractOwner));
    console.log('alice', await web3.eth.getBalance( alice));
  });


  // string memory name,
  // uint256 price,
  // uint256 amount,
  // uint256 maxSell,
  // bytes memory data


  // it("should be able to create a new Token show", async () => {
  //   await contract.create('Cinema Paradiso DEC 4', 5, 100, 4, data, { from: contractOwner });

  //   const id = await contract.nonce();
  //   assert.equal(await contract.balanceOf(contractOwner, id), 100);
  // });

  it.only("should be able to sell tokens", async () => {
    await contract.create('Cinema Paradiso DEC 4', 4, 100, 4, data, { from: contractOwner });

    const idJustCreated = await contract.nonce();

    await contract.buy(idJustCreated, 99, data, { from: alice, value: 16 });
    // console.log(await contract.tickets(1));

    console.log('contractOwner', await web3.eth.getBalance(   contractOwner));
    console.log('alice', await web3.eth.getBalance(  alice));

    assert.equal(await contract.balanceOf(alice, idJustCreated), 4);
  });



  // 2 Partner transfers tickets
  // 3 Customer transfers tickets
  // 4 Presents tickets and X burns tickets

  // it("should assert true", async () => {
  //   console.log(await contract.contract.methods.CINEMA().call());
  //   return assert.isTrue(true);
  // });

  // it("should transfer", async () => {
  //   const abountToTransfer = 2;

  //   // en un objecto se pasa el msg como contexto ?
  //   await contract.safeTransferFrom(contractOwner, alice, 1, abountToTransfer, web3.utils.fromAscii('hola'), { from: contractOwner });

  //   // error
  //   // await contract.safeTransferFrom(contractOwner, alice, 1, 10, web3.utils.fromAscii('hola'), {from: alice});


  //   assert.equal(await contract.balanceOf(alice, 1), abountToTransfer);
  //   assert.equal(await contract.balanceOf(contractOwner, 1), 100 - abountToTransfer);

  // });

  // it("should transfer2", async () => {
  //   const abountToTransfer = 2;

  //   // en un objecto se pasa el msg como contexto ?
  //   await contract.safeTransferFrom(contractOwner, alice, 1, abountToTransfer, web3.utils.fromAscii('hola'), { from: contractOwner });

  //   // error
  //   // await contract.safeTransferFrom(contractOwner, alice, 1, 10, web3.utils.fromAscii('hola'), {from: alice});


  //   assert.equal(await contract.balanceOf(alice, 1), abountToTransfer);
  //   assert.equal(await contract.balanceOf(contractOwner, 1), 100 - abountToTransfer);


  // });


  // it("should transfer3", async () => {
  //   const abountToTransfer = 2;

  //   // en un objecto se pasa el msg como contexto ?
  //   await contract.safeTransferFrom(contractOwner, alice, 1, abountToTransfer, web3.utils.fromAscii('hola'), { from: contractOwner });
  //   // error
  //   // await contract.safeTransferFrom(contractOwner, alice, 1, 10, web3.utils.fromAscii('hola'), {from: alice});


  //   assert.equal(await contract.balanceOf(alice, 1), abountToTransfer);
  //   assert.equal(await contract.balanceOf(contractOwner, 1), 100 - abountToTransfer);

  // });
});