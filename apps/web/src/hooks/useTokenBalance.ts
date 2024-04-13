import { ChainId } from '@kazamaswap/chains'
import { CAKE, USDC, USDT, bscTokens } from '@kazamaswap/tokens'
import { BIG_ZERO } from '@kazamaswap/utils/bigNumber'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'

import { Address, erc20ABI, useAccount, useBalance, useContractRead } from 'wagmi'
import { useActiveChainId } from './useActiveChainId'

const useTokenBalance = (tokenAddress: Address, forceBSC?: boolean) => {
  return useTokenBalanceByChain(tokenAddress, forceBSC ? ChainId.BSC : undefined)
}

export const useTokenBalanceByChain = (tokenAddress: Address, chainIdOverride?: ChainId) => {
  const { address: account } = useAccount()
  const { chainId } = useActiveChainId()

  const { data, status, ...rest } = useContractRead({
    chainId: chainIdOverride || chainId,
    abi: erc20ABI,
    address: tokenAddress,
    functionName: 'balanceOf',
    args: [account || '0x'],
    enabled: !!account,
    watch: true,
  })

  return {
    ...rest,
    fetchStatus: status,
    balance: useMemo(() => (typeof data !== 'undefined' ? new BigNumber(data.toString()) : BIG_ZERO), [data]),
  }
}

export const useGetBnbBalance = () => {
  const { address: account } = useAccount()
  const { status, refetch, data } = useBalance({
    chainId: ChainId.BSC,
    address: account,
    watch: true,
    enabled: !!account,
  })

  return { balance: data?.value ? BigInt(data.value) : 0n, fetchStatus: status, refresh: refetch }
}

export const useBSCCakeBalance = () => {
  const { balance, fetchStatus } = useTokenBalance(CAKE[ChainId.BSC]?.address, true)

  return { balance: BigInt(balance.toString()), fetchStatus }
}

export const useBSCUSDCBalance = () => {
  const { balance, fetchStatus } = useTokenBalance(USDC[ChainId.BSC]?.address, true)
  return { balance: BigInt(balance.toString()), fetchStatus }
}

export const useBSCUSDTBalance = () => {
  const { balance, fetchStatus } = useTokenBalance(USDT[ChainId.BSC]?.address, true)
  return { balance: BigInt(balance.toString()), fetchStatus }
}

export const useBSCBTCBalance = () => {
  const { balance, fetchStatus } = useTokenBalance(bscTokens.btcb.address, true)
  return { balance: BigInt(balance.toString()), fetchStatus }
}

export const useBSCETHBalance = () => {
  const { balance, fetchStatus } = useTokenBalance(bscTokens.eth.address, true)
  return { balance: BigInt(balance.toString()), fetchStatus }
}

export const useBSCDAIBalance = () => {
  const { balance, fetchStatus } = useTokenBalance(bscTokens.dai.address, true)
  return { balance: BigInt(balance.toString()), fetchStatus }
}

export const useBSCAPEBalance = () => {
  const { balance, fetchStatus } = useTokenBalance(bscTokens.ape.address, true)
  return { balance: BigInt(balance.toString()), fetchStatus }
}

export const useBSCPEPEBalance = () => {
  const { balance, fetchStatus } = useTokenBalance(bscTokens.pepe.address, true)
  return { balance: BigInt(balance.toString()), fetchStatus }
}

export const useBSCSHIBABalance = () => {
  const { balance, fetchStatus } = useTokenBalance(bscTokens.shib.address, true)
  return { balance: BigInt(balance.toString()), fetchStatus }
}

export default useTokenBalance
