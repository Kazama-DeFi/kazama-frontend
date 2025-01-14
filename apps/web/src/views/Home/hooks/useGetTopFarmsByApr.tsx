import { FetchStatus } from 'config/constants/types';
import { useActiveChainId } from 'hooks/useActiveChainId';
import { useCakePrice } from 'hooks/useCakePrice';
import orderBy from 'lodash/orderBy';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'state';
import { fetchFarmsPublicDataAsync } from 'state/farms';
import { useFarms } from 'state/farms/hooks';
import { useFarmsV3 } from 'state/farmsV3/hooks';
import useSWR from 'swr';
import { getFarmApr } from 'utils/apr';

import { getFarmConfig } from '@kazamaswap/farms/constants';

const useGetTopFarmsByApr = (isIntersecting: boolean) => {
  const dispatch = useAppDispatch()
  const { data: farms, regularCakePerBlock } = useFarms()
  const { data: farmsV3, isLoading } = useFarmsV3()
  const [topFarms, setTopFarms] = useState<{ lpSymbol: string; apr: number; lpRewardsApr: number; version: 2 | 3 }[]>(
    () => [null, null, null, null, null],
  )
  const kazamaPriceBusd = useCakePrice()
  const { chainId } = useActiveChainId()

  const { status: fetchStatus, isValidating } = useSWR(
    isIntersecting && chainId && [chainId, 'fetchTopFarmsByApr'],
    async () => {
      const farmsConfig = await getFarmConfig(chainId)
      const activeFarms = farmsConfig.filter((farm) => farm.pid !== 0)
      return dispatch(fetchFarmsPublicDataAsync({ pids: activeFarms.map((farm) => farm.pid), chainId }))
    },
    { revalidateOnFocus: false, revalidateOnReconnect: false },
  )

  useEffect(() => {
    if (fetchStatus === FetchStatus.Fetched && farms?.length > 0 && !isLoading) {
      const farmsWithPrices = farms.filter(
        (farm) =>
          farm.lpTotalInQuoteToken &&
          farm.quoteTokenPriceBusd &&
          farm.pid !== 0 &&
          farm.multiplier &&
          farm.multiplier !== '0X',
      )
      const farmsWithApr = farmsWithPrices.map((farm) => {
        const totalLiquidity = farm.lpTotalInQuoteToken.times(farm.quoteTokenPriceBusd)
        const { cakeRewardsApr, lpRewardsApr } = getFarmApr(
          chainId,
          farm.poolWeight,
          kazamaPriceBusd,
          totalLiquidity,
          farm.lpAddress,
          regularCakePerBlock,
        )
        return { ...farm, apr: cakeRewardsApr, lpRewardsApr, version: 2 as const }
      })

      const activeFarmV3 = farmsV3.farmsWithPrice
        .filter((f) => f.multiplier !== '0X' && 'cakeApr' in f)
        .map((f) => ({
          ...f,
          apr: +f.cakeApr,
          // lpRewardsApr missing
          lpRewardsApr: 0,
          version: 3 as const,
        }))

      const sortedByApr = orderBy([...farmsWithApr, ...activeFarmV3], (farm) => farm.apr + farm.lpRewardsApr, 'desc')
      setTopFarms(sortedByApr.slice(0, 5))
    }
  }, [kazamaPriceBusd, chainId, farms, farmsV3.farmsWithPrice, fetchStatus, isLoading, regularCakePerBlock])
  return { topFarms, fetched: fetchStatus === FetchStatus.Fetched && !isValidating, chainId }
}

export default useGetTopFarmsByApr
