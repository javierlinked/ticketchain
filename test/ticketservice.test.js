const TicketContract = artifacts.require('TicketContract');

/**
 *  TODO: 
 *    - CONSTANTS ERRORS ETC
 *    - HELPERS
 *  
 * 
 * const getErrorObj = (obj = {}) => {
  const txHash = Object.keys(obj)[0];
  return obj[txHash];
};
 */


/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract('TicketContract', async accounts => {
  let contractOwner, alice, bob;
  let contract;
  const data = web3.utils.fromAscii('additional data');
  // 0x6164646974696f6e616c2064617461

  beforeEach(async () => {
    [contractOwner, alice, bob] = accounts;
    contract = await TicketContract.new();
    // console.log('contractOwner', await web3.eth.getBalance(  contractOwner));
    // console.log('alice', await web3.eth.getBalance( alice));
  });


  it('should be able to create a new Token show', async () => {
    // act
    const id = await createTicket('Cinema Paradiso DEC 4', web3.utils.toWei('0.05'), 100, 4, contractOwner);

    // assert
    assert.equal(await contract.balanceOf(contractOwner, id), 100);
  });

  it('should be fail on creating new token when has not ownership', async () => {
    // act
    try {
      const id = await createTicket('Cinema Paradiso DEC 4', web3.utils.toWei('0.05'), 100, 4, alice);
    } catch (error) {

      //assert
      assert.equal(error.message, 'Returned error: VM Exception while processing transaction: revert Ownable: caller is not the owner -- Reason given: Ownable: caller is not the owner.');
    }
  });

  it('should be able to sell tokens', async () => {
    // arrange
    const id = await createTicket('Cinema Paradiso DEC 4', web3.utils.toWei('0.05'), 100, 4, contractOwner);

    // act
    await contract.buy(id, 4, data, { from: alice, value: web3.utils.toWei('0.2') });

    // assert
    assert.equal(await contract.balanceOf(alice, id), 4);
  });

  it('should fail on selling when contract is paused', async () => {
    // arrange
    const id = await createTicket('Cinema Paradiso DEC 4', web3.utils.toWei('0.05'), 100, 4, contractOwner);

    // act
    await contract.pause();
    try {
      await contract.buy(id, 4, data, { from: alice, value: web3.utils.toWei('0.2') });
    } catch (error) {

      //assert
      assert.equal(error.message, 'Returned error: VM Exception while processing transaction: revert Pausable: paused -- Reason given: Pausable: paused.');
    }
  });

  it('should fail on selling when not enough minted tickets', async () => {
    // arrange
    const id = await createTicket('Cinema Paradiso DEC 4', web3.utils.toWei('0.05'), 2, 4, contractOwner);

    // act
    try {
      await contract.buy(id, 4, data, { from: alice, value: web3.utils.toWei('0.2') });
    } catch (error) {

      //assert
      assert.equal(error.message, 'Returned error: VM Exception while processing transaction: revert Not enough tickets -- Reason given: Not enough tickets.');
    }
  });

  it('should fail on selling when trying to buy more than allowed', async () => {
    // arrange
    const id = await createTicket('Cinema Paradiso DEC 4', web3.utils.toWei('0.05'), 100, 4, contractOwner);

    // act
    try {
      await contract.buy(id, 8, data, { from: alice, value: web3.utils.toWei('0.4') });
    } catch (error) {

      //assert
      assert.equal(error.message, 'Returned error: VM Exception while processing transaction: revert Max ammount per person reached -- Reason given: Max ammount per person reached.');
    }
  });

  it('should fail on selling when trying to buy more than allowed honoring previous transactions', async () => {
    // arrange
    const id = await createTicket('Cinema Paradiso DEC 4', web3.utils.toWei('0.05'), 100, 4, contractOwner);

    // act
    try {
      // this should work
      await contract.buy(id, 2, data, { from: alice, value: web3.utils.toWei('0.1') });
      // this should fail
      await contract.buy(id, 3, data, { from: alice, value: web3.utils.toWei('0.15') });
    } catch (error) {

      //assert
      assert.equal(error.message, 'Returned error: VM Exception while processing transaction: revert Max ammount per person reached -- Reason given: Max ammount per person reached.');
    }
  });


  it('should fail on selling when trying to buy without enough funds', async () => {
    // arrange
    const id = await createTicket('Cinema Paradiso DEC 4', web3.utils.toWei('0.05'), 100, 4, contractOwner);

    // act
    try {
      await contract.buy(id, 2, data, { from: alice, value: web3.utils.toWei('0.02') });
    } catch (error) {

      //assert
      assert.equal(error.message, 'Returned error: VM Exception while processing transaction: revert Incorrect amount -- Reason given: Incorrect amount.');
    }
  });

  it('test counters', async () => {
    // arrange
    const id1 = await createTicket('Cinema Paradiso DEC 4', web3.utils.toWei('0.05'), 100, 4, contractOwner);
    const id2 = await createTicket('Cinema Paradiso DEC 4', web3.utils.toWei('0.05'), 100, 4, contractOwner);
    const id3 = await createTicket('Cinema Paradiso DEC 4', web3.utils.toWei('0.05'), 100, 4, contractOwner);
    const expected = [id1, id2, id3];

    // act
    const tokenIdsLengthBN = await contract.tokenIdsLength();
    const idBNs = await Promise.all(Array.from(Array(tokenIdsLengthBN.toNumber())).map((_, i) => contract.tokenIds(i)));
    const ids = idBNs.map((n) => n.toNumber());

    //assert
    assert.equal(tokenIdsLengthBN.toNumber(), 3);
    assert.deepEqual(expected, ids);
  });


  async function createTicket(name, price, amount, maxSellPerPerson, owner) {
    const infoUrl = 'someUrl';
    const imageUrl = 'otherUrl';
    let nonce = await contract.nonce();
    const newId = nonce.toNumber() + 1;
    await contract.create(name, price, amount, maxSellPerPerson, infoUrl, imageUrl, data, { from: owner });
    return newId;
  }
});