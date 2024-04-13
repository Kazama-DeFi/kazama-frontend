import { useTranslation } from '@kazamaswap/localization'
import { Box, Flex, PageSection, Text, useMatchBreakpoints } from '@kazamaswap/uikit'
import useTheme from 'hooks/useTheme'
import { styled } from 'styled-components'
import MultipleBanner from './components/Banners/MultipleBanner'
import CakeDataRow from './components/CakeDataRow'
import CakeSection from './components/CakeSection'
import CommunitySection from './components/CommunitySection'
import { RightTopBox } from './components/CommunitySection/ImagesOnBg'
import EcoSystemSection from './components/EcoSystemSection'
import Footer from './components/Footer'
import Hero from './components/Hero'
import MetricsSection from './components/MetricsSection'
import { NewsSection } from './components/NewsSection'
import {
  InnerWedgeWrapper,
  OuterWedgeWrapper,
  WedgeBottomRight,
  WedgeTopLeft,
  WedgeTopRight,
} from './components/WedgeSvgs'
import Page from 'components/Layout/Page'

const StyledHeroSection = styled(PageSection)`
  padding-top: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 48px;
  }
`

const Header = styled.div`
margin-top: 64px;
min-height: 315px;
position: relative;
  border-radius: 8px;
`

const Home: React.FC<React.PropsWithChildren> = () => {
  const { theme } = useTheme()
  const HomeSectionContainerStyles = { margin: '0', width: '100%', maxWidth: '968px', padding: '0px 0px' }
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  return (
    <Page>
        <Header />
    </Page>
  )
}

export default Home
