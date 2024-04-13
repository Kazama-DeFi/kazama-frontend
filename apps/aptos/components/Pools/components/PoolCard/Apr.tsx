import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Pool } from '@kazamaswap/widgets-internal'
import { Coin } from '@kazamaswap/aptos-swap-sdk'

const withShownApr = (AprComp) => (props) => {
  const { account } = useActiveWeb3React()

  const { shouldShowBlockCountdown, hasPoolStarted } = {
    shouldShowBlockCountdown: false,
    hasPoolStarted: false,
  }

  return (
    <AprComp
      {...props}
      shouldShowApr={hasPoolStarted || !shouldShowBlockCountdown}
      account={account}
      autoCompoundFrequency={0}
    />
  )
}

export default withShownApr(Pool.Apr<Coin>)
