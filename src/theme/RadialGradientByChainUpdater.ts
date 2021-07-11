import { useEffect } from 'react'
import { useActiveWeb3React } from '../hooks/web3'

const backgroundRadialGradientElement = document.getElementById('background-radial-gradient')
export default function RadialGradientByChainUpdater(): null {
  const { chainId } = useActiveWeb3React()
  // manage background color
  useEffect(() => {
    if (!backgroundRadialGradientElement) {
      return
    }

    backgroundRadialGradientElement.style.background = ''
  }, [chainId])
  return null
}
