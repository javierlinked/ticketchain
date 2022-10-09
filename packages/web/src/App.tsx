import { ConnectButton } from '@rainbow-me/rainbowkit';

function App() {
  return (
    <>
      <div>
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
        >
          <ConnectButton accountStatus={'full'} />
        </div>
      </div>
    </>

  );
}

export default App;
