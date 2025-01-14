import { ChainId } from '@kazamaswap/chains'
import { CHAINS } from 'config/chains'
import { PUBLIC_NODES } from 'config/nodes'
import { createPublicClient, http, fallback, PublicClient } from 'viem'

export const viemClients = CHAINS.reduce((prev, cur) => {
  return {
    ...prev,
    [cur.id]: createPublicClient({
      chain: cur,
      transport: fallback(
        (PUBLIC_NODES[cur.id] as string[]).map((url) =>
          http(url, {
            timeout: 10_000,
          }),
        ),
        {
          rank: false,
        },
      ),
      batch: {
        multicall: {
          batchSize: cur.id === ChainId.POLYGON_ZKEVM ? 128 : 1024 * 200,
          wait: 16,
        },
      },
      pollingInterval: 6_000,
    }),
  }
}, {} as Record<ChainId, PublicClient>)

export const getViemClients = ({ chainId }: { chainId?: ChainId }) => {
  return viemClients[chainId as ChainId]
}
