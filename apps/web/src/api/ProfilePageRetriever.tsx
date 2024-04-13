import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useWeb3React } from '@kazamaswap/wagmi';
import { getUserData } from 'utils/apiRoutes';
import io from 'socket.io-client';

const socket = io('https://api.kazama.io');

// Create a new context with initial state as defaultValue
const ProfilePageContext = createContext({
    address: '',
    general_data: {
      username: '',
      has_password: false,
      recovery_email: 'No recovery email',
      is_activated: true,
      ip: '0',
      country: 'Unknown',
      balance_kazama: 0,
      role: 'user',
      hidden: false,
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
  export const useProfileData = (user) => {
    const context = useContext(ProfilePageContext);
    const [userData, setUserData] = useState(context);
  
    useEffect(() => {
      fetchDataForUser(user);
    }, [user]);
  
    const fetchDataForUser = async (user) => {
      try {
        // Fetch data for the specified user
        const response = await axios.get(`${getUserData}/${user}`);
        const userData = response.data;
        // Update the context with the fetched data
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    useEffect(() => {
      // Listen for WebSocket events from the server
      socket.on('user-data-update', ({ type, data }) => {
         // Update the UI based on the type of update
         if (type === 'followers') {
          setUserData(prevUserData => ({
              ...prevUserData,
              profile_data: {
                  ...prevUserData.profile_data,
                  followers: data
              }
          }));
      }
  });
  
      // Clean up event listeners when component unmounts
      return () => {
        socket.off('user-data-update');
      };
    }, []);


  
    return userData;
  };

  interface ProfilePageProviderProps {
    children: ReactNode;
    user?: string;
  }

// Provider component that wraps your AccountDataRetriever component
export const ProfilePageProvider = ({ children, user }: ProfilePageProviderProps) => {
  const { account } = useWeb3React();
    const [userData, setUserData] = useState({
        address: '',
        general_data: {
          username: '',
          has_password: false,
          recovery_email: 'No recovery email',
          is_activated: true,
          ip: '0',
          country: 'Unknown',
          balance_kazama: 0,
          role: 'user',
          hidden: false,
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
           const response = await axios.get(`${getUserData}/${user}`);
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
     }, [user]);

     useEffect(() => {
        // Listen for WebSocket events from the server
        socket.on('user-data-update', ({ type, data }) => {
           // Update the UI based on the type of update
           if (type === 'followers') {
            setUserData(prevUserData => ({
                ...prevUserData,
                profile_data: {
                    ...prevUserData.profile_data,
                    followers: data
                }
            }));
        }
    });
    
        // Clean up event listeners when component unmounts
        return () => {
          socket.off('user-data-update');
        };
      }, []);

     return (
       <ProfilePageContext.Provider value={userData}>
         {children}
       </ProfilePageContext.Provider>
     );
   };