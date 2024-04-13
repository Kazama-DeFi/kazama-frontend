import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { host } from 'utils/apiRoutes';
import { useWeb3React } from '@kazamaswap/wagmi';

// Create the SocketContext
const SocketContext = createContext(null);

// Custom hook to use the socket
export const useSocket = () => {
  return useContext(SocketContext);
};

// SocketProvider component to provide the socket context
export const SocketProvider = ({ children }) => {
    const socket = useRef();
    const { account, isConnected } = useWeb3React()
    const [socketAddress, setSocketAddress] = useState(null)

    // Socket
    useEffect(() => {
       socket.current = io(host);
    }, [])

    // Set user socket data connection
    useEffect(() => {
        // First render
        if (isConnected && socket && socketAddress == null) {
          socket.current.emit('set-address', account);
          setSocketAddress(account)
    
          // On wallet change
        }  else if (isConnected && socket && socketAddress !== account) {
          const disconnectOld = async () => {
            await assignOldWalletData(socketAddress)
            await assignNewWalletData(account)
            setSocketAddress(account)
          }
          disconnectOld()
        }
    }, [account])

    useEffect(() => {  
        // Start the heartbeat mechanism
        let heartbeatInterval;
    
        const sendPing = () => {
          if (socket.current) {
            socket.current.emit('pong');
          }
        };
    
        const startHeartbeat = () => {
          heartbeatInterval = setInterval(() => {
            sendPing();
          }, 10000); // Send a ping every 10 seconds
        };
    
        const stopHeartbeat = () => {
          clearInterval(heartbeatInterval);
        };
    
        // Listen for pong response from the server
        socket.current.on('ping', () => {
          // Pong received, reset the heartbeat interval
          stopHeartbeat();
          startHeartbeat();
        });
    
        // Handle socket disconnection
        socket.current.on('disconnect', () => {
          // Socket disconnected, stop the heartbeat
          stopHeartbeat();
        });
    
        return () => {
          // Clean up when the component unmounts
          if (socket.current) {
            socket.current.disconnect();
          }
          stopHeartbeat();
        };
      }, []);
    
      // Connect new wallet and set data
      const assignNewWalletData = (address) => {
        socket.current.emit('set-address', address);
      }
    
      // Disconnect and remove old wallet from usernames list
      const assignOldWalletData = (address) => {
        socket.current.emit('set-old-wallet-data', address);
      }

// Provide the socket context and its value to the children
return (
<SocketContext.Provider value={socket}>
    {children}
</SocketContext.Provider>
  );
};

export default SocketProvider;
