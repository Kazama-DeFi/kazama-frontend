import { useIsMounted } from "@kazamaswap/hooks";
import throttle from "lodash/throttle";
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import styled from "styled-components";
import BottomNav from "../../components/BottomNav";
import { Box } from "../../components/Box";
import Flex from "../../components/Box/Flex";
import { AtomBox } from "../../components/AtomBox";
import KazamaPrice from "../../components/KazamaPrice/KazamaPrice";
import Footer from "../../components/Footer";
import LangSelector from "../../components/LangSelector/LangSelector";
import MenuItems from "../../components/MenuItems/MenuItems";
import { SubMenuItems } from "../../components/SubMenuItems";
import { useMatchBreakpoints } from "../../contexts";
import Logo from "./components/Logo";
import {
  MENU_HEIGHT, MOBILE_MENU_HEIGHT, SIDEBAR_RIGHT_WIDTH_FULL, SIDEBAR_RIGHT_WIDTH_REDUCED,
  SIDEBAR_WIDTH_FULL, SIDEBAR_WIDTH_REDUCED, SIDEBARS_WIDTH_FULL, TOP_BANNER_HEIGHT,
  TOP_BANNER_HEIGHT_MOBILE, SCROLL_UP_FULL_WIDTH, SCROLL_UP_REDUCED
} from './config';
import { MenuContext } from "./context";
import { NavProps } from "./types";
import Panel from "./components/Panel";
import PanelRight from "./components/PanelRight";
import { Button } from "../..";
import { ArrowUpIcon } from "../..";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
`;

const StyledNav = styled.nav<{ isPushed?: boolean; isPushedRight?: boolean; showMenu?: boolean; totalMenuHeight?: number }>`
width: 100%;
    padding: 0px 12px 0px 24px;
    background: #1d2126;
    border-bottom: 1px solid rgba(0, 0, 0, 0.35);
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    -webkit-box-align: center;
    align-items: center;
    height: 64px;
`;

const FixedContainer = styled.div<{ showMenu: boolean; height: number }>`
  position: fixed;
  top: ${({ showMenu, height }) => (showMenu ? 0 : `-${height}px`)};
  left: 0;
  transition: top 0.2s;
  width: 100%;
  z-index: 20;
`;

const TopBannerContainer = styled.div<{ height: number }>`
  height: ${({ height }) => `${height}px`};
  min-height: ${({ height }) => `${height}px`};
  max-height: ${({ height }) => `${height}px`};
  width: 100%;
`;

const BodyWrapper = styled(Box)`
  position: relative;
  display: flex;
