import React, { createContext, useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import truncateHash from '@kazamaswap/utils/truncateHash';
import axios from 'axios';
import { useWeb3React } from '@kazamaswap/wagmi';
import { Text, Image, PaperStackIcon } from '@kazamaswap/uikit';
import { host, getRainData } from 'utils/apiRoutes';
import { useSocket } from './SocketManager';
import { toast } from 'kazama-defi-react-toasts';
import 'kazama-defi-react-toasts/dist/KazamaToasts.css';
import { Zoom } from 'kazama-defi-react-toasts';
import { NextLinkFromReactRouter } from 'components/NextLink'
import { getTipReceivedSound } from 'audio/TipReceived';

// Create a new context with initial state as defaultValue
const OnlineUsersDataContext = createContext({
  totalUsers: 0,
  onlineAmount: 0,
  onlineUsers: []
});

// Custom hook to access the rain data context
export const useOnlineUsersData = () => useContext(OnlineUsersDataContext);

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

// Provider component that wraps your AccountDataRetriever component
export const OnlineUsersDataProvider = ({ children }) => {
  const socket = useSocket();
  const { account } = useWeb3React();
  const [onlineUsersData, setOnlineUsersData] = useState({
    totalUsers: 0,
    onlineAmount: 0,
    onlineUsers: []
  });

  // Fetch total users
  const fetchTotalUsers = async () => {
    try {
      const response = await axios.get(`${host}/api/auth/total_users`);
      setOnlineUsersData(prevState => ({
        ...prevState,
        totalUsers: response.data.totalUsers
      }));
    } catch (error) {
      console.error('Error fetching total users data:', error);
    }
  };

  // Fetch online user amount
  const fetchOnlineAmount = async () => {
    try {
      const response = await axios.get(`${host}/api/info`);
      setOnlineUsersData(prevState => ({
        ...prevState,
        onlineAmount: response.data.online
      }));
    } catch (error) {
      console.error('Error fetching online users amount data:', error);
    }
  };

  // Fetch online username list
  const fetchOnlineUsers = async () => {
    try {
      const response = await axios.get(`${host}/api/onlineUsers`);
      setOnlineUsersData(prevState => ({
        ...prevState,
        onlineUsers: response.data.onlineUsers
      }));
    } catch (error) {
      console.error('Error fetching online usernames list data:', error);
    }
  };  

  // Execute API calls
  useEffect(() => {
    if (account) {
      fetchTotalUsers();
      fetchOnlineAmount();
      fetchOnlineUsers();
    }
  }, [account]);

  // Handle data changes on new connection
  useEffect(() => {
    if (socket && socket.current) {
      socket.current.on("online-users-update", (data) => {
        setOnlineUsersData({
          ...data,
          totalUsers: data.totalUsersCount,
          onlineAmount: data.count,
          onlineUsers: data.list
        });
      });
    }
  }, [socket, socket.current]);

  // Handle data changes on a disconnection
  useEffect(() => {
    if (socket && socket.current) {
      socket.current.on("online-users-update-disconnect", (data) => {
        setOnlineUsersData(prevState => ({
          ...prevState,
          onlineAmount: data.count, // Accessing count from data object
          onlineUsers: data.list // Accessing list from data object
        }));
      });
    }
  }, [socket, socket.current]);

  return (
    <OnlineUsersDataContext.Provider value={onlineUsersData}>
      {children}
    </OnlineUsersDataContext.Provider>
  );
};