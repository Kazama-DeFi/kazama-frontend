import { useTranslation } from '@kazamaswap/localization'
import { Text, TooltipText, useModal, useTooltip, RoiCalculatorModal } from '@kazamaswap/uikit'
import { FarmWidget } from '@kazamaswap/widgets-internal'
import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { BIG_ZERO } from '@kazamaswap/utils/bigNumber'
import { useFarmUserInfoCache } from 'state/farms/hook'
import { useAccountBalance } from '@kazamaswap/awgmi'
import { FARM_DEFAULT_DECIMALS } from '../../constants'

export interface ApyButtonProps {
  variant: 'text' | 'text-and-button'
  pid: number
  lpAddress: string
  lpSymbol: string
  lpLabel?: string
  multiplier: string
  lpTokenPrice: BigNumber
  cakePrice?: BigNumber
  apr?: number
  displayApr?: string
  lpRewardsApr?: number
  addLiquidityUrl?: string
  useTooltipText?: boolean
  hideButton?: boolean
  farmCakePerSecond?: string
  totalMultipliers?: string
}

const ApyButton: React.FC<React.PropsWithChildren<ApyButtonProps>> = ({
  variant,
  pid,
  lpLabel = '',
  lpSymbol,
  lpAddress,
  lpTokenPrice,
  cakePrice = BIG_ZERO,
  apr = 0,
  multiplier,
  displayApr,
  lpRewardsApr,
  addLiquidityUrl = '',
  useTooltipText,
  hideButton,
  farmCakePerSecond,
  totalMultipliers,
}) => {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const { data: userInfo } = useFarmUserInfoCache(String(pid))
  const { data: tokenBalance = BIG_ZERO } = useAccountBalance({
    watch: true,
    address: account,
    coin: lpAddress,
    select: (d) => new BigNumber(d.value),
  })

  let userBalanceInFarm = BIG_ZERO
  if (userInfo) {
    userBalanceInFarm = new BigNumber(userInfo.amount).plus(tokenBalance)
  }

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <>
      <Text>
        {t('APR (incl. LP rewards)')}: <Text style={{ display: 'inline-block' }}>{`${displayApr}%`}</Text>
      </Text>
      <Text ml="5px">
        *{t('Base APR (CAKE yield only)')}: {`${apr.toFixed(2)}%`}
      </Text>
      <Text ml="5px">
        *{t('LP Rewards APR')}: {lpRewardsApr === 0 ? '-' : lpRewardsApr}%
      </Text>
    </>,
    {
      placement: 'top',
    },
  )

  const [onPresentApyModal] = useModal(
    <RoiCalculatorModal
      account={account || ''}
      pid={pid}
      linkLabel={t('Add %symbol%', { symbol: lpLabel })}
      stakingTokenBalance={userBalanceInFarm}
      stakingTokenSymbol={lpSymbol}
      stakingTokenPrice={lpTokenPrice.toNumber()}
      stakingTokenDecimals={FARM_DEFAULT_DECIMALS}
      earningTokenPrice={cakePrice.toNumber()}
      apr={apr}
      multiplier={multiplier}
      displayApr={displayApr}
      linkHref={addLiquidityUrl}
      isFarm
      rewardCakePerSecond
      farmCakePerSecond={farmCakePerSecond}
      totalMultipliers={totalMultipliers}
    />,
    false,
    true,
    `FarmModal${pid}`,
  )

  const handleClickButton = (event): void => {
    event.stopPropagation()
    onPresentApyModal()
  }

  return (
    <FarmWidget.FarmApyButton variant={variant} hideButton={hideButton} handleClickButton={handleClickButton}>
      {useTooltipText ? (
        <>
          <TooltipText ref={targetRef} decorationColor="secondary">
            {displayApr}%
          </TooltipText>
          {tooltipVisible && tooltip}
        </>
      ) : (
        <>{displayApr}%</>
      )}
    </FarmWidget.FarmApyButton>
  )
}

export default ApyButton
