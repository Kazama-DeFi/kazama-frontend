import { ChainId } from '@kazamaswap/chains'

const pocketPrefix = {
  [ChainId.ARBITRUM_ONE]: 'arbitrum-one',
  [ChainId.BASE]: 'base-mainnet',
  [ChainId.BSC]: 'bsc-mainnet',
  [ChainId.ETHEREUM]: 'eth-mainnet',
  [ChainId.POLYGON_ZKEVM]: 'polygon-zkevm-mainnet',
} as const

export const getPoktUrl = (chainId: keyof typeof pocketPrefix, key?: string) => {
  if (!key) {
    return null
  }

  const url = `https://${pocketPrefix[chainId]}.gateway.pokt.network/v1/lb/${key}`
  return url
}
