// @ts-check

/// <reference types='jQuery' />
/// <reference types='web3' />

const contractAddress = '0x03DCaFeEF7CA5EC547EdCd276CEF27B0275EA5Fc';
const contractOwner = '0x39d5a03d6ff8186bd40531fa5bda2c99d6a84210';

/**
 * Extraer error del smart contract y mapear con constantes 
 * 
 * 
 * 
 */




let ethereum = window['ethereum'];
// @ts-ignore
let web3 = new Web3(ethereum);

async function getJson(file) {
  let response = await fetch(file);
  let data = await response.json()
  return data;
}
let json;

let account;
const data = '0x6164646974696f6e616c2064617461';
getJson('./contracts/TicketContract.json').then(data => json = data);

$((doument) => {

  $('.enableEthereumButton').on('click', getAccount);

  $('.createButton').on('click', create);

  $('.buyButton').on('click', buy);


});


ethereum.on('accountsChanged', async (accounts) => {
  // Time to reload your interface with accounts[0]!

  await getAccount();
  // toLowerCase()
  showPanels();

})

function showPanels(){
  if (account === contractOwner) {
    $('#ownerView').show();
    $('#buyerView').hide();
  } else {
    $('#ownerView').hide();
    $('#buyerView').show();
  }
  console.log(account);
}

ethereum.on('chainChanged', (networkId) => {
  // Time to reload your interface with the new networkId
  console.log(networkId);
})


async function getAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  account = accounts[0];
  $('.accountLabel').text(account);
  showPanels();
}

async function create() {
  const showName = $('#showName').val();
  const showPriceWei = $('#showPriceWei').val();
  const showTime = $('#showTime').val();
  const initialSupply = $('#initialSupply').val();
  const maxSellPerPerson = $('#maxSellPerPerson').val();

  const price = web3.utils.toWei(showPriceWei);

  try {
    const ticketContractWeb3 = new web3.eth.Contract(json.abi, contractAddress);
    ticketContractWeb3.setProvider(ethereum);
    const tx = await ticketContractWeb3.methods.create(showName, price, initialSupply, maxSellPerPerson, showTime, data).send({ from: account });
    console.log(tx.transactionHash);
  } catch (error) {
    console.log(error);
    debugger;
  }
}

async function buy() {
  try {
    const id = $('#id').val();
    const amount = $('#amount').val();
    const priceWei = $('#priceWei').val();

    const price = web3.utils.toWei(priceWei);

    const ticketContractWeb3 = new web3.eth.Contract(json.abi, contractAddress);
    ticketContractWeb3.setProvider(ethereum);

    const tx = await ticketContractWeb3.methods
      .buy(id, amount, data)
      .send({ from: account, value: price });

    console.log(tx.transactionHash);
  } catch (error) {
    console.log(error);
    debugger;
  }

}