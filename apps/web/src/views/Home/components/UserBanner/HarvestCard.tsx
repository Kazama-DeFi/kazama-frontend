import BigNumber from 'bignumber.js';
import { ToastDescriptionWithTx } from 'components/Toast';
import { BOOSTED_FARM_GAS_LIMIT } from 'config';
import useCatchTxError from 'hooks/useCatchTxError';
import { useCakePrice } from 'hooks/useCakePrice';
import { useCallback } from 'react';
import { useGasPrice } from 'state/user/hooks';
import { styled } from 'styled-components';
import { getMasterChefV2Address } from 'utils/addressHelpers';
import { harvestFarm } from 'utils/calls';
import { useFarmsV3BatchHarvest } from 'views/Farms/hooks/v3/useFarmV3Actions';
import useFarmsWithBalance, { FarmWithBalance } from 'views/Home/hooks/useFarmsWithBalance';

import { useTranslation } from '@kazamaswap/localization';
import {
    ArrowForwardIcon, AutoRenewIcon, Balance, Button, Card, CardBody, Flex, NextLinkFromReactRouter,
    Skeleton, Text, TextProps, useMatchBreakpoints, useToast
} from '@kazamaswap/uikit';

import { getEarningsText } from './EarningsText';

const StyledCard = styled(Card)`
  width: 100%;
  height: fit-content;
`
const StyledCardBody = styled(CardBody)`
  padding: 4px 8px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 24px;
  }
`

const masterChefAddress = getMasterChefV2Address()

interface HarvestCardProps extends TextProps {
  onHarvestStart: () => void | undefined
  onHarvestEnd: () => void | undefined
}

const HarvestCard: React.FC<React.PropsWithChildren<HarvestCardProps>> = ({ onHarvestStart, onHarvestEnd }) => {
  const { t } = useTranslation()
  const { toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { farmsWithStakedBalance, earningsSum: farmEarningsSum } = useFarmsWithBalance()

  const kazamaPriceBusd = useCakePrice()
  const { isMobile } = useMatchBreakpoints()
  const gasPrice = useGasPrice()
  const earningsBusd = new BigNumber(farmEarningsSum).multipliedBy(kazamaPriceBusd)
  const numTotalToCollect = farmsWithStakedBalance.length
  const numFarmsToCollect = farmsWithStakedBalance.filter(
    (value) => (value && 'pid' in value && value.pid !== 0) || (value && 'sendTx' in value && value.sendTx !== null),
  ).length
  const hasCakePoolToCollect = numTotalToCollect - numFarmsToCollect > 0

  const earningsText = getEarningsText(numFarmsToCollect, hasCakePoolToCollect, earningsBusd, t)
  const [preText, toCollectText] = earningsText.split(earningsBusd.toString())
  const { onHarvestAll } = useFarmsV3BatchHarvest()

  const harvestAllFarms = useCallback(async () => {
    onHarvestStart?.()
    const v2Farms = farmsWithStakedBalance.filter((value) => value && 'pid' in value) as FarmWithBalance[]
    for (let i = 0; i < v2Farms.length; i++) {
      const farmWithBalance = v2Farms[i]
      // eslint-disable-next-line no-await-in-loop
      const receipt = await fetchWithCatchTxError(() => {
        return harvestFarm(
          // @ts-ignore
          farmWithBalance.contract,
          farmWithBalance.pid,
          gasPrice,
          farmWithBalance.contract.address !== masterChefAddress ? BOOSTED_FARM_GAS_LIMIT : undefined,
        )
      })
      if (receipt?.status) {
        toastSuccess(
          `${t('Harvested')}!`,
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>
            {t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'CAKE' })}
          </ToastDescriptionWithTx>,
        )
      }
    }

    const v3Farms = (
      farmsWithStakedBalance.filter((value) => value && 'sendTx' in value) as {
        sendTx: {
          to: string
          tokenId: string
        }
      }[]
    ).map((farm) => farm.sendTx.tokenId)
    if (v3Farms.length > 0) {
      await onHarvestAll(v3Farms)
    }
    onHarvestEnd?.()
  }, [
    farmsWithStakedBalance,
    onHarvestAll,
    fetchWithCatchTxError,
    gasPrice,
    toastSuccess,
    t,
    onHarvestStart,
    onHarvestEnd,
  ])

  return (
    <StyledCard>
      <StyledCardBody>
        <Flex flexDirection={['column', null, null, 'row']} justifyContent="space-between" alignItems="center">
          <Flex flexDirection="column" alignItems={['center', null, null, 'flex-start']}>
            {preText && (
              <Text mb="4px" color="textSubtle">
                {preText}
              </Text>
            )}
            {!earningsBusd.isNaN() ? (
              <Balance
                decimals={earningsBusd.gt(0) ? 2 : 0}
                fontSize="20px"
                bold
                prefix={earningsBusd.gt(0) ? '~$' : '$'}
                lineHeight="1.1"
                value={earningsBusd.toNumber()}
              />
            ) : (
              <Skeleton width={96} height={24} my="2px" />
            )}
            <Text mb={['8px', null, null, '0']} color="textSubtle">
              {toCollectText}
            </Text>
          </Flex>
          {numTotalToCollect <= 0 ? (
            <NextLinkFromReactRouter to="farms">
              <Button width={['100%', null, null, 'auto']} variant="secondary">
                <Text color="primary" bold>
                  {t('Start earning')}
                </Text>
                <ArrowForwardIcon ml="4px" color="primary" />
              </Button>
            </NextLinkFromReactRouter>
          ) : (
            <Button
              width={['100%', null, null, 'auto']}
              id="harvest-all"
              isLoading={pendingTx}
              endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
              disabled={pendingTx}
              onClick={harvestAllFarms}
              scale={isMobile ? 'sm' : 'md'}
            >
              <Text color="invertedContrast" bold>
                {pendingTx ? t('Harvesting') : t('Harvest all')}
              </Text>
            </Button>
          )}
        </Flex>
      </StyledCardBody>
    </StyledCard>
  )
}

export default HarvestCard
