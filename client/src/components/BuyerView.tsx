import React from 'react';

import { useTicketServiceFunctionReader } from '../hook';

export interface BuyerViewProps {
  children?: React.ReactNode;
}

export const BuyerView: React.FC<BuyerViewProps> = ({ children }) => {
  const show = useTicketServiceFunctionReader({ functionName: 'tickets', args: [1] });
  const nonce = useTicketServiceFunctionReader({ functionName: 'nonce', args: [] });
  return (
    <>
      {/* <div>
        <pre>{JSON.stringify(show.data, 0, 2)}</pre>
      </div> */}
      <div>{JSON.stringify(nonce.data)}</div>
    </>
  );
};
