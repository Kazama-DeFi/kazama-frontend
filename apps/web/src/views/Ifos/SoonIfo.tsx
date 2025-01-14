import { bscTokens } from '@kazamaswap/tokens'

import { useFetchIfo, useIfoCredit } from 'state/pools/hooks'
import { useActiveChainId } from 'hooks/useActiveChainId'

import IfoContainer from './components/IfoContainer'
import IfoSteps from './components/IfoSteps'
import ComingSoonSection from './components/ComingSoonSection'
import { useICakeBridgeStatus } from './hooks/useIfoCredit'

const SoonIfo = () => {
  useFetchIfo()
  const { chainId } = useActiveChainId()
  const ifoCredit = useIfoCredit()
  const { sourceChainCredit } = useICakeBridgeStatus({
    ifoChainId: chainId,
    ifoCredit,
  })
  return (
    <IfoContainer
      ifoSection={<ComingSoonSection />}
      ifoSteps={
        <IfoSteps
          isLive={false}
          hasClaimed={false}
          isCommitted={false}
          ifoCurrencyAddress={bscTokens.cake.address}
          sourceChainIfoCredit={sourceChainCredit}
        />
      }
    />
  )
}

export default SoonIfo
