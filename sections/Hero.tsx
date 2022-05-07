import { useState } from 'react';
import { ConnectWallet, SwapTokens } from '../components';
import { SectionTemplate } from './SectionTemplate';

export function Hero() {
  const [ price, serPrice ] = useState(0);

  return (
    <SectionTemplate id="hero">

      <div className="flex justify-between pt-8 mx-auto">
        <div className="text-white">
          <h1 className="text-3xl font-semibold text-purple-600">Fexon Finance</h1>
          <p className="text-center text-sm text-gray-500 font-bold">Your's Crypto ETF</p>
        </div>

        <ConnectWallet />
      </div>

      <div className="mt-16">
        <SwapTokens />
      </div>

      <div className="flex flex-col mt-4">
        <h2 className="text-sm text-white text-center font-semibold">
          <span className="text-purple-600 mr-1">EDDB</span>
          Price: $
          {price}
        </h2>
      </div>

    </SectionTemplate>
  );
}
