import {
  Flex,
  IconButton,
  Button,
  useModal,
  Grid,
  Box,
  Heading,
  VisibilityOff,
  VisibilityOn,
  ScanLink,
} from '@kazamaswap/uikit'
import { NextLinkFromReactRouter as ReactRouterLink } from '@kazamaswap/widgets-internal'
import { useEffect } from 'react'
import axios from 'axios'
import { useTranslation } from '@kazamaswap/localization'
import { getBlockExploreLink, safeGetAddress } from 'utils'
import { formatNumber } from '@kazamaswap/utils/formatBalance'
import truncateHash from '@kazamaswap/utils/truncateHash'
import { Achievement, Profile } from 'state/types'
import { useAccount } from 'wagmi'
import { useState, useMemo } from 'react'
import useGetUsernameWithVisibility from 'hooks/useUsernameWithVisibility'
import { useDomainNameForAddress } from 'hooks/useDomain'
import EditProfileAvatar from './EditProfileAvatar'
import BannerHeader from '../../Nft/market/components/BannerHeader'
import StatBox, { StatBoxItem } from '../../Nft/market/components/StatBox'
import EditProfileModal from './EditProfileModal'
import AvatarImage from '../../Nft/market/components/BannerHeader/AvatarImage'

import { getAvatar, getUserRankData, getUserData } from 'utils/apiRoutes'

interface HeaderProps {
  accountPath: string
  profile: Profile
  achievements: Achievement[]
  nftCollected: number
  isAchievementsLoading: boolean
  isNftLoading: boolean
  isProfileLoading: boolean
  onSuccess?: () => void
}

// Account and profile passed down as the profile could be used to render _other_ users' profiles.
const ProfileHeader: React.FC<React.PropsWithChildren<HeaderProps>> = ({
  accountPath,
  profile,
  achievements,
  nftCollected,
  isAchievementsLoading,
  isNftLoading,
  isProfileLoading,
  onSuccess,
}) => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const [profileData, setProfileData] = useState({
    address: '',
    general_data: {
      username: '',
      avatar_image: ''
    }
  });


  const { usernameWithVisibility, userUsernameVisibility, setUserUsernameVisibility } = useGetUsernameWithVisibility(
    profile?.username,
  )
  const [onEditProfileModal] = useModal(
    <EditProfileModal
      onSuccess={() => {
        onSuccess?.()
      }}
    />,
    false,
  )

  const isConnectedAccount = safeGetAddress(account) === safeGetAddress(accountPath)
  const numNftCollected = !isNftLoading ? (nftCollected ? formatNumber(nftCollected, 0, 0) : '-') : null
  const numPoints = !isProfileLoading ? (profile?.points ? formatNumber(profile.points, 0, 0) : '-') : null
  const numAchievements = !isAchievementsLoading
    ? achievements?.length
      ? formatNumber(achievements.length, 0, 0)
      : '-'
    : null

  const profileTeamId = profile?.teamId
  const profileUsername = isConnectedAccount ? usernameWithVisibility : profile?.username
  const hasProfile = !!profile


  // Set data
  const fetchData = async() => {
    await axios.get(`${getUserData}/${accountPath}`).then((response) => {
      setProfileData(response.data)
    });
  }

  // Fetch all data
  useEffect(() => {
    fetchData()
  }, [accountPath, isConnectedAccount])

  const toggleUsernameVisibility = () => {
    setUserUsernameVisibility(!userUsernameVisibility)
  }

  const Icon = userUsernameVisibility ? VisibilityOff : VisibilityOn

  const bannerImage = useMemo(() => {
    const imagePath = '/images/teams'
    switch (profileTeamId) {
      case 1:
        return `${imagePath}/storm-banner.png`
      case 2:
        return `${imagePath}/flippers-banner.png`
      case 3:
        return `${imagePath}/cakers-banner.png`
      default:
        break
    }
    return `${imagePath}/no-team-banner.png`
  }, [profileTeamId])

  const avatar = useMemo(() => {
    const getIconButtons = () => {
      return (
        // TODO: Share functionality once user profiles routed by ID
        <Flex display="inline-flex">
          {accountPath && (
            <IconButton
              as="a"
              target="_blank"
              style={{
                width: 'fit-content',
              }}
              href={getBlockExploreLink(accountPath, 'address') || ''}
              // @ts-ignore
              alt={t('View BscScan for user address')}
            />
          )}
        </Flex>
      )
    }

    const getImage = () => {
      return (
        <>
          {hasProfile && accountPath && isConnectedAccount ? (
            <EditProfileAvatar
              src={profileData.general_data?.avatar_image}
              alt={t('User profile picture')}
              onSuccess={() => {
                onSuccess?.()
              }}
            />
          ) : (
            <AvatarImage src={profileData.general_data.avatar_image} alt={t('User profile picture')} />
          )}
        </>
      )
    }
    return (
      <>
        {getImage()}
        {getIconButtons()}
      </>
    )
  }, [accountPath, isConnectedAccount, onSuccess, hasProfile, profileData, t])

  const title = useMemo(() => {
    if (profileData.general_data.username !== profileData.address) {
      return `${profileData.general_data.username}`
    } else {
      return truncateHash(profileData.address, 5, 3)
    }
  }, [profileUsername, profileData, accountPath])

  const description = useMemo(() => {

    return (
      <Flex flexDirection="column" mb={[16, null, 0]} mr={[0, null, 16]}>
        {accountPath && profile?.username && (
          <ScanLink href={getBlockExploreLink(accountPath, 'address')} bold color="primary">
            {truncateHash(accountPath)}
          </ScanLink>
        )}
        {accountPath && isConnectedAccount && (!profile || !profile?.nft)}
      </Flex>
    )
  }, [accountPath, isConnectedAccount, onEditProfileModal, profile, t])

  return (
    <>
      <BannerHeader bannerImage={bannerImage} bannerAlt={t('User team banner')} avatar={avatar} />
      <Grid
        pb="48px"
        gridGap="16px"
        alignItems="center"
        gridTemplateColumns={['1fr', null, null, null, 'repeat(2, 1fr)']}
      >
        <Box>
          <Heading as="h1" scale="xl" color="secondary" mb="16px">
            {title}
              <Icon ml="4px" onClick={toggleUsernameVisibility} cursor="pointer" />
          </Heading>
          {description}
        </Box>
        <Box>
          <StatBox>
            <StatBoxItem title={t('NFT Collected')} stat={numNftCollected} />
            <StatBoxItem title={t('Points')} stat={numPoints} />
            <StatBoxItem title={t('Achievements')} stat={numAchievements} />
          </StatBox>
        </Box>
      </Grid>
    </>
  )
}

export default ProfileHeader
