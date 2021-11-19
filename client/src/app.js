// @ts-check


// todo: detectar si esta metamask.
// detectar en que red estoy o lanzar alerta

// detectar cambio de cuenta
//     ethereum.selectedAddress

// agregar datepicker


const ssAddress = '0x03DCaFeEF7CA5EC547EdCd276CEF27B0275EA5Fc';

// let contract;
// fetch('./contracts/TicketContract.json')
//   .then(async response => {
//     contract = await response.json();
//   })
// // .then(d => contract = d);

// $.getJSON('./contracts/TicketContract.json', function (data) {
// //import ticketContract from './contracts/TicketContract.json';

let json;
$.getJSON('./contracts/TicketContract.json', function (d) {
  json = d;
  console.log("success");
}).done(function () {
  console.log("second success");
})
  .fail(function () {
    console.log("error");
  })
  .always(function () {
    console.log("complete");
  });




const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');
const createButton = document.querySelector('.createButton');

let account;
const data = '0x6164646974696f6e616c2064617461';

createButton.addEventListener('click', create);

ethereumButton.addEventListener('click', getAccount);


async function getAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  account = accounts[0];
  showAccount.innerHTML = account;
}



async function create() {
  const showName = document.querySelector('#showName').value;
  const showPriceWei = document.querySelector('#showPriceWei').value;
  const showTime = document.querySelector('#showTime').value;
  const initialSupply = document.querySelector('#initialSupply').value;
  const maxSellPerPerson = document.querySelector('#maxSellPerPerson').value;


  var web3 = new Web3(window.ethereum);

  debugger;
  try {


    // let json; 
    // $.getJSON('./contracts/TicketContract.json').then((data) => json = data);

    //    let json = await $.getJSON('./contracts/TicketContract.json');


    // instantiate smart contract instance
    // console.log(contract.abi);


    const ticketContractWeb3 = new web3.eth.Contract(json.abi, ssAddress)
    ticketContractWeb3.setProvider(window.ethereum)

    await ticketContractWeb3.methods.create( showName, showPriceWei, initialSupply, maxSellPerPerson, showTime, data ).send({ from: ethereum.selectedAddress });



  } catch (error) {
    console.log(error);
    debugger;
  }

}



// import { abi } from './contracts/TicketContract.json'
// // jsonFile  import './contracts/TicketContract.json'
// let currentContractAddress='0x0000';

// // var json = await $.getJSON(jsonFile);

// // let abi = json.abi; 

// const initialisedContract = new web3.eth.Contract(abi, currentContractAddress);

//  initialisedContract.setProvider(App.web3Provider);