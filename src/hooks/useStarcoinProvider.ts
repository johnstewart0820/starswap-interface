import { providers } from '@starcoin/starcoin'
import { NETWORK_URLS } from 'connectors'
import { SupportedChainId } from 'constants/chains'
import { useMemo } from 'react'
import { useActiveWeb3React } from './web3'

export default function useStarcoinProvider(): providers.Web3Provider | providers.JsonRpcProvider {
  const { chainId } = useActiveWeb3React()
  return useMemo(() => {
    try {
      return new providers.Web3Provider(window.starcoin!)
    } catch {
      return new providers.JsonRpcProvider(NETWORK_URLS[chainId as SupportedChainId])
    }
  }, [chainId])
}
