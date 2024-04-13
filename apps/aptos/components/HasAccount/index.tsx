import { useAccount } from '@kazamaswap/awgmi'
import { useIsMounted } from '@kazamaswap/hooks'

export default function HasAccount({ fallbackComp, children }) {
  const { account } = useAccount()
  const isMounted = useIsMounted()

  return isMounted && account ? <>{children}</> : fallbackComp
}
