import { Price, Token } from '@kazamaswap/swap-sdk-core'
import { tickToPrice } from '@kazamaswap/v3-sdk'

export function getTickToPrice(baseToken?: Token, quoteToken?: Token, tick?: number): Price<Token, Token> | undefined {
  if (!baseToken || !quoteToken || typeof tick !== 'number') {
    return undefined
  }
  return tickToPrice(baseToken, quoteToken, tick)
}