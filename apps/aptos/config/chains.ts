import { defaultChain } from '@kazamaswap/awgmi'
import { mainnet, testnet, Chain } from '@kazamaswap/awgmi/core'

export { defaultChain }

export const chains = [mainnet, testnet].filter(Boolean) as Chain[]
