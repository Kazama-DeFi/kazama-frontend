import { Box, Link, Text } from '@kazamaswap/uikit'
import { useTranslation } from '@kazamaswap/localization'

const LUSDWarning = () => {
  const { t } = useTranslation()

  return (
    <Box maxWidth="380px">
      <Text>{t('Caution - lUSD Token')}</Text>
      <Text>
        {t(
          'Please exercise due caution when trading or providing liquidity for the lUSD token. The protocol was recently affected by an ',
        )}
        <Link
          m="0 4px"
          style={{ display: 'inline' }}
          href="https://twitter.com/LinearFinance/status/1704818417880936535"
        >
          {t('exploit.')}
        </Link>
        {t('For more information, please refer to Linear Finance’s')}
        <Link ml="4px" style={{ display: 'inline' }} href="https://twitter.com/LinearFinance">
          {t('Twitter')}
        </Link>
      </Text>
    </Box>
  )
}

export default LUSDWarning
