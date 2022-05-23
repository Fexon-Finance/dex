import { useState } from 'react';
import { ConnectWallet, Swap } from '../components';
import { SectionTemplate } from './SectionTemplate';

export function Hero() {
  const [ price, serPrice ] = useState(0);

  return (
    <SectionTemplate id="hero">

      <Swap />

      <div className="flex flex-col mt-4">
        <h2 className="text-sm text-white text-center font-semibold">
          <span className="text-indigo-600 mr-1">EDDB</span>
          Price: $
          {price}
        </h2>
      </div>

    </SectionTemplate>
  );
}
