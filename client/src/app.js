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

let web3, account, data, json, constractInstance, shows;

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
// $(document).ready(function () {
//   bindActions();
// })

$(async (doument) => {
  $('.enableEthereumButton').on('click', getTokens);
  $('.createButton').on('click', create);
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

async function buy(id, amount, price) {
  alert('buy' + id);
  alert('buy' + amount);
  alert('buy' + price);
  try {
    const value = amount * price;

    const tx = await constractInstance.methods
      .buy(id, amount, data)
      .send({ from: account, value });

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

    shows = arr.map((t) => {
      delete t['0'];
      delete t['1'];
      delete t['2'];
      delete t['3'];
      delete t['4'];
      //  t.price = web3.utils.toWei(t.price);
      return t;
    });

    const table = makeTableHtml(shows);
    // document.getElementById('tockentList').insertAdjacentHTML('beforeend', table);
    document.getElementById('tockentList').innerHTML += table;
    bindActions();
    return shows;
  } catch (error) {
    console.log(error);
    debugger;
  }
}

function makeTableHtml(arr) {

  let table = [];
  let top_row = [];
  let rows = [];

  for (let i = 0; i < arr.length; i++) {
    let cells = [];

    for (let property in arr[i]) {
      if (top_row.length < Object.keys(arr[i]).length) {
        top_row.push(`<th scope="col">${property}</th>`);
      }
      if (arr[i][property] === null) {
        cells.push(`<td>${null}</td>`);
      } else {
        cells.push(`<td>${arr[i][property]}</td>`);
      }
    }
    cells.push(`<td><input type="number" id="amount-${arr[i]['id']}" class="form-control" placeholder="amount"></input></td>`);

    cells.push(`<td><button id="buy-${arr[i]['id']}" class="btn btn-primary"   >Buy</button></td>`);

    rows.push(`<tr>${cells.join("")}</tr>`);

  }

  table.push(`<table class="table card-table table-striped">`);
  table.push(`<thead>${top_row.join("")}</thead>`);
  table.push(`<tbody>${rows.join("")}<tbody>`);
  table.push("</table>");
  return table.join("");
}



function bindActions() {
  for (const show of shows) {
    $('#buy-' + show.id).on('click', function () {
      var ammount = $(this).closest('tr').find('#amount-' + show.id).val();
      buy(show.id, ammount, show.price);
    })
  }
}