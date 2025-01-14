import { useAccountBalance } from '@kazamaswap/awgmi'
import { TransactionResponse } from '@kazamaswap/awgmi/core'
import type { DeserializedFarmUserData } from '@kazamaswap/farms'
import { useTranslation } from '@kazamaswap/localization'
import { useModal, useToast } from '@kazamaswap/uikit'
import { FarmWidget } from '@kazamaswap/widgets-internal'
import { BIG_ZERO } from '@kazamaswap/utils/bigNumber'
import BigNumber from 'bignumber.js'
import { ConnectWalletButton } from 'components/ConnectWalletButton'
import { ToastDescriptionWithTx } from 'components/Toast'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useCatchTxError from 'hooks/useCatchTxError'
import { usePriceCakeUsdc } from 'hooks/useStablePrice'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { FARM_DEFAULT_DECIMALS } from 'components/Farms/constants'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { FarmWithStakedValue } from '@kazamaswap/farms'
import useStakeFarms from '../../../hooks/useStakeFarms'
import useUnstakeFarms from '../../../hooks/useUnstakeFarms'

interface StackedActionProps extends FarmWithStakedValue {
  userDataReady: boolean
  lpLabel?: string
  displayApr?: string
  onStake: (value: string) => Promise<TransactionResponse>
  onUnstake: (value: string) => Promise<TransactionResponse>
}

export function useStakedActions(tokenType) {
  const { onStake } = useStakeFarms(tokenType)
  const { onUnstake } = useUnstakeFarms(tokenType)

  return {
    onStake,
    onUnstake,
  }
}

export const StakedContainer = ({ children, ...props }) => {
  const { onStake, onUnstake } = useStakedActions(props.lpAddress)
  const { account } = useActiveWeb3React()
  const { data: tokenBalance = BIG_ZERO } = useAccountBalance({
    watch: true,
    address: account,
    coin: props.lpAddress,
    select: (d) => new BigNumber(d.value),
  })

  const userData = useMemo(
    () => ({
      ...props.userData,
      tokenBalance,
    }),
    [props.userData, tokenBalance],
  )

  return children({
    ...props,
    userData,
    onStake,
    onUnstake,
  })
}

const Staked: React.FunctionComponent<React.PropsWithChildren<StackedActionProps>> = ({
  pid,
  apr,
  multiplier,
  lpSymbol,
  lpLabel,
  lpTokenPrice = BIG_ZERO,
  quoteToken,
  token,
  userDataReady,
  displayApr,
  lpTotalSupply = BIG_ZERO,
  tokenAmountTotal = BIG_ZERO,
  quoteTokenAmountTotal = BIG_ZERO,
  userData,
  onStake,
  onUnstake,
}) => {
  const { t } = useTranslation()
  const { toastSuccess } = useToast()
  const { fetchWithCatchTxError } = useCatchTxError()
  const { account } = useActiveWeb3React()

  const { stakedBalance, tokenBalance } = (userData as DeserializedFarmUserData) || {}

  const router = useRouter()
  const cakePrice = usePriceCakeUsdc()

  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: quoteToken?.address,
    tokenAddress: token?.address,
  })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  const isStakeReady = useMemo(() => {
    return ['history', 'archived'].some((item) => router.pathname.includes(item))
  }, [router])

  const handleStake = async (amount: string) => {
    const receipt = await fetchWithCatchTxError(() => onStake(amount))
    if (receipt?.status) {
      toastSuccess(
        `${t('Staked')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('Your funds have been staked in the farm')}
        </ToastDescriptionWithTx>,
      )
    }
  }

  const handleUnstake = async (amount: string) => {
    const receipt = await fetchWithCatchTxError(() => onUnstake(amount))
    if (receipt?.status) {
      toastSuccess(
        `${t('Unstaked')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('Your earnings have also been harvested to your wallet')}
        </ToastDescriptionWithTx>,
      )
    }
  }

  const [onPresentDeposit] = useModal(
    <FarmWidget.DepositModal
      account={account || ''}
      pid={pid}
      lpTotalSupply={lpTotalSupply}
      max={tokenBalance}
      lpPrice={lpTokenPrice}
      lpLabel={lpLabel}
      apr={apr}
      displayApr={displayApr}
      stakedBalance={stakedBalance}
      onConfirm={handleStake}
      tokenName={lpSymbol}
      multiplier={multiplier}
      addLiquidityUrl={addLiquidityUrl}
      cakePrice={cakePrice}
      decimals={FARM_DEFAULT_DECIMALS}
    />,
  )

  const [onPresentWithdraw] = useModal(
    <FarmWidget.WithdrawModal
      max={stakedBalance}
      lpPrice={lpTokenPrice}
      onConfirm={handleUnstake}
      tokenName={lpSymbol}
      decimals={FARM_DEFAULT_DECIMALS}
    />,
  )

  if (!account) {
    return (
      <FarmWidget.FarmTable.AccountNotConnect>
        <ConnectWalletButton width="100%" />
      </FarmWidget.FarmTable.AccountNotConnect>
    )
  }

  if (!userDataReady) {
    return <FarmWidget.FarmTable.StakeActionDataNotReady />
  }

  if (stakedBalance.gt(0)) {
    return (
      <FarmWidget.FarmTable.StakedActionComponent
        lpSymbol={lpSymbol}
        disabledPlusButton={isStakeReady}
        onPresentWithdraw={onPresentWithdraw}
        onPresentDeposit={onPresentDeposit}
      >
        <FarmWidget.StakedLP
          decimals={FARM_DEFAULT_DECIMALS}
          stakedBalance={stakedBalance}
          quoteTokenSymbol={quoteToken.symbol}
          tokenSymbol={token.symbol}
          lpTotalSupply={lpTotalSupply}
          lpTokenPrice={lpTokenPrice}
          tokenAmountTotal={tokenAmountTotal}
          quoteTokenAmountTotal={quoteTokenAmountTotal}
        />
      </FarmWidget.FarmTable.StakedActionComponent>
    )
  }

  return (
    <FarmWidget.FarmTable.StakeComponent
      lpSymbol={lpSymbol}
      isStakeReady={isStakeReady}
      onPresentDeposit={onPresentDeposit}
    />
  )
}

export default Staked
