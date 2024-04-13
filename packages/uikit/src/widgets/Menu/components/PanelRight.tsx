import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { SIDEBAR_RIGHT_WIDTH_FULL, SIDEBAR_RIGHT_WIDTH_REDUCED } from '../config';
import { PanelPropsRight, PushedPropsRight } from '../types';
import PanelBodyRight from './PanelBodyRight';
import { ChatCloudIcon, HamburgerCloseIcon } from '../../../components/Svg';

interface Props extends PanelPropsRight, PushedPropsRight {
  showMenu: boolean;
  isMobile: boolean;
  totalMenuHeight: number;
  chatLayout?: ReactElement;
  topItems?: ReactElement;
  topItemsRight?: ReactElement;
  themeSwitcher?: ReactElement;
  showChat: boolean;
  topContentRight?: ReactElement;
  onlineUsers: ReactElement;
}

const StyledPanel = styled.div<{ isPushedRight: boolean; showChat: boolean; showMenu: boolean}>`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  background: #1d2126;
  height: 93%;
  margin-top: 64px;
  transition: padding-top 0.2s, width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-left: ${({ isPushedRight }) => (isPushedRight ? "1px solid rgba(0, 0, 0, 0.35)" : 0)};
  overflow: ${({ isPushedRight }) => (isPushedRight ? "initial" : "hidden")};
  transform: translate3d(0, 0, 0);
}

element::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
}
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 10999;
`;

const TopItemsWrapper = styled.div`
display: inline-flex;
background: #1a1e23;
height: 50px;
border-bottom: 1px solid rgba(0,0,0,0.35);
align-items: center;
`;

const Left = styled.div`
left: 0;
`;

const Right = styled.div`
margin-left: auto;
display: flex;
padding-right: 20px;
`;

const HamburgerWrapper = styled.div`
display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    white-space: nowrap;
    -webkit-transition: all 0.1s ease 0s;
    transition: all 0.1s ease 0s;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border-radius: 6px;
    font-size: 13px;
    padding: 0px;
    position: relative;
    flex: 1;
`;

const Hamburger = styled(HamburgerCloseIcon)`
  transform: rotate(180deg);
  width: 20px;
  fill: #a6a7aa;
  :hover {
    fill: rgba(255, 255, 255, 0.884) !important;
  }
`;

const MenuButtonLeft = styled.div`
  color: ${({ theme }) => theme.colors.text};
  padding: 0 8px;
  border-radius: 8px;
  background: none;
  cursor: pointer;
  height: 50px;
  display: flex;
  border: none;
  margin-left: 10px;
`;

const PanelRight: React.FC<Props> = (props) => {
  const {isPushedRight, pushNav, showMenu, chatLayout, showChat, topContentRight, isMobile} = props;
  const handleClick = isMobile ? () => pushNav(false) : undefined;
  const handleClickNav = () => pushNav(!isPushedRight);

  return (
    <StyledPanel style={{width: `${isPushedRight ? SIDEBAR_RIGHT_WIDTH_FULL : SIDEBAR_RIGHT_WIDTH_REDUCED}px`}} isPushedRight={isPushedRight} showMenu={showMenu} showChat={showChat}>
      <TopContainer>
        <TopItemsWrapper>
          <Left>
            <HamburgerWrapper onClick={handleClickNav}>
              <MenuButtonLeft aria-label="Toggle menu" onClick={handleClickNav}>
                {isPushedRight ? (
                  <Hamburger width="24px" color="textSubtle" />
                  ) : (
                  <ChatCloudIcon width="24px" color="textSubtle" />
                )}
              </MenuButtonLeft>
            </HamburgerWrapper>
          </Left>
          <Right>
            {topContentRight}
          </Right>
        </TopItemsWrapper>
      </TopContainer>
    <PanelBodyRight {...props} />
       {chatLayout}
    </StyledPanel>
  );
};

export default PanelRight;
