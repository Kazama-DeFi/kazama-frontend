import { useRef } from 'react';
import ChatComponent from 'components/ChatLayout';
import { useTheme as useNextTheme } from 'next-themes'
import { NetworkSwitcher } from 'components/NetworkSwitcher';
import { NextLinkFromReactRouter } from 'components/NextLink';
import PhishingWarningBanner from 'components/PhishingWarningBanner';
import { useCakePrice } from 'hooks/useCakePrice';
import useTheme from 'hooks/useTheme';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import styled from 'styled-components';
import { useSocket } from 'api/SocketManager';
import { languageList, useTranslation } from '@kazamaswap/localization';
import { Box, Menu as UikitMenu, Text, ThemeSwitcher, useModal } from '@kazamaswap/uikit';
import { usePhishingBanner } from '@kazamaswap/utils/user';

import { footerLinks } from './config/footerConfig';
import GlobalSettings from './GlobalSettings';
import { SettingsMode } from './GlobalSettings/types';
import { useMenuItems } from './hooks/useMenuItems';
import UserMenu from './UserMenu';
import { getActiveMenuItem, getActiveSubMenuItem } from './utils';
import PlatformBalance from 'views/Profile/components/Balance/PlatformBalance';
import Notifications from 'views/Profile/components/Notifications/Notifications';
import Rewards from 'views/Profile/components/Rewards/Rewards';
import WalletBalance from 'views/Profile/components/Wallet/WalletBalance';
import NewRain from 'views/Profile/components/Rain/CreateRain';
import OnlineUsers from 'components/ChatLayout/components/UsersData';

const ItemWrapper = styled(Box)`
-webkit-align-items: center;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
background-color: #1a1e23;
cursor: pointer;
display: -webkit-inline-box;
display: -webkit-inline-flex;
display: -ms-inline-flexbox;
display: inline-flex;
height: 45px;
border-radius: 8px;
padding-left: 10px;
padding-right: 10px;
padding-top: 5px;
padding-bottom: 5px;
position: relative;
border-bottom: 1px solid rgba(0, 0, 0, 0.35);
margin-right: 15px;
width: 150px;
`

const PanelItemWrapper = styled(Box)`
-webkit-align-items: center;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
background-color: #1a1e23;
cursor: pointer;
display: -webkit-inline-box;
display: -webkit-inline-flex;
display: -ms-inline-flexbox;
display: inline-flex;
border-radius: 8px;
padding-left: 10px;
padding-right: 10px;
padding-top: 10px;
padding-bottom: 10px;
position: relative;
border-bottom: 1px solid rgba(0, 0, 0, 0.35);
width: 100%;
margin-left: 10px;
margin-right: 10px;
margin-bottom: 5px;
width: 215px;
`

const ItemWrapperEarnings = styled(Box)`
-webkit-align-items: center;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
box-shadow: inset 0px -2px 0px rgb(0 0 0 / 10%);
cursor: pointer;
display: -webkit-inline-box;
display: -webkit-inline-flex;
display: -ms-inline-flexbox;
display: inline-flex;
height: 40px;
border-radius: 8px;
padding-left: 8px;
padding-right: 8px;
padding-top: 5px;
padding-bottom: 5px;
position: relative;
border-bottom: 1px solid #201c29;
margin-right: 15px;
`

const BoxSpacing = styled(Box)`
margin-right: 15px;
`

const ItemSeperator = styled.div`
height: 1.5rem;
    width: 1px;
    align-self: center;
    opacity: 1;
    background-color: rgb(44 48 52);
    margin-left: 10px;
    margin-right: 10px;
`

const Menu = (props) => {
  const socket = useSocket()
  const { theme, isDark, setTheme } = useTheme()
  const kazamaPriceUsd = useCakePrice()
  const { currentLanguage, setLanguage, t } = useTranslation()
  const { pathname } = useRouter()
  const [showPhishingWarningBanner] = usePhishingBanner()
  const menuItems = useMenuItems()
  const activeMenuItem = getActiveMenuItem({ menuConfig: menuItems, pathname })
  const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })
  const [createRainModal] = useModal(<NewRain socket={socket} onDismiss={() => {}} />);

  const toggleTheme = useMemo(() => {
    return () => setTheme(isDark ? 'light' : 'light')
  }, [setTheme, isDark])

  const getFooterLinks = useMemo(() => {
    return footerLinks(t)
  }, [t])

  return (
    <>
      <UikitMenu
        linkComponent={(linkProps) => {return <NextLinkFromReactRouter to={linkProps.href} {...linkProps} prefetch={false} />}}
        rightSide={
        <>
        {/* <GlobalSettings mode={SettingsMode.SWAP_LIQUIDITY} /> */}
        <ItemSeperator />
        <Notifications />
        <UserMenu />
        <ItemSeperator />
        <NetworkSwitcher />
        </>
        }
        inMiddle={
        <>
        <Rewards />
        <WalletBalance />
        <PlatformBalance />
        </>
      }
        leftSide={
          <div />
        }
        banner={showPhishingWarningBanner && <PhishingWarningBanner />}
        chat={typeof window !== 'undefined' && <ChatComponent />}
        topContentRight={<Text onClick={createRainModal}>Create rain</Text>}
        themeSwitcher={<ThemeSwitcher isDark={theme.isDark} toggleTheme={() => setTheme(theme.isDark ? 'light' : 'dark')} /> }
        topItems={<NetworkSwitcher />}
        onlineUsers={<OnlineUsers />}
        isDark={isDark}
        toggleTheme={toggleTheme}
        currentLang={currentLanguage.code}
        langs={languageList}
        setLang={setLanguage}
        kazamaPriceUsd={kazamaPriceUsd}
        links={menuItems}
        subLinks={activeMenuItem?.hideSubNav || activeSubMenuItem?.hideSubNav ? [] : activeMenuItem?.items}
        footerLinks={getFooterLinks}
        activeItem={activeMenuItem?.href}
        activeSubItem={activeSubMenuItem?.href}
        buyKazamaLabel={t('Buy KAZAMA')}
        {...props}
      />
    </>
    
  )
}

export default Menu
