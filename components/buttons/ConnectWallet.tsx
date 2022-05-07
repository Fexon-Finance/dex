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
          chainId: '0x38',
          chainName: 'Binance Smart Chain',
          nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
          },
          rpcUrls: [ 'https://bscrpc.com', 'https://bsc-dataseed.binance.org/' ],
          blockExplorerUrls: [ 'https://bscscan.com' ],
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
      <div className="flex flex-col">
        <button
          type="button"
          disabled
          onClick={() => {}}
          className="ml-auto w-40 py-2 px-4 text-base rounded-md text-white bg-purple-800 disabled:bg-gray-800"
        >
          Connected!
        </button>
        <div className="mt-1 rounded-md text-white  text-sm my-auto">
          {address}
        </div>
      </div>

    );
  }

  return (
    <button
      type="button"
      onClick={() => handleConnection()}
      className="inline-block w-40 py-2 px-4 text-base rounded-md text-white bg-purple-800 "
    >
      Connect MetaMask
    </button>
  );
}
