import React from 'react';
import styled from 'styled-components';

import { Box } from '../../../components/Box';
import Flex from '../../../components/Box/Flex';
import { Button } from '../../../components/Button';
import IconButton from '../../../components/Button/IconButton';
import { Image } from '../../../components/Image';
import {
    CogIcon, HamburgerCloseIcon, HamburgerIcon, HomeIcon
} from '../../../components/Svg';
import { MENU_ENTRY_HEIGHT } from '../config';
import { PanelProps, PushedProps } from '../types';
import { LogoIcon } from '../../../components/Svg';

interface Props extends PanelProps, PushedProps {
  isMobile: boolean;
}

const SettingsEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: 0 8px;
`;

const SocialEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: 0 16px;
  padding-bottom: 55px;
`;

const ThreeColumnFlex = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    min-width: 280px;
    max-width: 32%;
    width: 100%;
    margin: 0 8px;
    margin-bottom: 16px;
    ${({ theme }) => theme.mediaQueries.sm} {
      width: 100%;
    }
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 100%;
  }
`

const InputPanel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  z-index: 1;
  width: 100%;
`

const Wrapper = styled.div`
flex-direction: column;
align-items:center;
width: 100%;
`

const Input = styled.input<{ error?: boolean }>`
  font-size: 14px;
  outline: none;
  border: none;
  flex: 1 1 auto;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  transition: color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  color: ${({ error, theme }) => (error ? theme.colors.failure : theme.colors.text)};
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  min-height: 45px;
  width: 100%;
  ::placeholder {
    color: #5a5471;
  }
  padding-left: 20px;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.text};
  }
`

export const KazamaTextButton = styled.div`
   font-family: 'Luckiest Guy', cursive;
   font-style: regular;
   font-size: 18px;
   -webkit-text-fill-color: white;
   -webkit-text-stroke-color: black;
   -webkit-text-stroke-width: 1.00px; 
   font-weight: 400;
`

export const IconWrapper = styled.div`
   background: #111923;

`

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
    justify-content: right;
    white-space: nowrap;
    -webkit-transition: all 0.1s ease 0s;
    transition: all 0.1s ease 0s;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    -webkit-letter-spacing: 0.5px;
    -moz-letter-spacing: 0.5px;
    -ms-letter-spacing: 0.5px;
    letter-spacing: 0.5px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border-radius: 6px;
    font-family: "Geogrotesque Wide",sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 13px;
    text-transform: uppercase;
    padding: 0px;
    position: relative;
    left: 6px;
    margin-left: auto;
`;

const TopWrapper = styled.div`
cursor: pointer;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 48px;
    padding: 0 16px;
    font-size: 17px;
    font-weight: bold;
    background-image: transparent;
    box-shadow: none;
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    height: 43px;
    min-height: 43px;
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

const ItemsContainer = styled.div`
display: flex;
flex-direction: column;
overflow-y: auto;
overflow-x: hidden;
height: 100%;
padding: 20px 10px 0px;
`

const Hamburger = styled(HamburgerCloseIcon)`
width: 20px;
fill: #a6a7aa;
:hover {
  fill: rgba(255, 255, 255, 0.884) !important;
}
`;

const OnlineWrapper = styled.div`
margin-left: 10px;
margin-bottom: 61px;
padding: 12px;
border-radius: 8px;
height: 64px;
background: #21252b;
width: 175px;
margin-top: 5px;
`

const MenuButton = styled.div`
  color: ${({ theme }) => theme.colors.text};
  padding: 0 8px;
  border-radius: 8px;
  background: none;
  cursor: pointer;
  height: 50px;
  display: flex;
  border: none;
`;

const Left = styled.div`
margin-right: auto;
`;

const Right = styled.div`
right: 0;
`;

const TopItemsWrapper = styled.div`
display: inline-flex;
background: #1a1e23;
height: 64px;
align-items: center;
border-bottom: 1px solid rgba(0,0,0,0.35);
padding: 5px 15px 5px 15px;
`;

const PanelTop: React.FC<Props> = ({
  isPushed,
  pushNav,
  isMobile,
  gameContent,
}) => {
    // Close the menu when a user clicks a link on mobile
    const handleClick = isMobile ? () => pushNav(false) : undefined;
    const handleClickNav = () => pushNav(!isPushed);

  return (
    <>
    <Container>
    <TopItemsWrapper>
            {isPushed ? (
      <Left>
        1
      </Left>
               ) : (
                null
               )}

        <Right>
      <HamburgerWrapper onClick={handleClickNav}>
        <MenuButton aria-label="Toggle menu" onClick={handleClickNav}>
          {isPushed ? (
            <Hamburger width="24px" color="textSubtle" />
          ) : (
            <HamburgerCloseIcon width="24px" color="textSubtle" />
          )}
        </MenuButton>
      </HamburgerWrapper>
      </Right>
      </TopItemsWrapper>

      <ItemsContainer>
      <TopItemsWrapper>
            {isPushed ? (
      'h'
               ) : (
                null
               )}
      </TopItemsWrapper>
      </ItemsContainer>
        {/* {gameContent} */}
        </Container>
    </>
  );
};

export default PanelTop;
