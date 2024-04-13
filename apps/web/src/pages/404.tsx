import { NotFound } from '@kazamaswap/uikit'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

const NotFoundPage = () => (
  <NotFound LinkComp={Link}>
    <NextSeo title="404" />
  </NotFound>
)

NotFoundPage.chains = []

export default NotFoundPage
