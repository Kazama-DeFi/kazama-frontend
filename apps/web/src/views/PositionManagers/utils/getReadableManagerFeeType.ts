import { TranslateFunction } from '@kazamaswap/localization'
import { ManagerFeeType } from '@kazamaswap/position-managers'

export function getReadableManagerFeeType(t: TranslateFunction, feeType: ManagerFeeType) {
  switch (feeType) {
    case ManagerFeeType.LP_REWARDS:
      return t('% of LP rewards')
    default:
      return ''
  }
}
