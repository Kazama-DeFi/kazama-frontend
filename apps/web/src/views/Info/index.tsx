import { useTranslation } from '@kazamaswap/localization'
import { SubMenuItems } from '@kazamaswap/uikit'
import { useRouter } from 'next/router'
import { useChainNameByQuery, useMultiChainPath } from 'state/info/hooks'
import { useMemo } from 'react'
import InfoNav from './components/InfoNav'

export const InfoPageLayout = ({ children }) => {
  const router = useRouter()
  const chainName = useChainNameByQuery()
  const chainPath = useMultiChainPath()
  const { t } = useTranslation()
  const isStableSwap = router.query.type === 'stableSwap'
  const subMenuItems = useMemo(
    () => [
      {
        label: t('V3'),
        href: `/info/v3${chainPath}`,
      },
      {
        label: t('V2'),
        href: `/info${chainPath}`,
      },
      chainName === 'BSC' && {
        label: t('StableSwap'),
        href: '/info?type=stableSwap',
      },
    ],
    [t, chainPath, chainName],
  )

  return (
    <>
      <SubMenuItems items={subMenuItems} activeItem={isStableSwap ? '/info?type=stableSwap' : `/info${chainPath}`} />

      <InfoNav isStableSwap={isStableSwap} />
      {children}
    </>
  )
}
