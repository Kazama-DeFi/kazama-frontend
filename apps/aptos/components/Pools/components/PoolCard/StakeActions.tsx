import { Token } from '@kazamaswap/swap-sdk-core'
import { Pool } from '@kazamaswap/widgets-internal'
import StakeModal from './StakeModal'

export default Pool.withStakeActions<Token>(StakeModal)
