import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { SectionTemplate } from './SectionTemplate';
import { Swap } from '../components';

const FexonCoreAbi = require('../contracts/FexonCore.json');

interface PortfolioCoin {
  amount: string;
  coin: string;
  symbol: string;
}

export function Hero() {
  const [ portfolio, setPortfolio ] = useState<PortfolioCoin[]>();

  const [ web3, setWeb3 ] = useState<Web3>();
  const [ contract, setContract ] = useState<any>(null);
  const contractAddress = '0x82fDA1611B3d1835EdB9da8196daf12d54966C0f';

  const getPortfolio = async () => {
    const portf: PortfolioCoin[] = await contract.methods.viewPortfolio().call();
    const portfolioMapped = portf.map((token) => ({
      ...token,
      amount: web3?.utils.fromWei(token.amount)!,
    }));

    console.log({ portfolio, portfolioMapped });
    setPortfolio(portfolioMapped);
  };

  useEffect(() => {
    // Initialize contract
    const w3 = new Web3(Web3.givenProvider);
    setWeb3(w3);
    const c = new w3.eth.Contract(FexonCoreAbi, contractAddress);
    setContract(c);
  }, []);

  useEffect(() => {
    if (contract !== null) {
      (async () => {
        await getPortfolio();
      })();
    }
  }, [ contract ]);

  return (
    <SectionTemplate id="hero">

      <Swap web3={web3} contract={contract} contractAddress={contractAddress} />

      <div className="flex flex-col mt-4">
        <ul>
          {portfolio?.map((p) => (
            <li className="text-sm text-white text-center font-semibold">
              <span className="text-indigo-600 mr-1">{p.symbol}</span>
              amount:
              {' '}
              {p.amount}
            </li>
          ))}
        </ul>
      </div>

    </SectionTemplate>
  );
}
