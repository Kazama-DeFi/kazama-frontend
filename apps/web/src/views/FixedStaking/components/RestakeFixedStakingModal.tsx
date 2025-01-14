import { useTranslation } from '@kazamaswap/localization'
import { ModalV2, useModalV2, Text, Box, PreTitle, Flex, Message, MessageText } from '@kazamaswap/uikit'
import { ReactNode } from 'react'
import { CurrencyAmount, Currency } from '@kazamaswap/sdk'
import { LightGreyCard } from 'components/Card'

import ConnectWalletButton from 'components/ConnectWalletButton'
import useAccountActiveChain from 'hooks/useAccountActiveChain'

import { FixedStakingPool, StakedPosition } from '../type'
import FixedStakingOverview from './FixedStakingOverview'
import { StakingModalTemplate } from './StakingModalTemplate'
import { FixedStakingCalculator } from './FixedStakingCalculator'
import { AmountWithUSDSub } from './AmountWithUSDSub'
import WithdrawalMessage from './WithdrawalMessage'

export function FixedRestakingModal({
  stakingToken,
  pools,
  children,
  initialLockPeriod,
  stakedPeriods,
  setSelectedPeriodIndex,
  amountDeposit,
  stakedPositions,
}: {
  stakingToken: Currency
  pools: FixedStakingPool[]
  children: (openModal: () => void) => ReactNode
  initialLockPeriod: number
  stakedPeriods: number[]
  setSelectedPeriodIndex?: (value: number | null) => void
  amountDeposit: CurrencyAmount<Currency>
  stakedPositions: StakedPosition[]
}) {
  const { account } = useAccountActiveChain()

  const { t } = useTranslation()
  const stakeModal = useModalV2()

  return account ? (
    <>
      {children(stakeModal.onOpen)}
      <ModalV2
        {...stakeModal}
        onDismiss={() => {
          if (setSelectedPeriodIndex) setSelectedPeriodIndex(null)
          stakeModal.onDismiss()
        }}
        closeOnOverlayClick
      >
        <StakingModalTemplate
          useNative
          stakedPositions={stakedPositions}
          stakingToken={stakingToken}
          pools={pools}
          initialLockPeriod={initialLockPeriod}
          stakedPeriods={stakedPeriods}
          head={() => (
            <Message variant="primary" mb="24px">
              <MessageText>
                {t('Adding stake to the position will restart the lock and withdrawal period.')}
              </MessageText>
            </Message>
          )}
          body={({
            unlockAPR,
            isBoost,
            stakeCurrencyAmount,
            alreadyStakedAmount,
            poolEndDay,
            lockPeriod,
            boostAPR,
            lockAPR,
            lastDayAction,
            positionStakeCurrencyAmount,
          }) => (
            <>
              <WithdrawalMessage lockPeriod={lockPeriod} />

              <Box mb="16px" mt="16px">
                <PreTitle textTransform="uppercase" bold mb="8px">
                  {t('Overview')}
                </PreTitle>
                <LightGreyCard>
                  <Flex justifyContent="space-between">
                    <Box>
                      <Flex>
                        <PreTitle mr="4px">{t('New')}</PreTitle>
                        <PreTitle color="textSubtle">{t('Staked Amount')}</PreTitle>
                      </Flex>
                      <AmountWithUSDSub amount={amountDeposit.add(positionStakeCurrencyAmount)} />
                    </Box>
                    <Box style={{ textAlign: 'end' }}>
                      <PreTitle color="textSubtle">{t('Stake Period')}</PreTitle>
                      <Text bold>{lockPeriod} Days</Text>
                    </Box>
                  </Flex>
                </LightGreyCard>
              </Box>

              <Box mb="16px" mt="16px">
                <PreTitle textTransform="uppercase" bold mb="8px">
                  {t('Position Details')}
                </PreTitle>
                <FixedStakingOverview
                  alreadyStakedAmount={alreadyStakedAmount}
                  poolEndDay={poolEndDay}
                  lastDayAction={lastDayAction}
                  stakeAmount={stakeCurrencyAmount}
                  isBoost={isBoost}
                  boostAPR={boostAPR}
                  unlockAPR={unlockAPR}
                  lockAPR={lockAPR}
                  lockPeriod={lockPeriod}
                  calculator={
                    <FixedStakingCalculator stakingToken={stakingToken} pools={pools} initialLockPeriod={lockPeriod} />
                  }
                />
              </Box>
            </>
          )}
        />
      </ModalV2>
    </>
  ) : (
    <ConnectWalletButton />
  )
}
