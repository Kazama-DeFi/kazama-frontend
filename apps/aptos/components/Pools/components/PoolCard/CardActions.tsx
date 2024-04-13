import { Pool } from '@kazamaswap/widgets-internal'
import { Coin } from '@kazamaswap/aptos-swap-sdk'
import StakeActions from './StakeActions'
import HarvestActions from './HarvestActions'

export default Pool.withCardActions<Coin>(HarvestActions, StakeActions)
