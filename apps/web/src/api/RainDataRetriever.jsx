import React, { createContext, useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import truncateHash from '@kazamaswap/utils/truncateHash';
import axios from 'axios';
import { useWeb3React } from '@kazamaswap/wagmi';
import { Text, Image, PaperStackIcon } from '@kazamaswap/uikit';
import { getRainData } from 'utils/apiRoutes';
import { useSocket } from './SocketManager';
import { toast } from 'kazama-defi-react-toasts';
import 'kazama-defi-react-toasts/dist/KazamaToasts.css';
import { Zoom } from 'kazama-defi-react-toasts';
import { NextLinkFromReactRouter } from 'components/NextLink'
import { getTipReceivedSound } from 'audio/TipReceived';

// Create a new context with initial state as defaultValue
const RainDataContext = createContext({
  rain_active: false,
  rain_id: 0,
  current_rain: {
    rainer: '',
    amount: 0,
    participants_amount: 1,
    amount_left: 0,
    participated: {
      usernames: [],
      socketIds: []
    },
    expiration: null
  }
});

// Custom hook to access the rain data context
export const useRainData = () => useContext(RainDataContext);

const KazamaToastHeader = styled.div`
color: #a6a7aa;
font-size: 15px;
font-weight: bold;
margin-bottom: 3px;
margin-left: 8px;
`

const AccountLink = styled(NextLinkFromReactRouter)`
color: #fff;
font-size: 14px;
font-family: Flama Bold;
&:hover {
  text-decoration: underline;
}
`

const DollarText = styled.p`
color: #10D960;
`

// Provider component that wraps your AccountDataRetriever component
export const RainDataProvider = ({ children }) => {
  const socket = useSocket();
  const { account } = useWeb3React();
  const [rainData, setRainData] = useState({
    rain_active: false,
    rain_id: 0,
    rain_data: {
      current_rain: {
        rainer: '',
        amount: 0,
        participants_amount: 1,
        amount_left: 0,
        participated: {
          usernames: [],
          socketIds: []
        },
        expiration: null
      }
    }
  });

  // Fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get(getRainData);
      setRainData(response.data.rain_data);
    } catch (error) {
      console.error('Error fetching rain data:', error);
    }
  };

  // Execute retrieving
  useEffect(() => {
    if (account) {
      fetchData();
    }
  }, [account]);

  return (
    <RainDataContext.Provider value={rainData}>
      {children}
    </RainDataContext.Provider>
  );
};