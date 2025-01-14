import { Currency, CurrencyAmount, TradeType } from '@kazamaswap/sdk'
import { string as zString, object as zObject, nativeEnum as zNativeEnum, number as zNumber } from 'zod'
import { MutableRefObject } from 'react'
import { SmartRouterTrade } from '@kazamaswap/smart-router/evm'
import { Field } from 'state/swap/actions'

export enum MessageType {
  RFQ_REQUEST = 'RFQ_REQUEST',
  RFQ_RESPONSE = 'RFQ_RESPONSE',
  ORDER_BOOK_PRICE_RESPONSE = 'ORDER_BOOK_PRICE_RESPONSE',
  RFQ_SUCCESS = 'RFQ_SUCCESS',
  RFQ_ERROR = 'RFQ_ERROR',
}

export const zRFQResponse = zObject({
  messageType: zNativeEnum(MessageType),
  message: zObject({
    makerSideToken: zString(),
    takerSideToken: zString(),
    makerSideTokenAmount: zString(),
    takerSideTokenAmount: zString(),
    rfqId: zString(),
    mmId: zString().optional(),
    signature: zString(),
    quoteExpiry: zNumber(),
  }),
})

export interface RFQResponse {
  messageType: MessageType.RFQ_RESPONSE
  message: {
    // Same as RFQ
    makerSideToken: string
    takerSideToken: string

    // Amounts are in decimals.
    makerSideTokenAmount: string
    takerSideTokenAmount: string
    // This should be the same rfqId that was sent by the server
    rfqId: string

    // This will be set by server
    mmId?: string
    signature: string
    // The unix timestamp when the quote expires, in seconds.
    quoteExpiry: number
    nonce: string
    trader: string
  }
}

export interface RFQErrorResponse {
  message: {
    error: string
    rfqId: string
  }
  messageType: MessageType.RFQ_ERROR
}

export type OrderBookRequest = {
  networkId: number
  makerSideToken: string
  takerSideToken: string
  makerSideTokenAmount?: string
  takerSideTokenAmount?: string
  trader: string
}

export interface OrderBookResponse {
  messageType: MessageType.ORDER_BOOK_PRICE_RESPONSE
  message: {
    error?: string
    makerSideToken: string
    takerSideToken: string
    makerSideTokenAmount: string
    takerSideTokenAmount: string
  }
}

export type QuoteRequest = OrderBookRequest

export type RFQIdResponse = {
  messageType: MessageType.RFQ_SUCCESS
  message: {
    rfqId: string
  }
}

export interface MMOrderBookTrade {
  currencies: { [field in Field]?: Currency }
  currencyBalances: { [field in Field]?: CurrencyAmount<Currency> }
  parsedAmount: CurrencyAmount<Currency> | undefined
  trade?: SmartRouterTrade<TradeType> | null
  inputError?: string
  mmParam: OrderBookRequest
  rfqUserInputPath: MutableRefObject<string>
  isRFQLive: MutableRefObject<boolean>
  isLoading: boolean
}

export interface MMRfqTrade {
  rfq: RFQResponse['message'] | null | undefined
  trade: SmartRouterTrade<TradeType>
  refreshRFQ: () => void
  quoteExpiry: number
  isLoading: boolean
  error?: Error
  rfqId?: string
}
