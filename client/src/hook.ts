import { useContract, useContractRead, usePrepareContractWrite } from 'wagmi';

import TICKETSERVICE_ABI from '../../contract/build/contracts/contracts/TicketContract.sol/TicketContract.json';
import { TicketContract } from '../../contract/build/types/';
import { TICKETSERVICE_CONTRACT_ADDRESS } from './constants';

/*//////////////////////////////////////////////////////////////
                              Ticket Service
//////////////////////////////////////////////////////////////*/

export function useTicketServiceContract(): TicketContract {
  const contract = useContract({
    address: TICKETSERVICE_CONTRACT_ADDRESS,
    abi: TICKETSERVICE_ABI.abi,
  });

  return contract as TicketContract;
}

// create a generic hook to access write functions of contract
export function useTicketServiceFunctionWriter(functionName: string) {
  const contractPrepare = usePrepareContractWrite({
    address: TICKETSERVICE_CONTRACT_ADDRESS,
    abi: TICKETSERVICE_ABI.abi,
    functionName,
  });

  return contractPrepare;
}

export interface UseTicketServiceFunctionReaderProps {
  functionName: string;
  args?: any[];
}
// create a generic hook to access read functions of contract
export function useTicketServiceFunctionReader({
  functionName,
  args,
}: UseTicketServiceFunctionReaderProps): ReturnType<typeof useContractRead> {
  const contractRead = useContractRead({
    address: TICKETSERVICE_CONTRACT_ADDRESS,
    abi: TICKETSERVICE_ABI.abi,
    functionName: functionName,
    args: args,
    watch: true,
  });

  return contractRead;
}
