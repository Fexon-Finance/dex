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

  const handleBuy = async () => {
    const BusdTokenAddress = "0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee";
    const BusdContract = new web3!.eth.Contract(ERC20Abi as any, BusdTokenAddress);
    
    const price = web3?.utils.toWei(BNBAmount);
    // const value = web3?.utils.numberToHex(price!);

    // await BusdContract.methods.approve(BNBTokenAddress, price).send({
    //   from: address
    // });

    const encoded = contract.methods.buy().encodeABI();
    const nonce = await web3?.eth.getTransactionCount(contractAddress, 'latest');

    const tx = {
      from: address,
      to: contractAddress,
      data: encoded,
      nonce,
      value: price,
      gas: 90000,
    };

    console.log(tx);

    const res = await web3?.eth.sendTransaction(tx);
    console.log({ res });

    // await contract.methods.buy().send({from: address, gas: 300000, value});
  };

  const handleSell = async () => {
    const price = web3?.utils.toWei(etfAmount);
    const encoded = contract.methods.sell(price).encodeABI();

    const tx = {
      from: address,
      to: contractAddress,
      data: encoded,
      nonce: 0x00,
      value: web3?.utils.numberToHex(price!),
      gas: 30000,
    };

    console.log(tx);

    const res = await web3?.eth.sendTransaction(tx);
    console.log({ res });
  };

  const [ configuration, setConfiguration ] = useState([
    {
      token: 'BNB',
      method: setBNBAmount,
      icon: <Image src="/bnb-icon.svg" height={24} width={24} />,
    },
    {
      token: 'FXN',
      method: setEtfAmount,
      icon: <Image src="/logo.svg" height={24} width={24} />,
    },
  ]);

  const swapConfiguration = () => {
    setConfiguration([ ...configuration.reverse() ]);
  };

  const swap = () => {
    console.log({ configuration });
    if (configuration[0].token === 'BNB') {
      console.log('buy');
      handleBuy();
    }

    if (configuration[0].token === 'FXN') {
      console.log('sell');
      handleSell();
    }
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
            <div className="my-auto px-2">
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
