import { Flex, Heading } from '@kazamaswap/uikit'
import { CurrencyLogo } from '@kazamaswap/widgets-internal'
import { useTranslation } from '@kazamaswap/localization'
import { Currency } from '@kazamaswap/swap-sdk-core'
import { UnlockedFixedTag } from './UnlockedFixedTag'

export function ModalTitle({
  tokenTitle,
  token,
  lockPeriod,
  isEnded,
}: {
  isEnded?: boolean
  token: Currency
  tokenTitle: string
  lockPeriod?: number
}) {
  const { t } = useTranslation()

  return (
    <Flex alignItems="center">
      <CurrencyLogo currency={token} size="32px" />
      <Heading scale="lg" mx="8px">
        {tokenTitle}
      </Heading>
      {lockPeriod ? (
        <UnlockedFixedTag>
          {lockPeriod}D {isEnded ? t('Ended') : null}
        </UnlockedFixedTag>
      ) : null}
    </Flex>
  )
}
