import { Token } from '@kazamaswap/sdk'
import { TooltipText, useTooltip, Balance } from '@kazamaswap/uikit'
import { Pool } from '@kazamaswap/widgets-internal'

import AutoEarningsBreakdown from '../AutoEarningsBreakdown'

interface RecentCakeProfitBalanceProps {
  cakeToDisplay: number
  pool: Pool.DeserializedPool<Token>
  account: string
}

const RecentCakeProfitBalance: React.FC<React.PropsWithChildren<RecentCakeProfitBalanceProps>> = ({
  cakeToDisplay,
  pool,
  account,
}) => {
  const { targetRef, tooltip, tooltipVisible } = useTooltip(<AutoEarningsBreakdown pool={pool} account={account} />, {
    placement: 'bottom-end',
  })

  return (
    <>
      {tooltipVisible && tooltip}
      <TooltipText ref={targetRef} small>
        <Balance fontSize="14px" value={cakeToDisplay} />
      </TooltipText>
    </>
  )
}

export default RecentCakeProfitBalance
