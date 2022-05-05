import { useState, useEffect } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

export function ConnectWallet() {
  const providerOptions = {};

  const [ web3, setWeb3 ] = useState(null as any);
  const [ address, setAddress ] = useState(null);
  const [ provider, serProvider ] = useState(null as any);

  const handleSwitchNetwork = async () => {
    await window.web3.currentProvider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0xa516',
          chainName: 'Emerald Paratime',
          nativeCurrency: {
            name: 'ROSE',
            symbol: 'ROSE',
            decimals: 18,
          },
          rpcUrls: [ 'https://emerald.oasis.dev' ],
          blockExplorerUrls: [ 'https://explorer.emerald.oasis.dev' ],
        },
      ],
    });
  };

  const handleConnection = async () => {
    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
      providerOptions,
    });

    try {
      const prv = await web3Modal.connect();
      serProvider(prv as any);

      const w3 = new Web3(prv) as any;
      setWeb3(w3);

      await handleSwitchNetwork();

      const accounts = await w3.eth.getAccounts();
      setAddress(accounts[0]);
    } catch (err) {
      console.log('err connect', err);
    }
  };

  // Subscribe to accounts change
  provider?.on('accountsChanged', (accounts: string[]) => {
    console.log('accountschanged', accounts);

    setAddress(null);
  });

  // Subscribe to chainId change
  provider?.on('chainChanged', (chainId: number) => {
    console.log('chainchanged', chainId);

    setAddress(null);
  });

  // Subscribe to provider connection
  provider?.on('connect', (info: { chainId: number }) => {
    console.log('connect', info);
  });

  // Subscribe to provider disconnection
  provider?.on('disconnect', (error: { code: number; message: string }) => {
    console.log('disconnect', error);

    setAddress(null);
  });

  if (address) {
    return (
      <div className="inline-block w-40 py-2 border text-base rounded-md text-white border-white">
        {address}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => handleConnection()}
      className="inline-block w-40 py-2 border text-base rounded-md text-white border-white"
    >
      Connect
    </button>

  );
}