`;


const Inner = styled.div<{ isPushed: boolean; isPushedRight: boolean; showMenu: boolean; totalMenuHeight: number }>`
  flex-grow: 1;
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1), margin-right 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  width: 0px;

  ${({ theme }) => theme.mediaQueries.nav} {
    margin-left: ${({ isPushed }) => `${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
    margin-right: ${({ isPushedRight }) => `${isPushedRight ? SIDEBAR_RIGHT_WIDTH_FULL : SIDEBAR_RIGHT_WIDTH_REDUCED}px`};
    max-width: ${({ isPushed }) => `calc(100% - ${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px)`};
    max-width: ${({ isPushedRight }) => `calc(100% - ${isPushedRight ? SIDEBAR_RIGHT_WIDTH_FULL : SIDEBAR_RIGHT_WIDTH_REDUCED}px)`};
  }
`;

const ScrollUpDiv = styled.div`
  position: fixed;
  bottom: calc(100px + env(safe-area-inset-bottom));
`;

const LeftNav = styled.div`
display: flex;
    -webkit-box-align: center;
    align-items: center;
`

const MiddleNav = styled.div`
display: flex;
    -webkit-box-align: center;
    align-items: center;
    margin-left: 0;
`

const RightNav = styled.div`
display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: end;
    justify-content: flex-end;
`

const Menu: React.FC<React.PropsWithChildren<NavProps>> = ({
  linkComponent = "a",
  banner,
  chat,
  top,
  topContentRight,
  themeSwitcher,
  topItems,
  onlineUsers,
  topItemsRight,
  leftSide,
  inMiddle,
  rightSide,
  isDark,
  toggleTheme,
  currentLang,
  setLang,
  kazamaPriceUsd,
  links,
  subLinks,
  footerLinks,
  activeItem,
  activeSubItem,
  langs,
  buyKazamaLabel,
  buyCakeLink,
  children,
  chainId,
}) => {
  const { isMobile, isMd } = useMatchBreakpoints();
  const isMounted = useIsMounted();
  const isSmallerScreen = isMobile || isMd;
  const [isPushed, setIsPushed] = useState(!isSmallerScreen);
  const [isPushedRight, setIsPushedRight] = useState(!isSmallerScreen);
  const [showChat, setShowChat] = useState(!isSmallerScreen);
  const [showMenu, setShowMenu] = useState(true);
  const [visible, setVisible] = useState(false);
  const refPrevOffset = useRef(typeof window === "undefined" ? 0 : window.pageYOffset);

  const topBannerHeight = isMobile ? TOP_BANNER_HEIGHT_MOBILE : TOP_BANNER_HEIGHT;

  const totalTopMenuHeight = isMounted && banner ? MENU_HEIGHT + topBannerHeight : MENU_HEIGHT;

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current || currentOffset <= totalTopMenuHeight) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(true);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [totalTopMenuHeight]);
  
  const scrollToTop = useCallback(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, []);
  
    useEffect(() => {
      const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 1) {
          setVisible(true);
        } else if (scrolled <= 1) {
          setVisible(false);
        }
      };
  
      const throttledToggleVisible = throttle(toggleVisible, 200);
  
      window.addEventListener("scroll", throttledToggleVisible);
  
      return () => window.removeEventListener("scroll", throttledToggleVisible);
    }, []);


  // Find the home link if provided
  const homeLink = links.find((link) => link.label === "Home");

  const providerValue = useMemo(() => ({ linkComponent }), [linkComponent]);
  return (
    <MenuContext.Provider value={providerValue}>
      <AtomBox
        asChild
        minHeight={{
          xs: "auto",
          md: "100vh",
        }}
      >
        <Wrapper>
          <FixedContainer showMenu={showMenu} height={totalTopMenuHeight}>
            {/* <StyledNav style={{marginRight: `${isPushedRight ? SIDEBAR_RIGHT_WIDTH_FULL : SIDEBAR_RIGHT_WIDTH_REDUCED}px`, marginLeft: `${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`}} isPushed={isPushed} isPushedRight={isPushedRight} showMenu={showMenu} totalMenuHeight={totalTopMenuHeight}> */}
            <StyledNav>
  <LeftNav>
    <Logo href={homeLink?.href ?? "/"} />
    <div style={{margin: "0px 12px 0px 36px"}}>
    {leftSide}
    </div>
  </LeftNav>
  <MiddleNav>
    {inMiddle}
  </MiddleNav>
  <RightNav>
    {rightSide}
  </RightNav>
</StyledNav>
          </FixedContainer>

          <BodyWrapper>
          <Panel
            isPushed={isPushed}
            isMobile={isSmallerScreen}
            showMenu={showMenu}
            totalMenuHeight={totalTopMenuHeight}
            isDark={isDark}
            toggleTheme={toggleTheme}
            langs={langs}
            setLang={setLang}
            currentLang={currentLang}
            kazamaPriceUsd={kazamaPriceUsd}
            pushNav={setIsPushed}
            links={links}
            activeItem={activeItem}
            activeSubItem={activeSubItem}
            topContent={top}
          />
          <PanelRight
            chatLayout={chat}
            onlineUsers={onlineUsers}
            topContentRight={topContentRight}
            topItems={topItems}
            themeSwitcher={themeSwitcher}
            showChat={showChat}
            topItemsRight={topItemsRight}
            isPushedRight={isPushedRight}
            isMobile={isSmallerScreen}
            showMenu={showMenu}
            totalMenuHeight={totalTopMenuHeight}
            isDark={isDark}
            toggleTheme={toggleTheme}
            langs={langs}
            setLang={setLang}
            currentLang={currentLang}
            kazamaPriceUsd={kazamaPriceUsd}
            pushNav={setIsPushedRight}
            links={links}
            activeItem={activeItem}
            activeSubItem={activeSubItem}
          /> 

          <Inner style={{marginRight: `${isPushedRight ? SIDEBAR_RIGHT_WIDTH_FULL : SIDEBAR_RIGHT_WIDTH_REDUCED}px`, marginLeft: `${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`}} isPushed={isPushed} isPushedRight={isPushedRight} showMenu={showMenu} totalMenuHeight={totalTopMenuHeight}>
            {children}
            <Footer
            chainId={chainId}
            items={footerLinks}
            isDark={isDark}
            toggleTheme={toggleTheme}
            langs={langs}
            setLang={setLang}
            currentLang={currentLang}
            cakePriceUsd={kazamaPriceUsd}
            buyCakeLabel={buyKazamaLabel}
            buyCakeLink={buyCakeLink}
            mb={[`${MOBILE_MENU_HEIGHT}px`, null, "0px"]}
           />
          </Inner>
          <ScrollUpDiv style={{ right: `${isPushedRight ? SCROLL_UP_FULL_WIDTH : SCROLL_UP_REDUCED}px` ,display: visible ? "inline" : "none" }}>
              <Button
              width={35}
              height={35}
              endIcon={<ArrowUpIcon color="invertedContrast" style={{ marginLeft: 0 }} />}
              onClick={scrollToTop}
              />
            </ScrollUpDiv>
          </BodyWrapper>
        </Wrapper>
      </AtomBox>
      {/* <AtomBox display={{ xs: "block", md: "none" }}>
        <BottomNav activeItem={activeItem} activeSubItem={activeSubItem} />
      </AtomBox> */}
    </MenuContext.Provider>
  );
};

export default Menu;