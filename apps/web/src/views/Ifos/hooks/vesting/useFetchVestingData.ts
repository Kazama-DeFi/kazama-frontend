import useSWR from 'swr'
import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { Ifo, PoolIds } from '@kazamaswap/ifos'
import BigNumber from 'bignumber.js'

import { useIfoConfigsAcrossChains } from 'hooks/useIfoConfig'
import { FAST_INTERVAL } from 'config/constants'

import { fetchUserWalletIfoData } from './fetchUserWalletIfoData'

const useFetchVestingData = () => {
  const { address: account } = useAccount()
  const configs = useIfoConfigsAcrossChains()
  const allVestingIfo = useMemo<Ifo[]>(
    () => configs?.filter((ifo) => ifo.version >= 3.2 && ifo.vestingTitle) || [],
    [configs],
  )

  const { data, mutate } = useSWR(
    account ? ['vestingData'] : null,
    async () => {
      const allData = await Promise.all(
        allVestingIfo.map(async (ifo) => {
          const response = await fetchUserWalletIfoData(ifo, account)
          return response
        }),
      )

      const currentTimeStamp = Date.now()

      return allData.filter(
        // eslint-disable-next-line array-callback-return, consistent-return
        (ifo) => {
          const { userVestingData } = ifo
          if (
            userVestingData[PoolIds.poolBasic].offeringAmountInToken.gt(0) ||
            userVestingData[PoolIds.poolUnlimited].offeringAmountInToken.gt(0)
          ) {
            if (
              userVestingData[PoolIds.poolBasic].vestingComputeReleasableAmount.gt(0) ||
              userVestingData[PoolIds.poolUnlimited].vestingComputeReleasableAmount.gt(0)
            ) {
              return ifo
            }
            const vestingStartTime = new BigNumber(userVestingData.vestingStartTime)
            const isPoolUnlimitedLive = vestingStartTime
              .plus(userVestingData[PoolIds.poolUnlimited].vestingInformationDuration)
              .times(1000)
              .gte(currentTimeStamp)
            if (isPoolUnlimitedLive) return ifo
            const isPoolBasicLive = vestingStartTime
              .plus(userVestingData[PoolIds.poolBasic].vestingInformationDuration)
              .times(1000)
              .gte(currentTimeStamp)
            if (isPoolBasicLive) return ifo
            return false
          }
          return false
        },
      )
    },
    {
      revalidateOnFocus: false,
      refreshInterval: FAST_INTERVAL,
      dedupingInterval: FAST_INTERVAL,
    },
  )

  return {
    data: data || [],
    fetchUserVestingData: mutate,
  }
}

export default useFetchVestingData
