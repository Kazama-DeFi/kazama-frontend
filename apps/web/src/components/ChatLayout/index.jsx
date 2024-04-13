/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import BigNumber from 'bignumber.js';
import styled from 'styled-components';
import { Button, useModal } from '@kazamaswap/uikit';
import axios from "axios";
import { io } from "socket.io-client";
import { useWeb3React } from '@kazamaswap/wagmi'
import { getBalanceAmount } from '@kazamaswap/utils/formatBalance';
import useGetTokenBalance from 'hooks/useTokenBalance';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ActivateProfile from 'views/ActivateProfile/ActivateProfile';
import ConnectToChat from 'components/ConnectToChat';
import { FetchKazamaRank } from 'views/Profile/components/DataFetchers/KazamaRankFetcher';
import { connect, getAllMessagesRoute, sendMessageRoute, setXp } from '../../utils/apiRoutes';
import { useUserData } from 'api/DataRetriever';
import { useSocket } from 'api/SocketManager';

const ActivateButton = styled(Button)`
  box-shadow: 
  rgb(238 26 121 / 40%) 0px 0px 15px, 
  rgb(255 255 255 / 20%) 0px 1px 0px inset, 
  rgb(0 0 0 / 15%) 0px -3px 0px inset, 
  rgb(238 26 121) 0px 0px 12px inset;
  height: 40px;
  border-radius: 7px;
  background: rgb(238,26,120);
  font-family: 'Rajdhani',sans-serif;
  color: #fff;
  font-size: 15px;
  width: 100%;
`

const ActivateBox = styled.div`
  padding: 15px;
  background: #1a1e23;
  width: 100%;
 `

// Kazama mongoose api
const KAZAMA_ACTIVATED_MONGOOSE = process.env.NEXT_PUBLIC_KAZAMA_ACCOUNT_ACTIVATED_API
const KAZAMA_XP_MONGOOSE = process.env.NEXT_PUBLIC_KAZAMA_ACCOUNT_RANK_DATA_API

// Ip api's
const IPIFY_API = process.env.NEXT_PUBLIC_IPIFY
const IPINFO_API = process.env.NEXT_PUBLIC_IPINFO

const ChatComponent = () => {
  const socket = useSocket();
  const scrollRef = useRef();
  const { account, isConnected } = useWeb3React()
  const [socketAddress, setSocketAddress] = useState(null)
  const [currentUser, setCurrentUser] = useState("")
  const [ip, setIP] = useState('');
  const [country, setCountry] = useState('Undefined')
  const [totalXp, setTotalXp] = useState(0)
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onPresentActivateProfileModal] = useModal(< ActivateProfile />)
  const { balance: userKazama, fetchStatus } = useGetTokenBalance('0xcf72b6D227a88bFfEB6198F4a7BD123636EA34E3', account);
  const userData = useUserData()
  
  // Fetch IP
  const getIp = async () => {
    const res = await axios.get(IPIFY_API);
    setIP(res.data.ip);
  };

  // Get IP
  useEffect(() => {
    getIp();
  }, [account]);

  // Set other data
  useEffect( () => {
    const connectUser = async() => {
      if (isConnected && account && fetchStatus === "success" && socket) {

        // Set IP
        const userIp = ip;

        // Set country
        const userCountry = country;

        // Fetch online status
        const online = true;
        const online_since = new Date();

        // Fetch kazama rank
        const { rankData } = await FetchKazamaRank({ kazamaBalance: userKazama })

        // Set data
        const { data } = await axios.post(connect, {
          address: account,
          general_data: {
            balance_kazama: userKazama,
            ip: userIp,
            country: userCountry
          },
          online_status: {
            is_online: online,
            online_since: online_since
          },

          kazama_holder_ranks: {
            ...rankData
          }
        })
        setCurrentUser(data.user)
      }
    }

  // Connect
  connectUser()

  // fetch data on address usestate
  const fetchData = async () => {
      const response = await axios.post(getAllMessagesRoute, {
        sender: currentUser?._id,
      });
      setMessages(response.data);
    }
    fetchData();
  }, [account, fetchStatus])

  // Function to append a new message to the messages state
  const appendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

// Handle chat msg
const handleSendMsg = async (msg) => {
  if (userData.general_data.is_activated) {
    // Send the message to the server
    await axios.post(sendMessageRoute, {
      sender: currentUser,
      message: msg,
    });

    const updateTime = Date.now();

    // Emit the message to the socket server
    socket.current.emit("send-msg", {
      sender: currentUser,
      message: msg,
      updatedAt: updateTime,
    });
    
    // Append the message locally
    appendMessage({
      fromSelf: true, // Assuming it's the user's own message
      message: msg,
      sender: currentUser,
      updatedAt: updateTime,
    });

    if (account) {
      const addedXp = 2;
      const accountId = currentUser._id
      await axios.post(`${setXp}/${accountId}`, {
        userId: accountId,
        xpChange: addedXp,
      });
      socket.current.emit("update-xp", userData.general_data.username);
    }
  } else {
    null
  }
};

// msg-received useeffect
useEffect(() => {
  if (socket && socket.current) {
    socket.current.on("msg-received", (msg) => {
      // Handle received messages here
      appendMessage({
        fromSelf: false,
        message: msg.message,
        sender: msg.sender,
        likes: msg.likes,
        updatedAt: msg.updatedAt,
      });
    });
  }
}, []);

  // on msg arrival
  useEffect(()=>{
    arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage]);
  },[arrivalMessage]);

  // Scrollref
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Check if input should be showed
  const ShowMessageInput = () => {
    if (!account) {
      return (
        <ActivateBox>
            <ConnectToChat width="100%" />
        </ActivateBox>
      )
    }
    if (userData.general_data.is_activated) {
      return (
        <MessageInput handleSendMsg={handleSendMsg} />
      )
    }
    return (
      <ActivateBox>
      <ActivateButton onClick={onPresentActivateProfileModal}>
        Activate Profile To Chat
      </ActivateButton>
      </ActivateBox>
    )
  }

  // Return message list + input
  return (
    <>
      <MessageList scrollRef={scrollRef} messages={messages} />
        {ShowMessageInput()}
    </>
  );
};

export default ChatComponent;
