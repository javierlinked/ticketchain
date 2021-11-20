// @ts-check


const ssAddress = '0x03DCaFeEF7CA5EC547EdCd276CEF27B0275EA5Fc';

let ethereum = window['ethereum'];

async function getContract() {
  let response = await fetch('./contracts/TicketContract.json');
  let data = await response.json()
  return data;
}
let json;
getContract().then(data => json = data);



const ethereumButton = $('.enableEthereumButton');
const showAccount = $('.showAccount');
const createButton = $('.createButton');

let account;
const data = '0x6164646974696f6e616c2064617461';

createButton.on('click', create);

ethereumButton.on('click', getAccount);


async function getAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  account = accounts[0];
  showAccount.text(account);
}



async function create() {
  const showName = $('#showName').val();
  const showPriceWei = $('#showPriceWei').val();
  const showTime = $('#showTime').val();
  const initialSupply = $('#initialSupply').val();
  const maxSellPerPerson = $('#maxSellPerPerson').val();


  var web3 = new Web3(ethereum);


  try {


    const ticketContractWeb3 = new web3.eth.Contract(json.abi, ssAddress)
    ticketContractWeb3.setProvider(ethereum)

    const tx =  await ticketContractWeb3.methods.create(showName, showPriceWei, initialSupply, maxSellPerPerson, showTime, data).send({ from: ethereum.selectedAddress });
    console.log(tx.transactionHash);
    debugger;
  } catch (error) {
    console.log(error);
    debugger;
  }

}