import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Flex } from '../../../components/Box';
// import { useLocation } from "react-router-dom";
import {
    ChatCloudIcon, ChatOptionsIcon, HamburgerCloseIcon, SvgProps
} from '../../../components/Svg';
import { PanelPropsRight, PushedPropsRight } from '../types';

interface Props extends PanelPropsRight, PushedPropsRight {
  isMobile: boolean;
  onlineUsers: ReactElement;
}

// const Icons = IconModule as unknown as { [key: string]: React.FC<SvgProps> };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(0,0,0,0.35);
  z-index: 10999;
`;

const PanelBodyRight: React.FC<Props> = ({ isPushedRight, pushNav, onlineUsers, isMobile }) => {

  // Close the menu when a user clicks a link on mobile
  const handleClick = isMobile ? () => pushNav(false) : undefined;
  const handleClickNav = () => pushNav(!isPushedRight);

  return (
    <>
    <Container>
        {isPushedRight ? (
          onlineUsers
         ) : (
         null
        )}
    </Container>
    </>
  );
};

export default PanelBodyRight;
