import { useQuery } from '@tanstack/react-query'
import { getActiveIfo, getInActiveIfos, getIfoConfig, SUPPORTED_CHAIN_IDS, Ifo } from '@kazamaswap/ifos'

import { useActiveChainId } from 'hooks/useActiveChainId'
import { useMemo } from 'react'

export function useIfoConfigs() {
  const { chainId } = useActiveChainId()
  const { data } = useQuery([chainId, 'ifo-configs'], () => getIfoConfig(chainId))
  return data
}

export function useIfoConfigsAcrossChains() {
  const { chainId } = useActiveChainId()
  const { data } = useQuery([chainId, 'ifo-configs'], async () => {
    const configs = await Promise.all(SUPPORTED_CHAIN_IDS.map(getIfoConfig))
    return configs.reduce<Ifo[]>((acc, cur) => [...acc, ...cur], [])
  })
  return data
}

export function useActiveIfoConfig() {
  const { chainId } = useActiveChainId()
  const { data, isLoading } = useQuery([chainId, 'active-ifo'], () => getActiveIfo(chainId))
  return {
    activeIfo: data,
    isLoading,
  }
}

export function useInActiveIfoConfigs() {
  const { chainId } = useActiveChainId()
  const { data } = useQuery([chainId, 'inactive-ifo-configs'], () => getInActiveIfos(chainId))
  return data
}

export function useIfoConfigById(id: string) {
  const configs = useIfoConfigs()
  return useMemo(() => configs?.find((ifo) => ifo.id === id), [configs, id])
}

export function useIfoConfigAcrossChainsById(id: string) {
  const configs = useIfoConfigsAcrossChains()
  return useMemo(() => configs?.find((ifo) => ifo.id === id), [configs, id])
}
