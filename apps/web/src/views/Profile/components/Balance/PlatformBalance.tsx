import axios from "axios";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { Flex, PaperStackIcon, ChevronFilledIcon } from "@kazamaswap/uikit";
import { useUserData } from "api/DataRetriever";

const BalanceBox = styled(Flex)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: 5px;
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: inline-flex;
  height: 40px;
  padding-left: 8px;
  padding-right: 8px;
  position: relative;
  margin-right: 10px;

  &:hover {
    opacity: 0.65;
  }
`

const MenuIconWrapper = styled.div`
  align-items: center;
  border-radius: 50%;
  border-style: solid;
  border-width: 2px;
  display: flex;
  height: 26px;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 26px;
  z-index: 102;
`;

const StackIcon = styled.img`
  left: 0;
  z-index: 102;
  filter: drop-shadow(#39A957 0px 0px 8px);

  & > img {
    border-radius: 50%;
  }
`;

const ButtonContainer = styled.div`
opacity: 1;
`

const StyledChevronClosed = styled(ChevronFilledIcon)`
  width: 12px;
  margin-left: 5px;
`

const StyledChevronOpen = styled(ChevronFilledIcon)`
  transform: rotate(180deg);
  width: 12px;
  margin-left: 5px;
`

const Dropdown = styled.div<{ isOpen: boolean }>`
position: absolute;
    width: 380px;
    z-index: 49999;
    right: -125px;
    top: 100%;
    margin-top: 11px;
    background: #21252b;
    border: 1px solid rgba(0, 0, 0, 0.35);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 8px -4px, rgba(0, 0, 0, 0.18) 0px 0px 20px 0px, rgba(0, 0, 0, 0.35) 0px 40px 34px -16px;
    border-radius: 0.25rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
`;

const Container = styled.div`
  position: relative;
`;

const PlatformBalance: React.FC = () => {

    // Set constants
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const userData = useUserData();

    const formattedBalance = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(userData.platform_balance.balance);

    return (
      <Container>
        <BalanceBox onClick={() => setIsOpen(!isOpen)} style={{fontSize: "14px", fontFamily: "Flama Bold"}}>
        <PaperStackIcon width={32} mr="5px" />
        {formattedBalance}
        {isOpen ? (
          <StyledChevronOpen />
        ) : (
          <StyledChevronClosed />
        )}
        </BalanceBox>
        {isOpen && (
          <Dropdown ref={dropdownRef} isOpen={isOpen}>
            stuff
          </Dropdown>
        )}
    </Container>
  )}

export default PlatformBalance