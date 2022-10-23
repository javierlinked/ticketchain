import { useContract, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";

import TICKETSERVICE_ABI  from 'contracts/build/contracts/contracts/TicketContract.sol/TicketContract.json'
import { TICKETSERVICE_CONTRACT_ADDRESS } from "./constants";
import { TicketContract } from 'contracts/build/types/';


/*//////////////////////////////////////////////////////////////
                              Ticket Service
//////////////////////////////////////////////////////////////*/

export function useTicketServiceContract(): TicketContract {
  const contract = useContract({
    addressOrName: TICKETSERVICE_CONTRACT_ADDRESS,
    contractInterface: TICKETSERVICE_ABI.abi,
  });

  return contract as TicketContract;
}

// // create a generic hook to access write functions of contract
// export function useTicketServiceFunctionWriter(
//     functionName: string
//   ): ReturnType<typeof contractPrepare> {
//     const contractPrepare = usePrepareContractWrite({
//       addressOrName: TICKETSERVICE_CONTRACT_ADDRESS,
//       contractInterface: TICKETSERVICE_ABI.abi,
//       functionName
//     });
  
//     return contractPrepare;
//   }

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
    addressOrName: TICKETSERVICE_CONTRACT_ADDRESS,
    contractInterface: TICKETSERVICE_ABI.abi,
    functionName: functionName,
    args: args,
    watch: true,
  });

  return contractRead;
}
