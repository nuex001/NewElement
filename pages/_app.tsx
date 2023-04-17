import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Head from "next/head";
import Header from "../components/Header/Header";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mumbai;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={activeChainId}>
      <Head>
        <title>New Elements</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="New Elements NFT Marketplace" />
        <meta
          name="keywords"
          content="New Elements, Marketplace, NFT Marketplace , NFT Auction , OpenSea"
        />
      </Head>
      <Header />
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
