import React, { createElement, ReactElement, memo } from "react";
import styled from "styled-components";
// import { useLocation } from "react-router-dom";
import { HamburgerCloseIcon, HamburgerIcon, SvgProps, HomeIcon } from "../../../components/Svg";
// import * as IconModule from "../icons";
import Accordion from "./Accordion";
import { MenuEntry, LinkLabel, LinkStatus } from "./MenuEntry";
import MenuLink from "./MenuLink";
import { PanelProps, PushedProps } from "../types";
import MenuItem from "../../../components/MenuItem";
import { Box } from "../../../components/Box";
import { Button } from "../../../components/Button"

interface Props extends PanelProps, PushedProps {
  isMobile: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  padding: 5px 10px 80px;
`;

const KazamaLotteryButton = styled(Button)`
position: relative;
    margin: 1rem;
    padding: 0.5rem 0;
    background: linear-gradient(267.29deg,rgba(38,34,48,.3),rgba(143,45,62,.3));
    border: 2px solid #EE1A78;
    box-sizing: border-box;
    border-radius: 5px;
    height: 2.75rem;
    transition: all .2s ease-in-out;
    width: 100%;
`;

const ButtonWrapper = styled.div`
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
-webkit-flex-shrink: 0;
-ms-flex-negative: 0;
flex-shrink: 0;
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

const OnlineWrapper = styled.div`
margin-left: 10px;
margin-bottom: 61px;
padding: 12px;
border-radius: 8px;
height: 40px;
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
  margin-right: 10px;
  margin-left: 10px;
`;

const Hamburger = styled(HamburgerCloseIcon)`
  transform: rotate(180deg);
  width: 20px;
  fill: #a6a7aa;
  :hover {
    fill: rgba(255, 255, 255, 0.884) !important;
  }
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
height: 50px;
`;

const PanelBody: React.FC<Props> = ({ isPushed, pushNav, isMobile, links, activeItem, activeSubItem }) => {

  // Close the menu when a user clicks a link on mobile
  const handleClick = isMobile ? () => pushNav(false) : undefined;
  const handleClickNav = () => pushNav(!isPushed);
  return (
    <Container>
      {links.map((entry) => {
        const Icon = entry.icon;
        // const itemIconElement = <Icon width="24px" mr="8px" />;
        const iconElement = createElement(Icon as any, { color: entry.href === activeItem || entry.items?.some((item) => item.href === activeSubItem) ? "secondary" : "textSubtle", marginRight: '7px' })

        const calloutClass = entry.calloutClass ? entry.calloutClass : undefined;

        if (entry.items && entry.items.length > 0) {
          const itemsMatchIndex = entry.items.findIndex((item) => item.href === activeSubItem);
          const initialOpenState = entry.initialOpenState === true ? entry.initialOpenState : itemsMatchIndex >= 0;
          activeItem
          return (
            <>
            <Accordion
              key={entry.label}
              isPushed={isPushed}
              pushNav={pushNav}
              icon={iconElement}
              label={entry.label}
              status={entry.status}
              initialOpenState={initialOpenState}
              className={calloutClass}
              isActive={entry.href === activeItem || entry.items?.some((item) => item.href === activeSubItem)}
            >
              {isPushed && entry.items.map((item) => {
                const ItemIcon = item.itemIcon;
                const itemIconElement = createElement(ItemIcon as any, { marginRight: '7px' })
                return (
                  <MenuEntry key={item.href} secondary isActive={item.href === activeSubItem} onClick={handleClick}>
                    <MenuItem href={item.href} itemIcon={itemIconElement} isActive={item.href === activeSubItem} statusColor={item.status?.color} isDisabled={item.disabled}>
                     <LinkLabel isPushed={isPushed}>{item.label}</LinkLabel>
                      {item.status && (
                        <LinkStatus style={{marginLeft: "auto"}} color={item.status.color}>
                        {item.status.text}
                        </LinkStatus>
                      )}
                    </MenuItem>
                    {/* <MenuLink href={item.href}>
                  
                </MenuLink> */}
                  </MenuEntry>
                )})}
            </Accordion></>
          );
        }
      })}
    </Container>
  );
};

export default PanelBody;
