import { TradeType } from '@kazamaswap/sdk'
import { LegacyRouteType as RouteType } from '@kazamaswap/smart-router/legacy-router'

export interface RequestBody {
  networkId: number
  baseToken: string
  baseTokenName: string
  baseTokenNumDecimals: number
  quoteToken: string
  quoteTokenName: string
  quoteTokenNumDecimals: number
  baseTokenAmount?: string
  quoteTokenAmount?: string
  trader: string
}

interface Token {
  address: string
  chainId: number
  decimals: number
  symbol: string
}

interface Pair {
  liquidityToken?: Token
  stableSwapAddress?: string
  token0: Token
  token1: Token
  reserve0: string
  reserve1: string
}

export interface SmartRouterResponse {
  tradeType: TradeType
  route: {
    input: Token
    output: Token
    routeType: RouteType
    pairs: Pair[]
    path: Token[]
  }
  outputAmount: string
  inputAmount: string
}

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

export const getBestPriceWithRouter = (requestBody: RequestBody): Promise<SmartRouterResponse> =>
  fetch('/smartRouter', {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody),
  }).then((response) => response.json())
