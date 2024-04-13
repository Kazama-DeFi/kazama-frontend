import React, { createContext, useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import truncateHash from '@kazamaswap/utils/truncateHash';
import axios from 'axios';
import { useWeb3React } from '@kazamaswap/wagmi';
import { Text, Image, PaperStackIcon } from '@kazamaswap/uikit';
import { getUserData } from 'utils/apiRoutes';
import { useSocket } from './SocketManager';
import { toast } from 'kazama-defi-react-toasts';
import 'kazama-defi-react-toasts/dist/KazamaToasts.css';
import { Zoom } from 'kazama-defi-react-toasts';
import { NextLinkFromReactRouter } from 'components/NextLink'
import { getTipReceivedSound } from 'audio/TipReceived';

// Create a new context with initial state as defaultValue
const UserDataContext = createContext({
  general_data: {
    username: '',
    has_password: false,
    recovery_email: 'No recovery email',
    is_activated: true,
    ip: '0',
    country: 'Unknown',
    balance_kazama: 0,
    role: 'user',
    anonymous: false,
    avatar_image: 'https://assets.kazama.io/profiles/avatars/default.jpg',
    notifications_enabled: true,
  },
  platform_balance: {
    balance: 0,
    deposited: 0,
    withdrawed: 0,
    deposit_history: [],
    withdrawal_history: [],
    profit_loss: 0,
  },
  online_status: {
    is_online: false,
    away: false,
    online_since: null,
    offline_since: null,
  },
  messages_inbox: {
    inbox: [],
    outbox: [],
  },
  notifications: [],
  profile_data: {
    subscribed: false,
    subscription_expiration: null,
    header_image: 'https://assets.kazama.io/profiles/profile_background/default.jpg',
    youtube_channel: null,
    twitter_page: null,
    followers: null,
    following: null,
    messages: [],
  },
  rank_data: {
    rank: 'Unranked',
    level: 0,
    xp: 0,
    rank_progress: 0,
  },
  blocklist: [],
  warnings: 0,
  tips: {
    sended: 0,
    received: 0,
    history: [],
  },
  mute_status: {
    muted: false,
    expiration: null,
  },
  ban_status: {
    banned: false,
    expiration: null,
  },
  kazama_crash: {
    crash_bet_amount: 0,
    crash_payout_multiplier: 0,
    crash_trenball_team: '',
    crash_trenball_bet: 0,
    crash_games_played: 0,
    crash_games_won: 0,
    crash_games_lost: 0,
    crash_deposited: 0,
    crash_withdrawed: 0,
    crash_nyan_hit: false,
  },
  kazama_holder_ranks: {
    liquidity_provider: false,
    spacenaut: false,
    kraken: false,
    whale: false,
    shark: false,
    orca: false,
    dolphin: false,
    turtle: false,
    fish: false,
    crab: false,
    shrimp: false,
    holder: false,
    non_holder: true,
  },
  session_data: {
    active: false,
  },
  joined_at: new Date(),
  updated_at: null,
});

// Custom hook to access the user data context
export const useUserData = () => useContext(UserDataContext);

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
export const UserDataProvider = ({ children }) => {
  const socket = useSocket();
  const { account } = useWeb3React();
  const [userData, setUserData] = useState({
    general_data: {
      username: '',
      has_password: false,
      recovery_email: 'No recovery email',
      is_activated: true,
      ip: '0',
      country: 'Unknown',
      balance_kazama: 0,
      role: 'user',
      anonymous: false,
      avatar_image: 'https://assets.kazama.io/profiles/avatars/default.jpg',
      notifications_enabled: true,
    },
    platform_balance: {
      balance: 0,
      deposited: 0,
      withdrawed: 0,
      deposit_history: [],
      withdrawal_history: [],
      profit_loss: 0,
    },
    online_status: {
      is_online: false,
      away: false,
      online_since: null,
      offline_since: null,
    },
    messages_inbox: {
      inbox: [],
      outbox: [],
    },
    notifications: [],
    profile_data: {
      subscribed: false,
      subscription_expiration: null,
      header_image: 'https://assets.kazama.io/profiles/profile_background/default.jpg',
      youtube_channel: null,
      twitter_page: null,
      followers: null,
      following: null,
      messages: [],
    },
    rank_data: {
      rank: 'Unranked',
      level: 0,
      xp: 0,
      rank_progress: 0,
    },
    blocklist: [],
    warnings: 0,
    tips: {
      sended: 0,
      received: 0,
      history: [],
    },
    mute_status: {
      muted: false,
      expiration: null,
    },
    ban_status: {
      banned: false,
      expiration: null,
    },
    kazama_crash: {
      crash_bet_amount: 0,
      crash_payout_multiplier: 0,
      crash_trenball_team: '',
      crash_trenball_bet: 0,
      crash_games_played: 0,
      crash_games_won: 0,
      crash_games_lost: 0,
      crash_deposited: 0,
      crash_withdrawed: 0,
      crash_nyan_hit: false,
    },
    kazama_holder_ranks: {
      liquidity_provider: false,
      spacenaut: false,
      kraken: false,
      whale: false,
      shark: false,
      orca: false,
      dolphin: false,
      turtle: false,
      fish: false,
      crab: false,
      shrimp: false,
      holder: false,
      non_holder: true,
    },
    session_data: {
      active: false,
    },
    joined_at: new Date(),
    updated_at: null,
  });

  // Fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get(`${getUserData}/${account}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Execute retrieving
  useEffect(() => {
    if (account) {
      fetchData();
    }
  }, [account]);

  // Handler for updating balance when funds sended
  useEffect(() => {
    if (socket && socket.current) {
      socket.current.on("sender-balance", (updatedBalance) => {
        // Set the balance to the received value
        setUserData((prevUserData) => ({
          ...prevUserData,
          platform_balance: {
            ...prevUserData.platform_balance,
            balance: updatedBalance.balance, // Update the balance property
          },
        }));
      });
    }
  }, [socket.current]);

// Handler for updating balance of tip receiver & execute pop up
useEffect(() => {
  if (socket && socket.current) {
    socket.current.on("receiver-updated-balance", ({ updatedBalance, tippedAmount, tipperUsername }) => {
      // Set the balance to the received value
      setUserData((prevUserData) => ({
        ...prevUserData,
        platform_balance: {
          ...prevUserData.platform_balance,
          balance: updatedBalance.balance, // Update the balance property
        },
      }));
      // Run toast if tipperUsername is defined
      if (tipperUsername) {
        receivedTipToast(tippedAmount, tipperUsername, updatedBalance);
      } else {
        console.error('Tipper username is undefined');
      }
      // Execute sound
      getTipReceivedSound().play()
    });
  }
}, [socket.current]);

// Handler for updating notifications
useEffect(() => {
    if (socket && socket.current) {
      socket.current.on("new-notification", (updatedNotification) => {
        // Append the new notification to the existing notifications array
        setUserData((prevUserData) => ({
          ...prevUserData,
          notifications: [...prevUserData.notifications, updatedNotification], // Append the new notification
        }));
      });
    }
  }, [socket.current]);

// Handler for updating rank progress
useEffect(() => {
  if (socket && socket.current) {
    socket.current.on("xp-updated", (updatedRankData) => {
      setUserData((prevUserData) => ({
        ...prevUserData,
        rank_data: {
          ...prevUserData.rank_data,
          xp: updatedRankData.xp,
          rank_progress: updatedRankData.rank_progress
        }
      }));
    });
  }
}, [socket.current]);

// Received tip toast
  const receivedTipToast = (amount, user, newBalance) => {
    toast(
    <>
    <KazamaToastHeader>
    <AccountLink to={`/profile/${user}`}>{user.length > 20 ? truncateHash(user) : user}</AccountLink> tipped you ${amount} 
    </KazamaToastHeader>
    </>
    ,{
      position: "top-right",
      autoClose: 19000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      icon: (<PaperStackIcon width={32} marginRight="5px" filter="drop-shadow(#39A957 0px 0px 8px);"/>),
      transition: Zoom
    });
  };

  return (
    <UserDataContext.Provider value={userData}>
      {children}
    </UserDataContext.Provider>
  );
};