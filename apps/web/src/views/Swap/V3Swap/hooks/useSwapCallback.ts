// eslint-disable-next-line no-restricted-imports
import { useTranslation } from '@kazamaswap/localization'
import { TradeType } from '@kazamaswap/sdk'
import { SmartRouterTrade } from '@kazamaswap/smart-router/evm'
import { FeeOptions } from '@kazamaswap/v3-sdk'
import { ReactNode, useMemo } from 'react'

import { useUserSlippage } from '@kazamaswap/utils/user'
import { INITIAL_ALLOWED_SLIPPAGE } from 'config/constants'
import { useSwapState } from 'state/swap/hooks'
import { basisPointsToPercent } from 'utils/exchange'

import useAccountActiveChain from 'hooks/useAccountActiveChain'
import { SendTransactionResult } from 'wagmi/actions'
import useSendSwapTransaction from './useSendSwapTransaction'
import { useSwapCallArguments } from './useSwapCallArguments'

import { useWallchainSwapCallArguments } from './useWallchain'
import type { TWallchainMasterInput } from './useWallchain'

export enum SwapCallbackState {
  INVALID,
  LOADING,
  VALID,
  REVERTED,
}

interface UseSwapCallbackReturns {
  state: SwapCallbackState
  callback?: () => Promise<SendTransactionResult>
  error?: ReactNode
  reason?: string
}
interface UseSwapCallbackArgs {
  trade: SmartRouterTrade<TradeType> | undefined | null // trade to execute, required
  // allowedSlippage: Percent // in bips
  // recipientAddressOrName: string | null | undefined // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
  // signatureData: SignatureData | null | undefined
  deadline?: bigint
  feeOptions?: FeeOptions
  onWallchainDrop: () => void
  wallchainMasterInput?: TWallchainMasterInput
}

// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export function useSwapCallback({
  trade,
  // signatureData,
  deadline,
  feeOptions,
  onWallchainDrop,
  wallchainMasterInput,
}: UseSwapCallbackArgs): UseSwapCallbackReturns {
  const { t } = useTranslation()
  const { account, chainId } = useAccountActiveChain()
  const [allowedSlippageRaw] = useUserSlippage() || [INITIAL_ALLOWED_SLIPPAGE]
  const allowedSlippage = useMemo(() => basisPointsToPercent(allowedSlippageRaw), [allowedSlippageRaw])
  const { recipient: recipientAddress } = useSwapState()
  const recipient = recipientAddress === null ? account : recipientAddress

  const swapCalls = useSwapCallArguments(
    trade,
    allowedSlippage,
    recipientAddress,
    // signatureData,
    deadline,
    feeOptions,
  )
  const wallchainSwapCalls = useWallchainSwapCallArguments(
    trade,
    swapCalls,
    account,
    onWallchainDrop,
    wallchainMasterInput,
  )

  const { callback } = useSendSwapTransaction(
    account,
    chainId,
    trade,
    // @ts-expect-error uncompatible types side-by-side cause wrong type assertion
    wallchainSwapCalls,
  )

  return useMemo(() => {
    if (!trade || !account || !chainId || !callback) {
      return { state: SwapCallbackState.INVALID, error: t('Missing dependencies') }
    }
    if (!recipient) {
      if (recipientAddress !== null) {
        return { state: SwapCallbackState.INVALID, error: t('Invalid recipient') }
      }
      return { state: SwapCallbackState.LOADING }
    }

    return {
      state: SwapCallbackState.VALID,
      callback: async () => callback(),
    }
  }, [trade, account, chainId, callback, recipient, recipientAddress, t])
}
