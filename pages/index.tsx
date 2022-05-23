/* eslint-disable react/jsx-key */
import Head from 'next/head';
import { Navbar } from '../components/Navbar';
import { Hero } from '../sections';

export default function Home() {
  return (
    <>
      <Head>

        <title>DEX | Fexon Finance</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content="DEX | Fexon Finance" />
        <meta name="description" content="Lower the risk of investment though ETFs!" />

        <meta property="og:title" content="DEX | Fexon Finance" />
        <meta property="og:site_name" content="DEX | Fexon Finance" />
        <meta property="og:description" content="Lower the risk of investment though ETFs!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.dex.fexon.finance/logo.svg" />
        <meta property="og:url" content="https://www.dex.fexon.finance/" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="DEX | Fexon Finance" />
        <meta property="twitter:description" content="Lower the risk of investment though ETFs!" />
        <meta property="twitter:image" content="https://www.dex.fexon.finance/logo.svg" />
        <meta property="twitter:url" content="https://www.dex.fexon.finance/" />

        <meta name="theme-color" content="#000" />

        <link rel="icon" href="/logo.svg" type="image/svg+xml" />

      </Head>

      <Navbar />

      <main className="h-full bg-black px-2">
        <Hero />
      </main>
    </>
  );
}
