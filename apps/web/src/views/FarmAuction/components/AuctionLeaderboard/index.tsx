import { useTranslation } from '@kazamaswap/localization'
import { Box, Card, Flex, Spinner, Text } from '@kazamaswap/uikit'
import { TabToggle, TabToggleGroup } from 'components/TabToggle'
import { Auction, AuctionStatus, Bidder } from 'config/constants/types'
import { useState } from 'react'
import { styled } from 'styled-components'
import AuctionHistory from '../AuctionHistory'
import AuctionLeaderboardTable from './AuctionLeaderboardTable'
import AuctionProgress from './AuctionProgress'
import AuctionRibbon from './AuctionRibbon'

const AuctionLeaderboardCard = styled(Card)`
  width: 100%;
  flex: 2;
`

interface AuctionLeaderboardProps {
  auction: Auction
  bidders: Bidder[]
}

enum Tabs {
  Latest,
  Archive,
}

const getMostRecentClosedAuctionId = (latestAuctionId: number, latestAuctionStatus: AuctionStatus) => {
  if (latestAuctionStatus === AuctionStatus.Closed) {
    return latestAuctionId
  }
  if (latestAuctionId === 0) {
    return null
  }
  return latestAuctionId - 1
}

const CurrentAuctionCard: React.FC<React.PropsWithChildren<AuctionLeaderboardProps>> = ({ auction, bidders }) => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState(Tabs.Latest)

  if (!auction || !bidders) {
    return (
      <AuctionLeaderboardCard>
        <TabToggleGroup>
          <TabToggle isActive={activeTab === Tabs.Latest} onClick={() => setActiveTab(Tabs.Latest)}>
            {t('Latest')}
          </TabToggle>
          <TabToggle isActive={activeTab === Tabs.Archive} onClick={() => setActiveTab(Tabs.Archive)}>
            {t('Archive')}
          </TabToggle>
        </TabToggleGroup>
        <Flex justifyContent="center" alignItems="center" flexDirection="column" height="320px">
          <Spinner />
        </Flex>
      </AuctionLeaderboardCard>
    )
  }
  const { id, status } = auction

  return (
    <AuctionLeaderboardCard>
      <TabToggleGroup>
        <TabToggle isActive={activeTab === Tabs.Latest} onClick={() => setActiveTab(Tabs.Latest)}>
          {t('Latest')}
        </TabToggle>
        <TabToggle isActive={activeTab === Tabs.Archive} onClick={() => setActiveTab(Tabs.Archive)}>
          {t('Archive')}
        </TabToggle>
      </TabToggleGroup>
      {activeTab === Tabs.Latest ? (
        <Box position="relative">
          <Text bold fontSize="20px" py="24px" px={['12px', '24px']}>
            {t('Auction #%auctionId%', { auctionId: id })}
          </Text>
          <AuctionRibbon auction={auction} noAuctionHistory={getMostRecentClosedAuctionId(id, status) === null} />
          <AuctionProgress auction={auction} />
          <AuctionLeaderboardTable bidders={bidders} noBidsText={t('No bids yet')} auctionId={id} />
        </Box>
      ) : (
        <AuctionHistory mostRecentClosedAuctionId={getMostRecentClosedAuctionId(id, status)} />
      )}
    </AuctionLeaderboardCard>
  )
}

export default CurrentAuctionCard
