import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { Text, Flex, Td, ProfileAvatar } from '@kazamaswap/uikit'
import { RankListDetail } from 'views/TradingReward/hooks/useRankList'
import { formatNumber } from '@kazamaswap/utils/formatBalance'
import { useProfileForAddress } from 'state/profile/hooks'
import { useDomainNameForAddress } from 'hooks/useDomain'
import truncateHash from '@kazamaswap/utils/truncateHash'
import { useCakePrice } from 'hooks/useCakePrice'

interface DesktopResultProps {
  rank: RankListDetail
}

const DesktopResult: React.FC<React.PropsWithChildren<DesktopResultProps>> = ({ rank }) => {
  const cakePriceBusd = useCakePrice()
  const { profile, isLoading: isProfileLoading } = useProfileForAddress(rank.origin)
  const { domainName, avatar } = useDomainNameForAddress(rank.origin, !profile && !isProfileLoading)

  const cakeAmount = useMemo(
    () => new BigNumber(rank?.estimateRewardUSD).div(cakePriceBusd).toNumber(),
    [cakePriceBusd, rank?.estimateRewardUSD],
  )

  return (
    <tr>
      <Td textAlign="left">
        <Flex>
          <Text bold mr="4px" width="56px" color="secondary" style={{ alignSelf: 'center' }}>
            {rank.rank === 0 ? '--' : rank.rank >= 1000 ? `>#1000` : `#${rank.rank}`}
          </Text>
          <ProfileAvatar width={42} height={42} src={profile?.nft?.image?.thumbnail ?? avatar} />
          <Text style={{ alignSelf: 'center' }} color="primary" bold ml="8px">
            {profile?.username || domainName || truncateHash(rank.origin)}
          </Text>
        </Flex>
      </Td>
      <Td textAlign="left">
        <Text bold>{`$${formatNumber(rank.volume)}`}</Text>
      </Td>
      <Td textAlign="right">
        <Text bold>{`$${formatNumber(rank.estimateRewardUSD)}`}</Text>
        <Text fontSize={12} color="textSubtle">
          {`~${formatNumber(cakeAmount)} CAKE`}
        </Text>
      </Td>
    </tr>
  )
}

export default DesktopResult
