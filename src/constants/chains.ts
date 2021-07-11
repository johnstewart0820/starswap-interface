export enum SupportedChainId {
  MAINNET = 1,
  PROXIMA = 2,
  BARNARD = 251,
  HALLEY = 253,
}

export const NETWORK_LABELS: { [chainId in SupportedChainId | number]: string } = {
  [SupportedChainId.MAINNET]: 'Mainnet',
  [SupportedChainId.PROXIMA]: 'Proxima',
  [SupportedChainId.BARNARD]: 'Barnard',
  [SupportedChainId.HALLEY]: 'Halley',
}
