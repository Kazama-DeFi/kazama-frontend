import { useTranslation } from '@kazamaswap/localization'
import { FarmWithStakedValue } from '@kazamaswap/farms'
import { Box, Flex, Skeleton, useMatchBreakpoints } from '@kazamaswap/uikit'
import { FarmWidget } from '@kazamaswap/widgets-internal'
import { createElement, useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { BIG_ZERO } from '@kazamaswap/utils/bigNumber'
import { useDelayedUnmount } from '@kazamaswap/hooks'

import ActionPanel from './Actions/ActionPanel'
import Apr, { AprProps } from './Apr'
import Farm from './Farm'

const { MobileColumnSchema, DesktopColumnSchema } = FarmWidget
const { FarmAuctionTag, CoreTag } = FarmWidget.Tags
const { CellLayout, Details, Multiplier, Liquidity, Earned } = FarmWidget.FarmTable

export interface RowProps {
  apr: AprProps
  farm: FarmWidget.FarmTableFarmTokenInfoProps
  earned: FarmWidget.FarmTableEarnedProps
  multiplier: FarmWidget.FarmTableMultiplierProps
  liquidity: FarmWidget.FarmTableLiquidityProps
  details: FarmWithStakedValue
  type: 'core' | 'community'
  initialActivity?: boolean
}

interface RowPropsWithLoading extends RowProps {
  userDataReady: boolean
}

const cells = {
  apr: Apr,
  farm: Farm,
  earned: Earned,
  details: Details,
  multiplier: Multiplier,
  liquidity: Liquidity,
}

const CellInner = styled.div`
  padding: 24px 0px;
  display: flex;
  width: 100%;
  align-items: center;
  padding-right: 8px;

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 32px;
  }
`

const StyledTr = styled.tr`
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 2px solid ${({ theme }) => theme.colors.disabled};
  }
`

const EarnedMobileCell = styled.td`
  padding: 16px 0 24px 16px;
`

const AprMobileCell = styled.td`
  padding-top: 16px;
  padding-bottom: 24px;
`

const FarmMobileCell = styled.td`
  padding-top: 24px;
`

const Row: React.FunctionComponent<React.PropsWithChildren<RowPropsWithLoading>> = (props) => {
  const { t } = useTranslation()
  const { details, initialActivity, multiplier } = props
  const userDataReady = multiplier.multiplier !== undefined
  const hasSetInitialValue = useRef(false)
  const stakedBalance = details.userData ? details.userData.stakedBalance : BIG_ZERO
  const hasStakedAmount = stakedBalance.gt(0)

  const [actionPanelExpanded, setActionPanelExpanded] = useState(hasStakedAmount)
  const shouldRenderChild = useDelayedUnmount(actionPanelExpanded, 300)

  const toggleActionPanel = () => {
    setActionPanelExpanded(!actionPanelExpanded)
  }

  useEffect(() => {
    setActionPanelExpanded(hasStakedAmount)
  }, [hasStakedAmount])
  useEffect(() => {
    if (initialActivity && hasSetInitialValue.current === false) {
      setActionPanelExpanded(initialActivity)
      hasSetInitialValue.current = true
    }
  }, [initialActivity])

  const { isDesktop, isMobile } = useMatchBreakpoints()

  const isSmallerScreen = !isDesktop
  const tableSchema = isSmallerScreen ? MobileColumnSchema : DesktopColumnSchema
  const columnNames = tableSchema.map((column) => column.name)

  const handleRenderRow = () => {
    if (!isMobile) {
      return (
        <StyledTr onClick={toggleActionPanel}>
          {Object.keys(props).map((key) => {
            const columnIndex = columnNames.indexOf(key)
            if (columnIndex === -1) {
              return null
            }

            switch (key) {
              case 'type':
                return (
                  <td key={key}>
                    {userDataReady ? (
                      <CellInner style={{ width: '140px' }}>
                        {props[key] === 'community' ? <FarmAuctionTag scale="sm" /> : <CoreTag scale="sm" />}
                      </CellInner>
                    ) : (
                      <Skeleton width={60} height={24} />
                    )}
                  </td>
                )
              case 'details':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout>
                        <Details actionPanelToggled={actionPanelExpanded} />
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              case 'apr':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout label={t('APR')}>
                        <Apr
                          {...props.apr}
                          hideButton={isSmallerScreen}
                          farmCakePerSecond={multiplier.farmCakePerSecond}
                          totalMultipliers={multiplier.totalMultipliers}
                        />
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              default:
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout label={t(tableSchema[columnIndex].label)}>
                        {createElement(cells[key], { ...props[key], userDataReady })}
                      </CellLayout>
                    </CellInner>
                  </td>
                )
            }
          })}
        </StyledTr>
      )
    }

    return (
      <>
        <tr style={{ cursor: 'pointer' }} onClick={toggleActionPanel}>
          <FarmMobileCell colSpan={3}>
            <Flex justifyContent="space-between" alignItems="center">
              <Farm {...props.farm} />
              {props.type === 'community' ? (
                <FarmAuctionTag marginRight="16px" scale="sm" />
              ) : (
                <Box style={{ marginRight: '16px' }}>
                  <CoreTag scale="sm" />
                </Box>
              )}
            </Flex>
          </FarmMobileCell>
        </tr>
        <StyledTr onClick={toggleActionPanel}>
          <td width="33%">
            <EarnedMobileCell>
              <CellLayout label={t('Earned')}>
                <Earned {...props.earned} userDataReady={!!userDataReady} />
              </CellLayout>
            </EarnedMobileCell>
          </td>
          <td width="33%">
            <AprMobileCell>
              <CellLayout label={t('APR')}>
                <Apr
                  {...props.apr}
                  hideButton
                  farmCakePerSecond={multiplier.farmCakePerSecond}
                  totalMultipliers={multiplier.totalMultipliers}
                />
              </CellLayout>
            </AprMobileCell>
          </td>
          <td width="33%">
            <CellInner style={{ justifyContent: 'flex-end' }}>
              <Details actionPanelToggled={actionPanelExpanded} />
            </CellInner>
          </td>
        </StyledTr>
      </>
    )
  }

  return (
    <>
      {handleRenderRow()}
      {shouldRenderChild && (
        <tr>
          <td colSpan={7}>
            <ActionPanel {...props} expanded={actionPanelExpanded} alignLinksToRight={isMobile} />
          </td>
        </tr>
      )}
    </>
  )
}

export default Row
