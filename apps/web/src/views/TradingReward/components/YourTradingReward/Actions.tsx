import { Box, Button, useModal, Flex } from '@kazamaswap/uikit'
import { useTranslation } from '@kazamaswap/localization'
import { getBalanceNumber } from '@kazamaswap/utils/formatBalance'
import BigNumber from 'bignumber.js'
import { Token } from '@kazamaswap/sdk'
import { VaultKey } from 'state/types'
import { useVaultPoolByKey } from 'state/pools/hooks'
import { useVaultApprove, useCheckVaultApprovalStatus } from 'views/Pools/hooks/useApprove'
import ExtendButton from 'views/Pools/components/LockedPool/Buttons/ExtendDurationButton'
import LockedStakedModal from 'views/Pools/components/LockedPool/Modals/LockedStakeModal'

interface ActionsProps {
  lockEndTime: string
  lockStartTime: string
  lockedAmount: BigNumber
  stakingToken: Token
  stakingTokenPrice: number
  currentBalance: BigNumber
  isOnlyNeedExtendLock: boolean
  customLockWeekInSeconds: number
}

const Actions: React.FC<React.PropsWithChildren<ActionsProps>> = ({
  lockEndTime,
  lockStartTime,
  lockedAmount,
  stakingToken,
  stakingTokenPrice,
  currentBalance,
  isOnlyNeedExtendLock,
  customLockWeekInSeconds,
}) => {
  const { t } = useTranslation()
  const { isVaultApproved, setLastUpdated } = useCheckVaultApprovalStatus(VaultKey.CakeVault)
  const vaultData = useVaultPoolByKey(VaultKey.CakeVault)
  const {
    userData: { userShares, balance },
  } = vaultData

  const lockedAmountAsNumber = getBalanceNumber(lockedAmount)

  const [openPresentLockedStakeModal] = useModal(
    <LockedStakedModal
      currentBalance={currentBalance}
      stakingToken={stakingToken}
      stakingTokenPrice={stakingTokenPrice}
      stakingTokenBalance={currentBalance}
      customLockWeekInSeconds={customLockWeekInSeconds}
    />,
  )

  const { handleApprove, pendingTx } = useVaultApprove(VaultKey.CakeVault, setLastUpdated)

  return (
    <Flex width="228px" flexDirection={['column', 'column', 'column', 'row']} m="16px auto auto auto">
      {!isOnlyNeedExtendLock ? (
        <Box width="100%">
          {!isVaultApproved && !balance.cakeAsBigNumber.gt(0) && !userShares.gt(0) ? (
            <Button width="100%" variant="secondary" disabled={pendingTx} onClick={handleApprove}>
              {t('Enable')}
            </Button>
          ) : (
            <Box width="100%">
              <Button width="100%" onClick={openPresentLockedStakeModal}>
                {t('Lock CAKE')}
              </Button>
            </Box>
          )}
        </Box>
      ) : (
        <ExtendButton
          lockEndTime={lockEndTime}
          lockStartTime={lockStartTime}
          stakingToken={stakingToken}
          stakingTokenPrice={stakingTokenPrice}
          currentBalance={currentBalance}
          currentLockedAmount={lockedAmountAsNumber}
          customLockWeekInSeconds={customLockWeekInSeconds}
        >
          {t('Extend Lock')}
        </ExtendButton>
      )}
    </Flex>
  )
}

export default Actions
