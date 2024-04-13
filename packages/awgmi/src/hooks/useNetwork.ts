import { getNetwork, watchNetwork } from '@kazamaswap/awgmi/core'
import { useSyncExternalStoreWithTracked } from './useSyncExternalStoreWithTracked'

export function useNetwork() {
  return useSyncExternalStoreWithTracked(watchNetwork, getNetwork)
}
