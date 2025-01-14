import { Token } from '@kazamaswap/swap-sdk-core'
import { FeeAmount } from '@kazamaswap/v3-sdk'
import { Address } from 'viem'

export type ComputedFarmConfigV3 = {
  pid: number
  lpSymbol: string
  lpAddress: Address
  boosted?: boolean

  token: Token
  quoteToken: Token
  feeAmount: FeeAmount

  token0: Token
  token1: Token
  isCommunity?: boolean
}

export type TokenHighlightData = {
  name: string
  symbol: string
  address: string
  tvlUSD: number
  tvlUSDChange: number
  priceUSD: number
  priceUSDChange: number
  volumeUSD: number
  pairs?: ComputedFarmConfigV3[]
  decimals: number
}
