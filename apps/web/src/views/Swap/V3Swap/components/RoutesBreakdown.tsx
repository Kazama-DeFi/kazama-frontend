import { useTranslation } from '@kazamaswap/localization'
import { Route } from '@kazamaswap/smart-router/evm'
import { Box, IconButton, QuestionHelper, SearchIcon, Text, useModalV2 } from '@kazamaswap/uikit'
import { styled } from 'styled-components'
import { memo } from 'react'
import { useDebounce } from '@kazamaswap/hooks'

import { RowBetween } from 'components/Layout/Row'
import SwapRoute from 'views/Swap/components/SwapRoute'
import { RouteDisplayModal } from './RouteDisplayModal'
import { useWallchainStatus } from '../hooks/useWallchain'

interface Props {
  routes?: Route[]
  isMM?: boolean
}

const RouteInfoContainer = styled(RowBetween)`
  padding: 4px 24px 0;
`

export const RoutesBreakdown = memo(function RoutesBreakdown({ routes = [], isMM }: Props) {
  const [wallchainStatus] = useWallchainStatus()
  const { t } = useTranslation()
  const routeDisplayModal = useModalV2()
  const deferWallchainStatus = useDebounce(wallchainStatus, 500)

  if (!routes.length) {
    return null
  }

  const count = routes.length

  return (
    <>
      <RouteInfoContainer>
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <Text fontSize="14px" color="textSubtle">
            {isMM ? t('MM Route') : deferWallchainStatus === 'found' ? t('Bonus Route') : t('Route')}
          </Text>
          <QuestionHelper
            text={
              deferWallchainStatus === 'found'
                ? t(
                    'A Bonus route provided by API is automatically selected for your trade to achieve the best price for your trade.',
                  )
                : t(
                    'Route is automatically calculated based on your routing preference to achieve the best price for your trade.',
                  )
            }
            ml="4px"
            placement="top-start"
          />
        </span>
        <Box onClick={routeDisplayModal.onOpen} role="button">
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {count > 1 ? (
              <Text fontSize="14px">{t('%count% Separate Routes', { count })}</Text>
            ) : (
              <RouteComp route={routes[0]} />
            )}
            <IconButton ml="8px" variant="text" color="textSubtle" scale="xs">
              <SearchIcon width="16px" height="16px" color="textSubtle" />
            </IconButton>
          </span>
        </Box>
        <RouteDisplayModal {...routeDisplayModal} routes={routes} />
      </RouteInfoContainer>
    </>
  )
})

interface RouteProps {
  route: Route
}

function RouteComp({ route }: RouteProps) {
  const { path } = route

  return (
    <RowBetween>
      <SwapRoute path={path} />
    </RowBetween>
  )
}
