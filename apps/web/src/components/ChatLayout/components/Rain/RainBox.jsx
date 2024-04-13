import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import truncateHash from '@kazamaswap/utils/truncateHash';
import { Text, Image } from '@kazamaswap/uikit';
import { useAccount } from 'wagmi';
import { useSignMessage } from '@kazamaswap/wagmi';
import { getUserData, createRain } from 'utils/apiRoutes';
import { toast } from 'kazama-defi-react-toasts';
import 'kazama-defi-react-toasts/dist/KazamaToasts.css';
import { Zoom } from 'kazama-defi-react-toasts';

const RainBox = ({ socket, rainData }) => {
    // Set consts
    const { signMessageAsync } = useSignMessage();
    const { address: account } = useAccount();

    // Format time
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      };

      // Countdown
    const getRemainingTime = (rainData) => {
      const now = new Date();
      const startingTime = new Date(rainData.current_rain.starting_in);
      const expirationTime = new Date(rainData.current_rain.expiration);
      
      if (now < startingTime) {
        const diff = Math.ceil((startingTime - now) / 1000);
        return `Starting in: ${formatTime(diff)}`;
      } else if (now < expirationTime) {
        const diff = Math.ceil((expirationTime - now) / 1000);
        return `Expires in: ${formatTime(diff)}`;
      } else {
        return "Rain ended";
      }
    };

    // Set countdown
    const countdownText = getRemainingTime(rainData);

    // Return the box
    return (
        <>
        <div>
            {countdownText}
        </div>
        </>
    );
};

export default RainBox;
