/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.BSC}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
