import { CAKE, USDC } from '@kazamaswap/tokens'
import { useCurrency } from 'hooks/Tokens'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { CHAIN_IDS } from 'utils/wagmi'
import { useActiveChainId } from 'hooks/useActiveChainId'
import LiquidityFormProvider from 'views/AddLiquidityV3/formViews/V3FormView/form/LiquidityFormProvider'
import IncreaseLiquidityV3 from 'views/AddLiquidityV3/IncreaseLiquidityV3'

const AddLiquidityPage = () => {
  const router = useRouter()
  const { chainId } = useActiveChainId()

  const native = useNativeCurrency()

  const [currencyIdA, currencyIdB] = router.query.currency || [
    native.symbol,
    CAKE[chainId]?.address ?? USDC[chainId]?.address,
  ]

  const currencyA = useCurrency(currencyIdA)
  const currencyB = useCurrency(currencyIdB)

  return (
    <LiquidityFormProvider>
      <IncreaseLiquidityV3 currencyA={currencyA} currencyB={currencyB} />
    </LiquidityFormProvider>
  )
}

AddLiquidityPage.chains = CHAIN_IDS

export default AddLiquidityPage

const OLD_PATH_STRUCTURE = /^(0x[a-fA-F0-9]{40}|BNB)-(0x[a-fA-F0-9]{40}|BNB)$/

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { currency: [] } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { currency = [] } = params
  const [currencyIdA, currencyIdB, feeAmountFromUrl, tokenId] = currency
  const match = currencyIdA?.match(OLD_PATH_STRUCTURE)

  const isNumberReg = /^\d+$/

  if (match?.length) {
    return {
      redirect: {
        statusCode: 301,
        destination: `/add/${match[1]}/${match[2]}`,
      },
    }
  }

  if (currencyIdA && currencyIdB && currencyIdA.toLowerCase() === currencyIdB.toLowerCase()) {
    return {
      redirect: {
        statusCode: 303,
        destination: `/add/${currencyIdA}`,
      },
    }
  }

  if (!(feeAmountFromUrl as string)?.match(isNumberReg) || !(tokenId as string)?.match(isNumberReg)) {
    return {
      notFound: true,
    }
  }

  return {
    props: {},
  }
}
