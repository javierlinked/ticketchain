// @ts-check

const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');

ethereumButton.addEventListener('click', () => {
  getAccount();
});

async function getAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  showAccount.innerHTML = account;
}


// import { abi } from './contracts/TicketContract.json'
// // jsonFile  import './contracts/TicketContract.json'
// let currentContractAddress='0x0000';

// // var json = await $.getJSON(jsonFile);

// // let abi = json.abi; 

// const initialisedContract = new web3.eth.Contract(abi, currentContractAddress);

//  initialisedContract.setProvider(App.web3Provider);