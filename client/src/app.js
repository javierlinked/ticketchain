// @ts-check

/// <reference types='jQuery' />
/// <reference types='web3' />

const contractAddress = '0x6DbC09a28da5d48f04776CEBEB9B01F5ceb2b48c';
const contractOwner = '0x94DCCcDA7409eCec1b244158b98f1Fb9944100B5';

/**
 * Extraer error del smart contract y mapear con constantes 
 * 
 * Mejorar logica de contractAddress y contractOwner
 * 
 */


let ethereum = window['ethereum'];

let web3, account, data, json, constractInstance;

async function getJson(file) {
  let response = await fetch(file);
  let data = await response.json()
  return data;
}

async function init() {
  // @ts-ignore
  web3 = new Web3(ethereum);
  await getAccount();
  await getJson('./contracts/TicketContract.json').then(data => json = data);
  data = '0x6164646974696f6e616c2064617461';
  constractInstance = new web3.eth.Contract(json.abi, contractAddress);
  constractInstance.setProvider(ethereum);
}

$(async (doument) => {
  $('.enableEthereumButton').on('click', getTokens);
  $('.createButton').on('click', create);
  $('.buyButton').on('click', buy);
  await init();
});

ethereum.on('accountsChanged', async (accounts) => {
  showPanels();
})

function showPanels() {
  // TODO: search some library
  if (account.toLowerCase() === contractOwner.toLowerCase()) {
    $('#ownerView').show();
    $('#buyerView').hide();
  } else {
    $('#ownerView').hide();
    $('#buyerView').show();
  }
}

ethereum.on('chainChanged', (networkId) => {
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
  const initialSupply = $('#initialSupply').val();
  const showTime = $('#showTime').val();

  const maxSellPerPerson = $('#maxSellPerPerson').val();

  const price = web3.utils.toWei(showPriceWei);

  try {

    const tx = await constractInstance.methods.create(showName, price, initialSupply, showTime, maxSellPerPerson, data).send({ from: account });
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

    const tx = await constractInstance.methods
      .buy(id, amount, data)
      .send({ from: account, value: price });

    console.log(tx.transactionHash);
  } catch (error) {
    console.log(error);
    debugger;
  }
}

async function getTokens() {
  try {
    const tokenIdsLength = await constractInstance.methods.tokenIdsLength().call();
    const indexes = [...Array(parseInt(tokenIdsLength)).keys()];
    const ids = await Promise.all(indexes.map((_, i) => constractInstance.methods.tokenIds(i).call()));
    const arr = await Promise.all(ids.map((id) => constractInstance.methods.tickets(id).call()));
    console.log(arr);
    return arr;
  } catch (error) {
    console.log(error);
    debugger;
  }


}


