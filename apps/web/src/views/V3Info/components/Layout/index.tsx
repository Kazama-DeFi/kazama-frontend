import { useMemo } from 'react'
import { useTranslation } from '@kazamaswap/localization'
import { SubMenuItems } from '@kazamaswap/uikit'
import { useRouter } from 'next/router'
import { useChainNameByQuery, useMultiChainPath } from 'state/info/hooks'
import { v3InfoPath } from '../../constants'
import InfoNav from './InfoNav'

export const InfoPageLayout = ({ children }) => {
  const router = useRouter()
  const chainName = useChainNameByQuery()
  const chainPath = useMultiChainPath()
  const isV3 = router?.pathname?.includes(v3InfoPath)
  const { t } = useTranslation()

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
      <SubMenuItems items={subMenuItems} activeItem={isV3 ? `/info/v3${chainPath}` : `/info${chainPath}`} />
      <InfoNav isStableSwap={false} />
      {children}
    </>
  )
}
