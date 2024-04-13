import { useMemo } from 'react'
import { Flex, Box, Text, RefreshIcon, WarningIcon, ScanLink } from '@kazamaswap/uikit'
import { useTranslation } from '@kazamaswap/localization'
import { chains } from 'utils/wagmi'
import { ChainLogo } from 'components/Logo/ChainLogo'
import { getBlockExploreLink, getBlockExploreName } from 'utils'
import { FarmTransactionStatus, NonBscFarmTransactionStep } from 'state/transactions/actions'
import { ChainLinkSupportChains } from 'state/info/constant'

interface HarvestDetailProps {
  status: FarmTransactionStatus
  step: NonBscFarmTransactionStep
}

const FarmDetail: React.FC<React.PropsWithChildren<HarvestDetailProps>> = ({ step, status }) => {
  const { t } = useTranslation()
  const isFail = step.status === FarmTransactionStatus.FAIL
  const isLoading = step.status === FarmTransactionStatus.PENDING
  const chainInfo = useMemo(() => chains.find((chain) => chain.id === step.chainId), [step])
  const isOneOfTheStepFail = status === FarmTransactionStatus.FAIL && isLoading

  return (
    <Flex mb="16px" justifyContent="space-between">
      <Flex>
        <ChainLogo width={20} height={20} chainId={step.chainId} />
        <Text fontSize="14px" ml="8px">
          {chainInfo?.name}
        </Text>
      </Flex>
      {!isOneOfTheStepFail && (
        <Box>
          {isLoading ? (
            <Flex>
              <Text color="textSubtle" bold fontSize="14px">
                {t('Loading')}
              </Text>
              <RefreshIcon ml="5px" color="textSubtle" spin />
            </Flex>
          ) : (
            <Flex>
              {isFail && <WarningIcon mr="4px" color="failure" />}
              {step.tx && (
                <ScanLink
                  useBscCoinFallback={ChainLinkSupportChains.includes(step.chainId)}
                  href={getBlockExploreLink(step.tx, 'transaction', step.chainId)}
                >
                  {getBlockExploreName(step.chainId)}
                </ScanLink>
              )}
            </Flex>
          )}
        </Box>
      )}
    </Flex>
  )
}

export default FarmDetail
