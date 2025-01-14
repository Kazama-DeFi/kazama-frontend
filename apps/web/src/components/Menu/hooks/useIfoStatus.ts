import useSWRImmutable from 'swr/immutable'
import { useMemo } from 'react'
import { ifoV7ABI } from '@kazamaswap/ifos'

import { publicClient } from 'utils/wagmi'
import { useActiveIfoConfig } from 'hooks/useIfoConfig'

export const useIfoStatus = () => {
  const { activeIfo } = useActiveIfoConfig()

  const { data = { startTime: 0, endTime: 0 } } = useSWRImmutable(
    activeIfo ? ['ifo', 'currentIfo_timestamps', activeIfo.chainId] : null,
    async () => {
      const client = publicClient({ chainId: activeIfo?.chainId })
      if (!client || !activeIfo?.chainId) {
        return {
          startTime: 0,
          endTime: 0,
        }
      }

      const [startTimeResponse, endTimeResponse] = await client.multicall({
        contracts: [
          {
            address: activeIfo.address,
            abi: ifoV7ABI,
            functionName: 'startTimestamp',
          },
          {
            address: activeIfo.address,
            abi: ifoV7ABI,
            functionName: 'endTimestamp',
          },
        ],
      })

      return {
        startTime: startTimeResponse.status === 'success' ? Number(startTimeResponse.result) : 0,
        endTime: endTimeResponse.status === 'success' ? Number(endTimeResponse.result) : 0,
      }
    },
  )

  return useMemo(() => {
    const { startTime, endTime } = data
    const now = Math.floor(Date.now() / 1000)
    if (now < startTime) {
      return 'soon'
    }

    if (now >= startTime && now <= endTime) {
      return 'live'
    }

    return null
  }, [data])
}
