import { Token } from '@kazamaswap/sdk'
import { Flex, Message, MessageText, useMatchBreakpoints } from '@kazamaswap/uikit'
import { useTranslation } from '@kazamaswap/localization'
import { memo } from 'react'
import { useVaultApy } from 'hooks/useVaultApy'

import ExtendButton from '../Buttons/ExtendDurationButton'
import useAvgLockDuration from '../hooks/useAvgLockDuration'

interface ConvertToLockProps {
  stakingToken: Token
  stakingTokenPrice: number
  currentStakedAmount: number
  isInline?: boolean
}

const ConvertToLock: React.FC<React.PropsWithChildren<ConvertToLockProps>> = ({
  stakingToken,
  stakingTokenPrice,
  currentStakedAmount,
  isInline,
}) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const isTableView = isInline && !isMobile
  const { avgLockDurationsInSeconds } = useAvgLockDuration()
  const { lockedApy } = useVaultApy({ duration: avgLockDurationsInSeconds })

  return (
    <Message
      variant="warning"
      action={
        <Flex mt={!isTableView && '8px'} flexGrow={1} ml={isTableView && '80px'}>
          <ExtendButton
            modalTitle={t('Convert to Lock')}
            lockEndTime="0"
            lockStartTime="0"
            stakingToken={stakingToken}
            stakingTokenPrice={stakingTokenPrice}
            currentLockedAmount={currentStakedAmount}
          >
            {t('Convert to Lock')}
          </ExtendButton>
        </Flex>
      }
      actionInline={isTableView}
    >
      {!!(avgLockDurationsInSeconds && lockedApy) && (
        <MessageText>
          {t('Lock staking users are earning an average of %amount%% APR. More benefits are coming soon.', {
            amount: lockedApy ? parseFloat(lockedApy).toFixed(2) : 0,
          })}
        </MessageText>
      )}
    </Message>
  )
}

export default memo(ConvertToLock)
