import { BigintIsh } from '@kazamaswap/swap-sdk-core'

export function toBigInt(num: BigintIsh): bigint {
  return BigInt(num.toString())
}
