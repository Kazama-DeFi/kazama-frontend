import { Token } from '@kazamaswap/sdk'
import { ChainId } from '@kazamaswap/chains'
import { bscTokens, ethereumTokens } from '@kazamaswap/tokens'
import { bscWarningTokens } from 'config/constants/warningTokens'

const { alETH } = ethereumTokens
const { bondly, itam, ccar, bttold, abnbc, metis } = bscTokens
const { pokemoney, free, safemoon, gala, xcad, lusd } = bscWarningTokens

interface WarningTokenList {
  [chainId: number]: {
    [key: string]: Token
  }
}

const SwapWarningTokens = <WarningTokenList>{
  [ChainId.ETHEREUM]: {
    alETH,
  },
  [ChainId.BSC]: {
    safemoon,
    bondly,
    itam,
    ccar,
    bttold,
    pokemoney,
    free,
    gala,
    abnbc,
    xcad,
    metis,
    lusd,
  },
}

export default SwapWarningTokens
