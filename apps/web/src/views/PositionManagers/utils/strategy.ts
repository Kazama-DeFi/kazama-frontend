import { TranslateFunction } from '@kazamaswap/localization'
import { Strategy } from '@kazamaswap/position-managers'

export function getStrategyName(t: TranslateFunction, strategy: Strategy) {
  switch (strategy) {
    case Strategy.TYPICAL_WIDE:
      return t('Typical Wide')
    case Strategy.YIELD_IQ:
      return t('Yield IQ')
    default:
      return ''
  }
}
