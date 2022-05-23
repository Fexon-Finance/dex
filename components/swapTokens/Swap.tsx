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

export function Swap({ web3, contract, contractAddress }: SwapTypes) {
  const address = useAddress();
  const isMismatched = useNetworkMismatch();
  const network = useNetwork();

  const [ busdAmount, setBusdAmount ] = useState('0');
  const [ etfAmount, setEtfAmount ] = useState('0');
  const [ tradeType, setTradeType ] = useState('buy');

  const getGasFee = async (price: string) => {
    // const resGasMethod = await contract.methods.buy(price).estimateGas({ from: address });
    // console.log(resGasMethod);

    // const latestBlock = await web3.eth.getBlock('latest');
    // const blockGas = latestBlock.gasLimit;

    // console.log({ blockGas });
    // const finalGas = (blockGas * resGasMethod);
    // const finalGasInEther = web3.utils.fromWei(finalGas.toString(), 'ether');
  };

  const handleBuy = async () => {
    const price = web3?.utils.toWei(busdAmount);
    const encoded = contract.methods.buy(price).encodeABI();

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
      token: 'BUSD',
      method: setBusdAmount,
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
    if (configuration[0].token === 'BUSD') {
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
            <input type="number" id="busd-amount" onChange={(e) => c.method(e.target.value)} className="bg-black rounded-l-xl px-4 py-6 flex-1 focus:border-gray-800" />
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
