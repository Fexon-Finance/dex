import { ConnectWallet, SwapTokens } from '../components';
import { SectionTemplate } from './SectionTemplate';

export function Hero() {
  return (
    <SectionTemplate id="hero">

      <div className="flex justify-between pt-8 mx-auto">
        <h1 className="text-3xl font-semibold text-white">Source - ETF</h1>

        <ConnectWallet />
      </div>

      <div className="mt-16">
        <SwapTokens />
      </div>

      <h2 className="text-7xl text-white text-center">Price: $0.00</h2>
      <h3 className="text-5xl text-white text-center">APY: 0.00%</h3>

    </SectionTemplate>
  );
}
