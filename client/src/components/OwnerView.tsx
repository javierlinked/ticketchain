import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import React, { ChangeEvent, FormEvent, MouseEventHandler, SyntheticEvent, useState } from 'react';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { DEBUG, TICKETSERVICE_CONTRACT_ADDRESS } from '../constants';
import TICKETSERVICE_ABI from 'contracts/build/contracts/contracts/TicketContract.sol/TicketContract.json';
import { TicketContract } from 'contracts/build/types/';
import { toWei } from '../utils';
import { Button } from './Button';

const initialValues = { showName: '', showPriceWei: '0', initialSupply: 0, maxSellPerPerson: 0, infoUrl: '' };
export interface OwnerViewProps {
  children?: React.ReactNode;
}

export const OwnerView: React.FC<OwnerViewProps> = ({ children }) => {


  const [state, setState] = useState(initialValues);
  // const [showName, setShowName] = useState<string>('');
  // const [showPriceWei, setShowPriceWei] = useState<string>('');
  // const [initialSupply, setInitialSupply] = useState<number>(0);
  // const [maxSellPerPerson, setMaxSellPerPerson] = useState<number>(0);
  // const [infoUrl, setInfoUrl] = useState<string>('');

  const { address } = useAccount();
  let isError = false;

  // custom hook we made in hooks.ts for writing functions
  // const { writeAsync, isError } = useTicketServiceFunctionWriter('ticketService');

  // rainbow kit txn handler
  const addRecentTransaction = useAddRecentTransaction();

  // const onChange = (e: FormEvent) => {
  //   setState({ [e.target.name]: e.target.value });
  //   e.preventDefault();
  // }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    type myField = keyof typeof initialValues;
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [e.target.name]: e.target.value }))
     e.preventDefault();
  }

  const handleSubmit = (e: SyntheticEvent) => {
    const { showName, showPriceWei, initialSupply, maxSellPerPerson, infoUrl } = state;
    debugger;
    console.log(e);
    if (!showName || !showPriceWei || !initialSupply || !maxSellPerPerson || !infoUrl || !address) {
      DEBUG && console.table(state);
      DEBUG && console.log({ address });
      alert('noop');
      return;
    }

    try {
      e.preventDefault();

      console.log('submit!');

      // DEBUG && console.log({ showName, showPriceWei, initialSupply, maxSellPerPerson, infoUrl });

      const amountToWei = toWei(showPriceWei);
      DEBUG && console.log('amountToWei: ', amountToWei);

      const functionArgs: Parameters<TicketContract['create']> = [
        showName,
        amountToWei,
        initialSupply,
        maxSellPerPerson,
        infoUrl,
        address
      ];


      const { config } = usePrepareContractWrite({
        addressOrName: TICKETSERVICE_CONTRACT_ADDRESS,
        contractInterface: TICKETSERVICE_ABI.abi,
        functionName: 'create',
        args: functionArgs

      })
      const { data, isLoading, isSuccess, write, status } = useContractWrite(config);

      isError = status === 'error'
      // const tx = await writeAsync({ recklesslySetUnpreparedArgs: functionArgs });

      write?.();

      if (data) {

        console.log('tx >>> ', data);

        addRecentTransaction({
          hash: data.hash,
          description: 'Create Project Transaction',
        });
      }

    } catch (err) {
      console.log('errror >>> ', err);
    }
  };



  return (

    <div id='ownerView'>
      <h3>Contract Owner: Create show token</h3>
      <form id='contactForm' >
        <fieldset>
          <div>
            <input id='showName' type='text' placeholder='Show name' onChange={onChange} />
            <label htmlFor='showName'>Show name</label>
          </div>
          <div >
            <input id='showPriceWei' type='text' placeholder='Show price' onChange={onChange} />
            <label htmlFor='showPriceWei'>Show price</label>
          </div>
          <div >
            <input id='initialSupply' placeholder='Initial supply' type='number' onChange={onChange} />
            <label htmlFor='initialSupply'>Initial supply</label>
          </div>
          <div >
            <input id='maxSellPerPerson' type='number' placeholder='maxSellPerPerson' onChange={onChange} />
            <label htmlFor='maxSellPerPerson'>Maximum sell per person</label>
          </div>
          <div>
            <input id='infoUrl' type='text' placeholder='info Url' onChange={onChange} />
            <label htmlFor='infoUrl'>Info url</label>
          </div>



          {/* if error occures display text to try again */}
          {isError && (
            <div>
              <p className='text-red-500 text-xs italic'>
                Error occured! Please try again!.
              </p>
            </div>
          )}
        </fieldset>
      </form>
      <div >
        <button onClick={handleSubmit}>create</button>
      </div>
    </div>


    //    <h3>Contract Owner: Create show token</h3>
    // <table id='table-tokens'>
    //   <thead><th scope='col'>id</th>
    //     <th scope='col'>col1</th>
    //     <th scope='col'>col2</th>
    //   </thead>
    //   <tbody>
    //     <tr>
    //       <td>1</td>
    //       <td>2</td>
    //       <td>3</td>
    //     </tr>
    //     <tr>
    //       <td>1</td>
    //       <td>2</td>
    //       <td>3</td>
    //     </tr>
    //   </tbody>
    // </table>

  );
};
