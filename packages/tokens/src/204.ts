import { ChainId } from '@kazamaswap/chains'
import { WBNB } from '@kazamaswap/sdk'

import { USDT } from './common'

export const opBnbTokens = {
  wbnb: WBNB[ChainId.OPBNB],
  usdt: USDT[ChainId.OPBNB],
}
