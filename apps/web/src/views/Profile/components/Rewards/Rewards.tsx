import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Flex, Image } from "@kazamaswap/uikit";
import { useAccount } from "wagmi";
import RewardTimer from "./RewardTimer";

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


const Rewards: React.FC = () => {

    // Set constants
    const { address: account } = useAccount()

    return (
        <BalanceBox style={{fontSize: "15px", fontWeight: "600"}}>
        <StackIcon src={'/images/banknote.png'} width={32} />
        <RewardTimer />
        </BalanceBox>
    )
}

export default Rewards