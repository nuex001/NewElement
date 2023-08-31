import type { AppProps } from "next/app";
import "../styles/globals.css";
import Head from "next/head";
import localFont from "next/font/local";
import Header from "../components/Header/Header";
import { IBM_Plex_Mono } from "next/font/google";
import { AuthedProfileProvider } from "../context/UserContext";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;

const { chains, publicClient } = configureChains(
  [sepolia],
  [alchemyProvider({ apiKey: alchemyKey } as any), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "New Elements",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  chains,
} as any);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

// Fonts
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-ibmPlex",
});

const carbon = localFont({
  src: "../public/CarbonGravity-Carbon.otf",
  variable: "--font-carbon",
});
const compressed = localFont({
  src: "../public/CarbonGravity-Compressed.otf",
  variable: "--font-compressed",
});
const condensed = localFont({
  src: "../public/CarbonGravity-Condensed.otf",
  variable: "--font-condensed",
});
const expanded = localFont({
  src: "../public/CarbonGravity-Expanded.otf",
  variable: "--font-expanded",
});
const extended = localFont({
  src: "../public/CarbonGravity-Extended.otf",
  variable: "--font-extended",
});
const extraCondensed = localFont({
  src: "../public/CarbonGravity-ExtraCondensed.otf",
  variable: "--font-extraCondensed",
});

const normal = localFont({
  src: "../public/CarbonGravity-Normal.otf",
  variable: "--font-normal",
});
const semiCondensed = localFont({
  src: "../public/CarbonGravity-SemiCondensed.otf",
  variable: "--font-semiCondensed",
});
const wide = localFont({
  src: "../public/CarbonGravity-Wide.otf",
  variable: "--font-wide",
});
const xCompressed = localFont({
  src: "../public/carbongravity-xcompressed-webfont.woff2",
  variable: "--font-xCompressed",
});
const xxCompressed = localFont({
  src: "../public/carbongravity-xxcompressed-webfont.woff2",
  variable: "--font-xxCompressed",
});
const xxxCompressed = localFont({
  src: "../public/CarbonGravity-XXXCompressed.otf",
  variable: "--font-xxxCompressed",
});
const xxxxCompressed = localFont({
  src: "../public/CarbonGravity-XXXXCompressed.otf",
  variable: "--font-xxxxCompressed",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme()}
        modalSize="compact"
      >
        <AuthedProfileProvider>
          <Head>
            <title>New Elements</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <meta name="description" content="New Elements NFT Marketplace" />
            <meta
              name="keywords"
              content="New Elements, Marketplace, NFT Marketplace , NFT Auction , OpenSea"
            />
          </Head>
          <main
            className={`${ibmPlexMono.variable} font-sans,
          ${carbon.variable} font-sans,
          ${compressed.variable} font-sans,
          ${condensed.variable} font-sans,
          ${expanded.variable} font-sans,
          ${extended.variable} font-sans,
          ${extraCondensed.variable} font-sans,
          ${normal.variable} font-sans,
          ${semiCondensed.variable} font-sans,
          ${wide.variable} font-sans,
          ${xCompressed.variable} font-sans,
          ${xxCompressed.variable} font-sans,
          ${xxxCompressed.variable} font-sans,
          ${xxxxCompressed.variable} font-sans`}
          >
            <Header />
          </main>
          <main
            className={`${ibmPlexMono.variable} font-sans,
          ${carbon.variable} font-sans,
          ${compressed.variable} font-sans,
          ${condensed.variable} font-sans,
          ${expanded.variable} font-sans,
          ${extended.variable} font-sans,
          ${extraCondensed.variable} font-sans,
          ${normal.variable} font-sans,
          ${semiCondensed.variable} font-sans,
          ${wide.variable} font-sans,
          ${xCompressed.variable} font-sans,
          ${xxCompressed.variable} font-sans,
          ${xxxCompressed.variable} font-sans,
          ${xxxxCompressed.variable} font-sans`}
          >
            <Component {...pageProps} />
          </main>
        </AuthedProfileProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
