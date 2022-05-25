import Image from 'next/image';
import {
  ChainId,
  useAddress,
  useNetworkMismatch,
  useNetwork,
} from '@thirdweb-dev/react';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { ArrowDownIcon } from '@heroicons/react/outline';

type SwapTypes = {
  web3: Web3 | undefined;
  contract: any;
  contractAddress: string;
};

const ERC20Abi = require('../../contracts/ERC20.abi.json');

export function Swap({ web3, contract, contractAddress }: SwapTypes) {
  const address = useAddress();
  const isMismatched = useNetworkMismatch();
  const network = useNetwork();

  const [ BNBAmount, setBNBAmount ] = useState('0');
  const [ etfAmount, setEtfAmount ] = useState('0');
  const [ tradeType, setTradeType ] = useState('buy');
  const [ tokenBalances, setTokenBalances ] = useState<any>({});

  const handleBuy = async () => {
    const price = web3?.utils.toWei(BNBAmount);
    const encoded = contract.methods.buy().encodeABI();
    const nonce = await web3?.eth.getTransactionCount(contractAddress, 'latest');

    const tx = {
      from: address,
      to: contractAddress,
      data: encoded,
      nonce,
      value: price,
    };

    await web3?.eth.sendTransaction(tx);
  };

  const handleSell = async () => {
    const price = web3?.utils.toWei(etfAmount);
    const encoded = contract.methods.sell(price).encodeABI();
    const nonce = await web3?.eth.getTransactionCount(contractAddress, 'latest');

    const tx = {
      from: address,
      to: contractAddress,
      data: encoded,
      nonce,
    };

    await web3?.eth.sendTransaction(tx);
  };

  const [ configuration, setConfiguration ] = useState([
    {
      token: 'BNB',
      method: setBNBAmount,
      icon: <Image src="/bnb-icon.svg" height={24} width={24} />,
      balance: tokenBalances.bnbBalance,
    },
    {
      token: 'RUG',
      method: setEtfAmount,
      icon: <Image src="/logo.svg" height={24} width={24} />,
      balance: tokenBalances.rugBalance,
    },
  ]);

  const swap = () => {
    console.log({ configuration });
    if (configuration[0].token === 'BNB') {
      console.log('buy');
      handleBuy();
    }

    if (configuration[0].token === 'RUG') {
      console.log('sell');
      handleSell();
    }
  };

  const getBalance = async () => {
    const rugBalance = await contract.methods.balanceOf(address).call();
    const bnbBalance = await web3?.eth.getBalance(address!);

    console.log({
      rugBalance: web3?.utils.fromWei(rugBalance),
      bnbBalance: web3?.utils.fromWei(bnbBalance!),
    });

    setTokenBalances({
      rugBalance: web3?.utils.fromWei(rugBalance),
      bnbBalance: web3?.utils.fromWei(bnbBalance!),
    });

    setConfiguration([
      {
        token: 'BNB',
        method: setBNBAmount,
        icon: <Image src="/bnb-icon.svg" height={24} width={24} />,
        balance: web3?.utils.fromWei(bnbBalance!),
      },
      {
        token: 'RUG',
        method: setEtfAmount,
        icon: <Image src="/logo.svg" height={24} width={24} />,
        balance: web3?.utils.fromWei(rugBalance),
      },
    ]);
  };

  useEffect(() => {
    if (contract !== null && address !== undefined) {
      (async () => {
        console.log('get balances');
        await getBalance();
      })();
    }
  }, [ contract, address ]);

  const swapConfiguration = () => {
    setConfiguration([ ...configuration.reverse() ]);
  };

  return (
    <div className="flex flex-col mx-auto bg-gray-900 rounded-xl p-4 space-y-8">
      <h2 className="text-xl font-semibold uppercase text-gray-200">
        Swap
      </h2>

      <div className="relative text-white space-y-4">
        {configuration.map((c) => (
          <div className="flex bg-black rounded-xl">
            <input type="number" onChange={(e) => c.method(e.target.value)} className="bg-black rounded-l-xl px-4 py-6 flex-1 focus:border-gray-800" />
            <div className="my-auto px-2 py-2 flex flex-col">
              {c.balance && (
                <p className="text-sm text-gray-400 mb-1">
                  Max:
                  {' '}
                  {c.balance}
                </p>
              )}
              <div className="flex py-2 bg-gray-800 rounded-xl justify-center px-4">
                {c.icon}
                <span className="ml-2 text-lg">{c.token}</span>
              </div>
            </div>
          </div>
        ))}

        <button onClick={swapConfiguration} type="button" className="absolute top-[30%] right-[45%] p-2 bg-gray-800 rounded-xl">
          <ArrowDownIcon width={20} height={20} />
        </button>
      </div>

      {isMismatched ? (
        <button
          type="button"
          key={ChainId.BSC}
          onClick={async () => network[1]?.(ChainId.BSC)}
          className="text-white font-medium rounded-xl py-3 bg-indigo-800 hover:bg-indigo-600"
        >
          Switch to Binance Smart Chain
        </button>
      ) : (
        <button type="button" onClick={swap} disabled={!address} className="text-white cursor-pointer font-medium rounded-xl py-3 disabled:bg-gray-600 bg-indigo-800 hover:bg-indigo-600">Swap</button>
      )}
    </div>
  );
}
