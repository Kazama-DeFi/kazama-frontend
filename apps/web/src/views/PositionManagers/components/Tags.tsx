import { memo } from 'react'
import { Tag, TagProps } from '@kazamaswap/uikit'
import { useTranslation } from '@kazamaswap/localization'
import { FarmWidget } from '@kazamaswap/widgets-internal'

const { V3FeeTag, CompoundingPoolTag } = FarmWidget.Tags

export const FarmTag = memo(function FarmTag(props: TagProps) {
  const { t } = useTranslation()
  return (
    <Tag variant="warning" outline {...props}>
      {t('Farm')}
    </Tag>
  )
})

export const SingleTokenTag = memo(function SingleTokenTag(props: TagProps) {
  const { t } = useTranslation()
  return (
    <Tag variant="success" outline {...props}>
      {t('Single Token')}
    </Tag>
  )
})

export { V3FeeTag as FeeTag, CompoundingPoolTag as AutoCompoundTag }
