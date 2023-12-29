// import { configureChains, createConfig } from 'wagmi'
import { mainnet, sepolia, klaytn, klaytnBaobab } from 'wagmi/chains'
// import { InjectedConnector } from 'wagmi/connectors/injected'
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { createConfig } from "wagmi";
import { getDefaultConfig } from "connectkit";

// Choose which chains you'd like to show
const chains = [mainnet, sepolia, klaytn, klaytnBaobab];

// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [mainnet, sepolia, goerli, bscTestnet, klaytn, klaytnBaobab],
//   [publicProvider()],
// )

export const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_ID ?? '', // or infuraId
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID ?? '',
    chains,
    // Required
    appName: "Your App Name",

    // Optional
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
)