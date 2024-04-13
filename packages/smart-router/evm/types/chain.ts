import { Token } from '@kazamaswap/sdk'
import { ChainId } from '@kazamaswap/chains'

// a list of tokens by chain
export type ChainMap<T> = {
  readonly [chainId in ChainId]: T
}

export type ChainTokenList = ChainMap<Token[]>
