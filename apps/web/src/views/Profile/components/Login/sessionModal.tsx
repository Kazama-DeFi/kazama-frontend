import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input as UIKitInput, Modal, Button, Text } from '@kazamaswap/uikit';
import axios from 'axios';
import ProgressBar from '@ramonak/react-progress-bar';
import { useWeb3React } from '@kazamaswap/wagmi';
import { useSignMessage } from '@kazamaswap/wagmi';
import { loginSession, getUserData } from 'utils/apiRoutes';
import { useTranslation } from '@kazamaswap/localization';

const StyledModal = styled(Modal)`
${({ theme }) => theme.mediaQueries.sm} {
  width: 350px;
}
  ${({ theme }) => theme.mediaQueries.md} {
    width: 350px;
  }
`;

const StyledInputWrapper = styled.div`
  padding: 0.75rem;
  background: #1a1e23;
  border-radius: 6px;;
  border: 1px solid #11141e;
  margin-bottom: 20px;
`;

const Input = styled(UIKitInput)`
  width: 100%;
  border-radius: 6px;
  border: 1px solid #0000001a !important;
  outline: none;
  box-shadow: #0000001a 0 1px 1px inset;
  position: relative;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: #1a1e23;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 .75em 0 0.75em;
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

const ActivateSession: React.FC<React.PropsWithChildren<any>> = ({ onDismiss }) => {
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const { signMessageAsync } = useSignMessage();
  const [password, setPassword] = useState('');
  const [serverResponse, setServerResponse] = useState('');
  const [userData, setUserData] = useState({
    _id: '', 
    general_data: {
      username: '',
      avatar_image: '',
      recovery_email: '',
    },
    rank_data: {
      rank: '',
      level: 0,
      xp: 0,
      rank_progress: 0,
    },
  });

  // Changeable vars
  let imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`;
  let background = 'rgba(79, 91, 142, 0.363)';
  let progressColor = '#4f5b8e';
  let rankWidth = 18;

  // Retrieve ID + recovery email
  const fetchData = async() => {
    await axios.get(`${getUserData}/${account}`).then((response) => {
      setUserData(response.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogin = async () => {
    // Additional text to include before the account address
    const messagePrefix = `Kazama DeFi - Account Login\n(ID: ${userData._id})\n\nSign this message with the address below to verify you are the owner:\n`;

    // Concatenate the additional text with the account address
    const message = messagePrefix + account;

    try {
      const signature = await signMessageAsync({ message });
      const response = await axios.post(loginSession, {
        address: account,
        password: password,
        signature
      });

      setServerResponse(response.data.message);
    } catch (error) {
      console.error(error);
      setServerResponse('An error occurred while logging in');
    }
  };

        // Set styling data
        if (userData.rank_data.level === 0) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
          rankWidth = 18;
        } else if (userData.rank_data.level === 1) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_1.png`
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
          rankWidth = 20;
        } else if (userData.rank_data.level === 2) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_2.png`
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
          rankWidth = 28;
        } else if (userData.rank_data.level === 3) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_3.png`
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
          rankWidth = 28;
        } else if (userData.rank_data.level === 4) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_4.png`
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
          rankWidth = 28;
        } else if (userData.rank_data.level === 5) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_5.png`
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
          rankWidth = 28;
        } else if (userData.rank_data.level === 6) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_6.png`
          background = 'rgba(244, 147, 43, 0.445)'
          progressColor = '#F4932B'
          rankWidth = 20;
        } else if (userData.rank_data.level === 7) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_7.png`
          background = 'rgba(244, 147, 43, 0.445)'
          progressColor = '#F4932B'
          rankWidth = 28;
        } else if (userData.rank_data.level === 8) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_8.png`
          background = 'rgba(244, 147, 43, 0.445)'
          progressColor = '#F4932B'
          rankWidth = 28;
        } else if (userData.rank_data.level === 9) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_9.png`
          background = 'rgba(244, 147, 43, 0.445)'
          progressColor = '#F4932B'
          rankWidth = 28;
        } else if (userData.rank_data.level === 10) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_10.png`
          background = 'rgba(244, 147, 43, 0.445)'
          progressColor = '#F4932B'
          rankWidth = 24;
        } else if (userData.rank_data.level === 11) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_11.png`
          background = 'rgba(12, 186, 41, 0.404)'
          progressColor = '#0CBA28'
          rankWidth = 24;
        } else if (userData.rank_data.level === 12) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_12.png`
          background = 'rgba(12, 186, 41, 0.404)'
          progressColor = '#0CBA28'
          rankWidth = 24;
        } else if (userData.rank_data.level === 13) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_13.png`
          background = 'rgba(54, 155, 255, 0.432)'
          progressColor = '#369CFF'
          rankWidth = 22;
        } else if (userData.rank_data.level === 14) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_14.png`
          background = 'rgba(54, 155, 255, 0.432)'
          progressColor = '#369CFF'
          rankWidth = 22;
        } else if (userData.rank_data.level === 15) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_15.png`
          background = 'rgba(12, 186, 41, 0.404)'
          progressColor = '#0CBA28'
          rankWidth = 22;
        } else if (userData.rank_data.level === 16) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_16.png`
          background = 'rgba(12, 186, 41, 0.404)'
          progressColor = '#0CBA28'
          rankWidth = 22;
        } else if (userData.rank_data.level === 17) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_17.png`
          background = 'rgba(12, 186, 41, 0.404)'
          progressColor = '#0CBA28'
          rankWidth = 22;
        } else if (userData.rank_data.level === 18) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_18.png`
          background = 'rgba(12, 186, 41, 0.404)'
          progressColor = '#0CBA28'
          rankWidth = 22;
        } else if (userData.rank_data.level === 19) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/rank_19.png`
          background = 'rgba(12, 186, 41, 0.404)'
          progressColor = '#0CBA28'
          rankWidth = 22;
        } else if (userData.rank_data.level === 20) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        } else if (userData.rank_data.level === 21) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        } else if (userData.rank_data.level === 22) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        } else if (userData.rank_data.level === 23) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        } else if (userData.rank_data.level === 24) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        } else if (userData.rank_data.level === 25) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        } else if (userData.rank_data.level === 26) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        } else if (userData.rank_data.level === 27) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        } else if (userData.rank_data.level === 28) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        } else if (userData.rank_data.level === 29) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        } else if (userData.rank_data.level === 30) {
          imagePath = `${process.env.NEXT_PUBLIC_KAZAMA_RANK_IMAGE_PATH}/unranked.png`
          background = 'rgba(79, 91, 142, 0.363)'
          progressColor = '#4f5b8e'
        }

  return (
    <StyledModal title={t('ACCOUNT LOGIN')} onDismiss={onDismiss} >
      <div>
        <img src={userData.general_data.avatar_image} width={36} />
      </div>
      <div>
      <ProgressBar className="glowing-progress-bar" baseBgColor={background} margin="5px 0px 0px 0px" transitionTimingFunction="ease-in-out" 
          bgColor={progressColor} height="10px" width="100%" borderRadius="2px" customLabel="XP" isLabelVisible={true} completed={userData.rank_data.rank_progress} maxCompleted={100} />
      </div>
      <div style={{marginBottom: "10px", textAlign: "center"}}>
      <Text fontFamily="Flama Bold" style={{color: "#fff"}}>
      This account has activated extra password security, enter the password to use all profile and social related components.
      </Text>
      </div>
      <div>
      <Text fontSize="15px">
      It is not required to log in with your password, you can always interact with our defi products. However, you will not be able to interact with the social aspects of the platform or change profile settings.
      </Text>
      </div>
        <Input
          type="password"
          placeholder={t('Password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      <Button style={{marginTop: "10px"}} onClick={handleLogin}>{t('Login')}</Button>
      {serverResponse && <p>{serverResponse}</p>}
    </StyledModal>
  );
};

export default ActivateSession;
