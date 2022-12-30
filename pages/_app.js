import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

import { EthereumClient, modalConnectors, walletConnectProvider, } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon, goerli } from "wagmi/chains";

import "@fontsource/m-plus-rounded-1c"
import "@fontsource/open-sans"
import Layout from '../components/Layout'

import '../styles/globals.css'

const chains = [arbitrum, mainnet, polygon, goerli];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  }),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

export const theme = extendTheme({
  fonts: {
    heading: 'M PLUS Rounded 1c',
    body: 'Open Sans',
  },
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </WagmiConfig>

      <Web3Modal
        projectId={process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID}
        ethereumClient={ethereumClient}
        themeMode="dark"
        themeColor="magenta"
      />
    </>
  )
}
