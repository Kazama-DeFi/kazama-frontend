import { Currency } from '@kazamaswap/sdk'
import { ChainId } from '@kazamaswap/chains'

export function isCurrenciesSameChain(...currencies: Currency[]) {
  // eslint-disable-next-line prefer-destructuring
  const chainId: ChainId | undefined = currencies[0]?.chainId
  for (const currency of currencies) {
    if (currency.chainId !== chainId) {
      return false
    }
  }
  return true
}
