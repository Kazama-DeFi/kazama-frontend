import { createContext } from 'react'
import { FarmWithStakedValue } from '@kazamaswap/farms'
import type { V2StakeValueAndV3Farm } from './FarmsV3'

export const FarmsContext = createContext<{ chosenFarmsMemoized: FarmWithStakedValue[] }>({
  chosenFarmsMemoized: [],
})

export const FarmsV3Context = createContext<{ chosenFarmsMemoized: V2StakeValueAndV3Farm[] }>({
  chosenFarmsMemoized: [],
})
