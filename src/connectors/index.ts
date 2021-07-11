import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@starcoin/web3-react-injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { PortisConnector } from '@web3-react/portis-connector'
import { SupportedChainId } from '../constants/chains'
import getLibrary from '../utils/getLibrary'

import { FortmaticConnector } from './Fortmatic'
import { NetworkConnector } from './NetworkConnector'
import UNISWAP_LOGO_URL from '../assets/svg/logo.svg'

const FORMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY
const PORTIS_ID = process.env.REACT_APP_PORTIS_ID
const WALLETCONNECT_BRIDGE_URL = process.env.REACT_APP_WALLETCONNECT_BRIDGE_URL

const NETWORK_URLS: {
  [chainId in SupportedChainId]: string
} = {
  [SupportedChainId.MAINNET]: `https://main-seed.starcoin.org`,
  [SupportedChainId.BARNARD]: `https://barnard-seed.starcoin.org`,
  [SupportedChainId.HALLEY]: `https://halley-seed.starcoin.org`,
  [SupportedChainId.PROXIMA]: `https://proxima-seed.starcoin.org`,
}

const SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.BARNARD,
  SupportedChainId.HALLEY,
  SupportedChainId.PROXIMA,
]

export const network = new NetworkConnector({
  urls: NETWORK_URLS,
  defaultChainId: SupportedChainId.MAINNET,
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? getLibrary(network.provider))
}

export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
})

export const walletconnect = new WalletConnectConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
  rpc: NETWORK_URLS,
  bridge: WALLETCONNECT_BRIDGE_URL,
  qrcode: true,
  pollingInterval: 15000,
})

// mainnet only
export const fortmatic = new FortmaticConnector({
  apiKey: FORMATIC_KEY ?? '',
  chainId: 1,
})

// mainnet only
export const portis = new PortisConnector({
  dAppId: PORTIS_ID ?? '',
  networks: [1],
})

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: NETWORK_URLS[1],
  appName: 'Uniswap',
  appLogoUrl: UNISWAP_LOGO_URL,
})
