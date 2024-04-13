import { useTranslation } from '@kazamaswap/localization'
import { ChainId } from '@kazamaswap/chains'
import { useWeb3React } from '@kazamaswap/wagmi'
import {
  Box,
  Flex,
  LogoutIcon,
  RefreshIcon,
  useModal,
  UserMenu as UIKitUserMenu,
  UserMenuDivider,
  UserMenuItem,
  UserMenuVariant,
} from '@kazamaswap/uikit'
import ProgressBar from '@ramonak/react-progress-bar';
import { useAccount } from 'wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Trans from 'components/Trans'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useAuth from 'hooks/useAuth'
import NextLink from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import { useProfile } from 'state/profile/hooks'
import { usePendingTransactions } from 'state/transactions/hooks'
import useAirdropModalStatus from 'components/GlobalCheckClaimStatus/hooks/useAirdropModalStatus'
import ProfileUserMenuItem from './ProfileUserMenuItem'
import WalletModal, { WalletView } from './WalletModal'
import WalletUserMenuItem from './WalletUserMenuItem'
import ClaimYourNFT from './ClaimYourNFT'
import SetPassword from 'views/Profile/components/Password/password';
import ActivateSession from 'views/Profile/components/Login/sessionModal';
import { useUserData } from 'api/DataRetriever';
import { useRankStylingData } from 'api/RankDataRetriever';

const UserMenuItems = () => {
  const { t } = useTranslation()
  const { chainId, isWrongNetwork } = useActiveChainId()
  const { logout } = useAuth()
  const { address: account } = useAccount()
  const { hasPendingTransactions } = usePendingTransactions()
  const { isInitialized, isLoading, profile } = useProfile()
  const { shouldShowModal } = useAirdropModalStatus()
  const [onPresentWalletModal] = useModal(<WalletModal initialView={WalletView.WALLET_INFO} />)
  const [onPresentPasswordModal] = useModal(<SetPassword />)
  const [onPresentSessionModal] = useModal(<ActivateSession />)
  const [onPresentTransactionModal] = useModal(<WalletModal initialView={WalletView.TRANSACTIONS} />)
  const [onPresentWrongNetworkModal] = useModal(<WalletModal initialView={WalletView.WRONG_NETWORK} />)
  const hasProfile = isInitialized && !!profile

  const onClickWalletMenu = useCallback((): void => {
    if (isWrongNetwork) {
      onPresentWrongNetworkModal()
    } else {
      onPresentWalletModal()
    }
  }, [isWrongNetwork, onPresentWalletModal, onPresentWrongNetworkModal])

  return (
    <>
      <WalletUserMenuItem isWrongNetwork={isWrongNetwork} onPresentWalletModal={onClickWalletMenu} />
      <UserMenuItem as="button" disabled={isWrongNetwork} onClick={onPresentTransactionModal}>
        {t('Recent Transactions')}
        {hasPendingTransactions && <RefreshIcon spin />}
      </UserMenuItem>
      <UserMenuDivider />
      <UserMenuItem as="button" disabled={isWrongNetwork} onClick={onPresentPasswordModal}>
        {t('Password')}
      </UserMenuItem>
      <UserMenuDivider />
      <UserMenuItem as="button" disabled={isWrongNetwork} onClick={onPresentSessionModal}>
        {t('Login')}
      </UserMenuItem>
      <UserMenuDivider />
      <NextLink href={`/profile/${account?.toLowerCase()}`} passHref>
        <UserMenuItem disabled={isWrongNetwork || chainId !== ChainId.BSC}>{t('Your NFTs')}</UserMenuItem>
      </NextLink>
      {shouldShowModal && <ClaimYourNFT />}
      <ProfileUserMenuItem
        isLoading={isLoading}
        hasProfile={hasProfile}
        disabled={isWrongNetwork || chainId !== ChainId.BSC}
      />
      <UserMenuDivider />
      <UserMenuItem as="button" onClick={logout}>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          {t('Disconnect')}
          <LogoutIcon />
        </Flex>
      </UserMenuItem>
    </>
  )
}

const UserMenu = () => {
  const { t } = useTranslation()
  const { account, isConnected } = useWeb3React()
  const { isWrongNetwork } = useActiveChainId()
  const { hasPendingTransactions, pendingNumber } = usePendingTransactions()
  const [userMenuText, setUserMenuText] = useState<string>('')
  const [userMenuVariable, setUserMenuVariable] = useState<UserMenuVariant>('default')
  const userData = useUserData()
  const { background, progressColor } = useRankStylingData();

  useEffect(() => {
    if (hasPendingTransactions) {
      setUserMenuText(t('%num% Pending', { num: pendingNumber }))
      setUserMenuVariable('pending')
    } else {
      setUserMenuText('')
      setUserMenuVariable('default')
    }
  }, [hasPendingTransactions, pendingNumber, t])

  if (account) {
    if (userData.general_data.username != account) {
      return (
        <UIKitUserMenu
          username={userData.general_data.username}
          avatarSrc={userData.general_data.avatar_image}
          text={userMenuText}
          variant={userMenuVariable}
          rankProgress={<ProgressBar className="glowing-progress-bar" baseBgColor={background} margin="5px 0px 0px 0px" transitionTimingFunction="ease-in-out" 
          bgColor={progressColor} height="5px" width="100%" borderRadius="2px" isLabelVisible={false} completed={userData.rank_data.rank_progress} maxCompleted={100} />}
        >
          {({ isOpen }) => (isOpen ? <UserMenuItems /> : null)}
        </UIKitUserMenu>
      )
    }
    return (
      <UIKitUserMenu
        account={account}
        ellipsis={!userData.general_data.username}
        avatarSrc={userData.general_data.avatar_image}
        text={userMenuText}
        variant={userMenuVariable}
        rankProgress={<ProgressBar baseBgColor={background} margin="3px 0px 0px 0px" transitionTimingFunction="ease-in-out" 
        bgColor={progressColor} height="5px" width="100%" borderRadius="2px" isLabelVisible={false} completed={userData.rank_data.rank_progress} maxCompleted={100} />}
      >
        {({ isOpen }) => (isOpen ? <UserMenuItems /> : null)}
      </UIKitUserMenu>
    )
  }

  if (isWrongNetwork) {
    return (
      <UIKitUserMenu text={t('Network')} variant="danger">
        {({ isOpen }) => (isOpen ? <UserMenuItems /> : null)}
      </UIKitUserMenu>
    )
  }

  return (
    <ConnectWalletButton scale="sm">
      <Box display={['none', , , 'block']}>
        <Trans>Connect Wallet</Trans>
      </Box>
      <Box display={['block', , , 'none']}>
        <Trans>Connect</Trans>
      </Box>
    </ConnectWalletButton>
  )
}

export default UserMenu
