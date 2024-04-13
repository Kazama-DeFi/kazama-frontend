import { styled } from 'styled-components'
import { Box } from '@kazamaswap/uikit'

const PageContainer = styled(Box)`
  display: flex;
  height: calc(100vh - 56px);
  background: ${({ theme }) => theme.colors.backgroundAlt};

  ${({ theme }) => theme.mediaQueries.sm} {
    min-height: 1000px;
    background: ${({ theme }) => theme.colors.gradientKazamaStyle};
  }
`

const Page = ({ children }) => {
  return <PageContainer>{children}</PageContainer>
}

export default Page
