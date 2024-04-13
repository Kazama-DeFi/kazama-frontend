import { TradeType } from '@kazamaswap/sdk'
import { SmartRouterTrade } from '@kazamaswap/smart-router/evm'
import { useMemo } from 'react'
import { useUserSlippage } from '@kazamaswap/utils/user'
import { computeSlippageAdjustedAmounts } from '../utils/exchange'

export function useSlippageAdjustedAmounts(trade?: SmartRouterTrade<TradeType>) {
  const [allowedSlippage] = useUserSlippage()
  return useMemo(() => computeSlippageAdjustedAmounts(trade, allowedSlippage), [allowedSlippage, trade])
}
