import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import truncateHash from '@kazamaswap/utils/truncateHash';
import { Input as UIKitInput, Modal, Button, Text, Image } from '@kazamaswap/uikit';
import { useAccount } from 'wagmi';
import { useSignMessage } from '@kazamaswap/wagmi';
import { tipUser, getUserData } from 'utils/apiRoutes';
import { toast } from 'kazama-defi-react-toasts';
import 'kazama-defi-react-toasts/dist/KazamaToasts.css';
import { Zoom } from 'kazama-defi-react-toasts';

const StyledModal = styled(Modal)`
    ${({ theme }) => theme.mediaQueries.md} {
        width: 425px;
        max-width: 425px;
        background: #21252b;
        border-bottom: 2px solid #11141e;
    }
`;

const Input = styled(UIKitInput)`
    background: transparent;
    width: 100%;
    border-radius: 7px;
    border: 0px solid transparent !important;
    outline: none;
    box-shadow: none;
    position: relative;
    font-weight: 500;
    outline: none;
    border: none;
    flex: 1 1 auto;
    background-color: transparent;
    font-size: 22px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0px;
    margin-bottom: 5px;
    &:disabled {
        background-color: transparent;
        box-shadow: none;
        color: ${({ theme }) => theme.colors.textDisabled};
        cursor: not-allowed;
    }

    &:focus:not(:disabled) {
        box-shadow: none !important;
    }
`;

const KazamaToastHeader = styled.div`
color: #fff;
font-size: 15px;
font-weight: bold;
margin-bottom: 3px;
`

const TipUser = ({ onDismiss, receiverUsername, socket }) => {
    // Set consts
    const { signMessageAsync } = useSignMessage();
    const { address: account } = useAccount();
    const [senderUserData, setSenderUserData] = useState({_id: '', general_data: {username: ''}, platform_balance: {balance: 0}});
    const [receiverUserData, setReceiverUserData] = useState({address: ''});
    const [tipAmount, setTipAmount] = useState(0);
    const [successfulTip, setSuccessfulTip] = useState(null);

    // Fetch sender data
    const fetchSenderData = async () => {
        try {
            const response = await axios.get(`${getUserData}/${account}`);
            setSenderUserData(response.data);
        } catch (error) {
            console.error('Error fetching sender data:', error);
        }
    };

    // Fetch receiver data
    const fetchReceiverData = async () => {
        try {
            const response = await axios.get(`${getUserData}/${receiverUsername}`);
            setReceiverUserData(response.data);
        } catch (error) {
            console.error('Error fetching receiver data:', error);
        }
    };

    // Get balance
    useEffect(() => {
        fetchSenderData();
        fetchReceiverData();
    }, [account]);

// Handle tip send
const handleSendTip = async () => {
    // Additional text to include before the account address
    const messagePrefix = `Kazama DeFi - Tip ${receiverUsername} $${tipAmount}\n\nSign this message with the address below to verify you are the owner:\n`;

    // Concatenate the additional text with the account address
    const message = messagePrefix + account;

    try {
        const signature = await signMessageAsync({ message });
        const response = await fetch(tipUser, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tipperAddress: account,
                receiverUsername: receiverUsername,
                amount: tipAmount,
                signature
            }),
        });

        // Log the response data for debugging
        const responseData = await response.json();

        // Check if the response indicates success
        if (response.ok && responseData.message === 'Tip sent successfully') {
            // Emit event to update sender balance
            socket.current.emit("update-sender-balance", { address: account, socketId: socket.current.id });
            socket.current.emit("update-receiver-balance", receiverUsername, account, tipAmount);
            kazamaToastSuccess(tipAmount, receiverUsername)
        } else {
            console.error('Error sending tip:', responseData.message);
        }
    } catch (error) {
        console.error('Error sending tip:', error);
    }
};

const kazamaToastSuccess = (amount, user) => {
    toast.success(
    <>
    <KazamaToastHeader>You tipped ${amount} to ${user.length > 20 ? truncateHash(user) : user}</KazamaToastHeader>
    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
      <div style={{width: "16px", marginRight: "3px"}}>
      <Image src='/images/chat/icons/wallet.png' width={16} height={16} marginRight="3px"/>
      </div>
      <div>
      <Text>
      shit
      </Text>
      </div>
      </div></>, {
      position: "top-right",
      autoClose: 750000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      icon: (<Image src='/images/chat/icons/wallet.png' width={22} height={22}/>),
      transition: Zoom
    });
  };
    // Return modal
    return (
        <><StyledModal title={`Tip ${receiverUsername.length > 20 ? truncateHash(receiverUsername) : receiverUsername}`} onDismiss={onDismiss}>
            <Text mb="8px">Enter tip amount:</Text>
            <Input type="number" value={tipAmount} onChange={(e) => setTipAmount(Number(e.target.value))} />
            <Button onClick={handleSendTip}>Send Tip</Button>
        </StyledModal></>
    );
};

export default TipUser;
