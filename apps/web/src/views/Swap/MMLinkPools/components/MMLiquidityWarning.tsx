import { Alert } from '@kazamaswap/uikit'
import { useTranslation } from '@kazamaswap/localization'

export const MMLiquidityWarning: React.FC = () => {
  const { t } = useTranslation()
  return <Alert title={t('MMs are temporarily unable to facilitate trades. Please try again later')} variant="info" />
}
