/* eslint-disable react/jsx-key */
import Head from 'next/head';
import { Hero } from '../sections';

export default function Home() {
  return (
    <>
      <Head>
        <title>Source</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content="Source" />
        <meta name="description" content="Crypto ETF" />

        <meta property="og:title" content="Source" />
        <meta property="og:site_name" content="Source" />
        <meta property="og:description" content="Crypto ETF" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta property="og:url" content="" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Source" />
        <meta property="twitter:description" content="Crypto ETF" />
        <meta property="twitter:image" content="" />
        <meta property="twitter:url" content="" />

        <meta name="theme-color" content="#000" />

        <link rel="icon" href="/bnb-icon.svg" type="image/svg+xml" />
      </Head>

      <main className="h-full bg-black px-2">
        <Hero />
      </main>
    </>
  );
}
