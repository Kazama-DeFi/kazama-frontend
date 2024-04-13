import { Token } from '@kazamaswap/sdk'
import { Pool } from '@kazamaswap/widgets-internal'
import StakeModal from '../../Modals/StakeModal'

export default Pool.withStakeActions<Token>(StakeModal)
