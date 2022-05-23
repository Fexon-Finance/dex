import Image from 'next/image';
import {
  ChainId,
  useAddress,
  useNetworkMismatch,
  useNetwork,
} from '@thirdweb-dev/react';

export function Swap() {
  const address = useAddress();
  const isMismatched = useNetworkMismatch();
  const network = useNetwork();

  return (
    <div className="flex flex-col mx-auto bg-gray-900 rounded-xl p-4 space-y-8">
      <h2 className="text-xl font-bold uppercase text-gray-200 text-center">
        Swap
        {' '}
        <span className="text-yellow-600">BUSD</span>
        {' '}
        for
        {' '}
        <span className="text-indigo-600">EDDB</span>
      </h2>
      <div className="text-white">
        <div className="flex bg-black rounded-xl">
          <input type="number" id="bnb-amount" className="bg-black rounded-l-xl px-4 py-6 w-2/3" />
          <div className="w-1/3 my-auto">
            <div className="flex py-2 bg-gray-800 rounded-xl justify-center mx-2">
              <Image src="/bnb-icon.svg" height={24} width={24} />
              <span className="ml-2 text-lg">BUSD</span>
            </div>
          </div>
        </div>

      </div>

      <div className="text-white">
        <div className="flex bg-black rounded-xl w-full">
          <input type="number" id="eddb-amount" className="bg-black rounded-l-xl px-4 py-6 flex-1 focus:border-gray-800" />
          <div className="my-auto px-2">
            <div className="flex py-2 bg-gray-800 rounded-xl justify-center px-4">
              <Image src="/logo.svg" height={24} width={24} />
              <span className="ml-2 text-lg">EDDB</span>
            </div>
          </div>
        </div>
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
        <button type="button" onClick={() => {}} disabled={!address} className="text-white cursor-pointer font-medium rounded-xl py-3 disabled:bg-gray-600 bg-indigo-800 hover:bg-indigo-600">Swap</button>
      )}
    </div>
  );
}
