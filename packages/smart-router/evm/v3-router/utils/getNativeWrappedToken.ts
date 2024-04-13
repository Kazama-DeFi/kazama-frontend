import { Token, WNATIVE } from '@kazamaswap/sdk'
import { ChainId } from '@kazamaswap/chains'

export function getNativeWrappedToken(chainId: ChainId): Token | null {
  return WNATIVE[chainId] ?? null
}
