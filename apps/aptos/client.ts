import { createClient } from '@kazamaswap/awgmi'
import { PetraConnector } from '@kazamaswap/awgmi/connectors/petra'
import { MartianConnector } from '@kazamaswap/awgmi/connectors/martian'
import { BloctoConnector } from '@kazamaswap/awgmi/connectors/blocto'
import { PontemConnector } from '@kazamaswap/awgmi/connectors/pontem'
import { FewchaConnector } from '@kazamaswap/awgmi/connectors/fewcha'
import { SafePalConnector } from '@kazamaswap/awgmi/connectors/safePal'
import { RiseConnector } from '@kazamaswap/awgmi/connectors/rise'
import { MsafeConnector } from '@kazamaswap/awgmi/connectors/msafe'
import { AptosClient } from 'aptos'
import { chains, defaultChain } from 'config/chains'

const NODE_REAL_API = process.env.NEXT_PUBLIC_NODE_REAL_API
const NODE_REAL_API_TESTNET = process.env.NEXT_PUBLIC_NODE_REAL_API_TESTNET

const nodeReal = {
  ...(NODE_REAL_API && {
    mainnet: NODE_REAL_API,
  }),
  ...(NODE_REAL_API_TESTNET && {
    testnet: NODE_REAL_API_TESTNET,
  }),
}

export const msafeConnector = new MsafeConnector({ chains })

export const client = createClient({
  connectors: [
    new PetraConnector({ chains }),
    new MartianConnector({ chains }),
    new PontemConnector({ chains }),
    new FewchaConnector({ chains }),
    new BloctoConnector({ chains, options: { appId: 'e2f2f0cd-3ceb-4dec-b293-bb555f2ed5af' } }),
    new PetraConnector({ chains, options: { name: 'Trust Wallet', id: 'trustWallet' } }),
    new SafePalConnector({ chains }),
    new RiseConnector({ chains }),
    msafeConnector,
  ],
  provider: ({ networkName }) => {
    const networkNameLowerCase = networkName?.toLowerCase()
    if (networkNameLowerCase) {
      const foundChain = chains.find((c) => c.network === networkNameLowerCase)
      if (foundChain) {
        if (foundChain.nodeUrls.nodeReal && nodeReal[networkNameLowerCase]) {
          return new AptosClient(`${foundChain.nodeUrls.nodeReal}/${nodeReal[networkNameLowerCase]}`, {
            WITH_CREDENTIALS: false,
          })
        }
        return new AptosClient(foundChain.nodeUrls.default)
      }
    }

    return new AptosClient(defaultChain.nodeUrls.default)
  },
  autoConnect: false,
})
