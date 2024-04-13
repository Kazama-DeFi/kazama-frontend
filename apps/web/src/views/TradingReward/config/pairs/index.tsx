import { ChainId } from '@kazamaswap/chains'
import { ComputedFarmConfigV3, FarmV3SupportedChainId } from '@kazamaswap/farms/src'
import { farmsV3 as ethFarm } from '@kazamaswap/farms/constants/eth'
import { farmsV3 as farm5 } from '@kazamaswap/farms/constants/goerli'
import { farmsV3 as bscFarm } from '@kazamaswap/farms/constants/bsc'
import { farmsV3 as farm97 } from '@kazamaswap/farms/constants/bscTestnet'
import { farmsV3 as zkEvmFarm } from '@kazamaswap/farms/constants/polygonZkEVM'
import { farmsV3 as zkSyncFarm } from '@kazamaswap/farms/constants/zkSync'
import { farmsV3 as lineaFarm } from '@kazamaswap/farms/constants/linea'
import { farmsV3 as arbitrumFarm } from '@kazamaswap/farms/constants/arb'
import { farmsV3 as baseFarm } from '@kazamaswap/farms/constants/base'
import { farmsV3 as opBnbTestnetFarms } from '@kazamaswap/farms/constants/opBnbTestnet'
import { tradingRewardV3Pair as tradingRewardV3Pair56 } from './56'

export const tradingRewardPairConfigChainMap: Record<FarmV3SupportedChainId, ComputedFarmConfigV3[]> = {
  [ChainId.ETHEREUM]: ethFarm,
  [ChainId.GOERLI]: farm5,
  [ChainId.BSC]: [...bscFarm, ...tradingRewardV3Pair56],
  [ChainId.BSC_TESTNET]: farm97,
  [ChainId.POLYGON_ZKEVM]: zkEvmFarm,
  [ChainId.POLYGON_ZKEVM_TESTNET]: [],
  [ChainId.ZKSYNC]: zkSyncFarm,
  [ChainId.ZKSYNC_TESTNET]: [],
  [ChainId.ARBITRUM_ONE]: arbitrumFarm,
  [ChainId.LINEA]: lineaFarm,
  [ChainId.BASE]: baseFarm,
  [ChainId.OPBNB_TESTNET]: opBnbTestnetFarms,
}
