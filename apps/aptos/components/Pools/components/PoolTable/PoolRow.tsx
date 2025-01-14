import { memo } from 'react'
import { useMatchBreakpoints } from '@kazamaswap/uikit'
import { Pool } from '@kazamaswap/widgets-internal'

import { Coin } from '@kazamaswap/aptos-swap-sdk'
import { TokenPairImage } from 'components/TokenImage'
import useLedgerTimestamp from 'hooks/useLedgerTimestamp'
import Apr from '../PoolCard/Apr'
import ActionPanel from './ActionPanel'

const PoolRow: React.FC<
  React.PropsWithChildren<{
    sousId: number
    account?: string
    initialActivity?: boolean
    pool: Pool.DeserializedPool<Coin>
  }>
> = ({ account = '', initialActivity, pool }) => {
  const { isLg, isXl, isXxl } = useMatchBreakpoints()
  const isLargerScreen = isLg || isXl || isXxl
  const { stakingToken, totalStaked, earningToken } = pool

  const getNow = useLedgerTimestamp()

  return (
    <Pool.ExpandRow initialActivity={initialActivity} panel={<ActionPanel account={account} pool={pool} expanded />}>
      <Pool.NameCell<Coin>
        pool={pool}
        tokenPairImage={
          <TokenPairImage
            mr="8px"
            width={40}
            height={40}
            style={{ minWidth: 40 }}
            primaryToken={earningToken}
            secondaryToken={stakingToken}
          />
        }
      />
      <Pool.EarningsCell<Coin> pool={pool} account={account} />
      {isLargerScreen && (
        <Pool.TotalStakedCell
          stakingTokenDecimals={stakingToken?.decimals}
          stakingTokenSymbol={stakingToken?.symbol}
          totalStaked={totalStaked}
        />
      )}
      <Pool.AprCell<Coin> pool={pool} aprComp={Apr} />
      {isLargerScreen && <Pool.EndsInCell<Coin> pool={pool} getNow={getNow} />}
    </Pool.ExpandRow>
  )
}

export default memo(PoolRow)
