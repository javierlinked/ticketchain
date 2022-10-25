import { ConnectButton } from '@rainbow-me/rainbowkit';

import { OwnerView } from './components/OwnerView';

function App() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 12,
        }}
      >
        <ConnectButton accountStatus={'full'} />
      </div>
      <div>
        <OwnerView></OwnerView>
      </div>
    </>
  );
}

export default App;
