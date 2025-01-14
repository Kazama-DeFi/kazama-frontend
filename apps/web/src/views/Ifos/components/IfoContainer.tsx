import { ReactElement } from 'react'
import { styled } from 'styled-components'
import { useTranslation } from '@kazamaswap/localization'
import { Box, Container, LinkExternal } from '@kazamaswap/uikit'

import IfoLayout, { IfoLayoutWrapper } from './IfoLayout'
import IfoPoolVaultCard from './IfoPoolVaultCard'
import IfoQuestions from './IfoQuestions'

const IfoStepBackground = styled(Box)`
  background: ${({ theme }) => theme.colors.gradientKazamaStyle};
`

interface TypeProps {
  ifoSection: ReactElement
  ifoSteps: ReactElement
  ifoBasicSaleType?: number
}

const IfoContainer: React.FC<React.PropsWithChildren<TypeProps>> = ({ ifoSection, ifoSteps, ifoBasicSaleType }) => {
  const { t } = useTranslation()

  return (
    <IfoLayout id="current-ifo" py={['24px', '24px', '40px']}>
      <Container>
        <IfoLayoutWrapper>
          <IfoPoolVaultCard ifoBasicSaleType={ifoBasicSaleType} />
          {ifoSection}
        </IfoLayoutWrapper>
      </Container>
      <IfoStepBackground>
        <Container>{ifoSteps}</Container>
      </IfoStepBackground>
      <Container>
        <IfoQuestions />
        <LinkExternal
          href="https://docs.pancakeswap.finance/contact-us/business-partnerships#ifos-token-sales"
          mx="auto"
          mt="16px"
        >
          {t('Apply to run an IFO!')}
        </LinkExternal>
      </Container>
    </IfoLayout>
  )
}

export default IfoContainer
