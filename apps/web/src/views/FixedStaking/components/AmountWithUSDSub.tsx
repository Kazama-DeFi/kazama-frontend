import { Currency, CurrencyAmount } from '@kazamaswap/swap-sdk-core'
import { Balance, Text } from '@kazamaswap/uikit'

import { useStablecoinPriceAmount } from 'hooks/useBUSDPrice'
import toNumber from 'lodash/toNumber'
import React from 'react'

export function AmountWithUSDSub({
  amount,
  shouldStrike,
  fontSize,
  mb = '-4px',
}: {
  fontSize?: string
  shouldStrike?: boolean
  amount: CurrencyAmount<Currency>
  mb?: string
}) {
  const formattedUsdAmount = useStablecoinPriceAmount(amount.currency.wrapped, toNumber(amount.toSignificant(6)))

  return React.createElement(
    shouldStrike ? 's' : React.Fragment,
    undefined,
    <>
      <Text fontSize={fontSize} bold mb={mb}>
        {amount.toSignificant(5)} {amount.currency.wrapped.symbol}
      </Text>
      <Balance
        unit=" USD"
        color="textSubtle"
        prefix="~$"
        fontSize="12px"
        decimals={2}
        value={formattedUsdAmount || 0}
      />
    </>,
  )
}
