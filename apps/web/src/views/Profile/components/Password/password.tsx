import { CommitButton } from 'components/CommitButton';
import Page from 'components/Layout/Page';
import { ToastDescriptionWithTx } from 'components/Toast';
import useCatchTxError from 'hooks/useCatchTxError';
import { useRouter } from 'next/router';
/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useProfile } from 'state/profile/hooks';
import styled from 'styled-components';
import ProgressSteps from 'views/Swap/components/ProgressSteps';
import { useBalance } from 'wagmi';

import { parseUnits } from '@ethersproject/units';
import { useTranslation } from '@kazamaswap/localization';
import { Input as UIKitInput, Modal, useModal } from '@kazamaswap/uikit'
import { useSignMessage, useWeb3React } from '@kazamaswap/wagmi';

import { setPassword, setNewPassword, getUserData } from 'utils/apiRoutes';
import axios from 'axios';

const StyledModal = styled(Modal)`
  ${({ theme }) => theme.mediaQueries.md} {
    width: 425px;
    max-width: 425px;
    border-radius: 16px;
    background: #21252b;
    border-bottom: 2px solid #11141e;
  }
`

const StyledInputWrapper = styled.div`
padding: 0.75rem;
background: #1a1e23;
border-radius: 6px;;
border: 1px solid #11141e;
`

const InputWrapper = styled.div`
display: flex;
background: transparent;
outline: none;
border-radius: 6px;;
`

const StyledResultWrapper = styled.div`
padding: 0.75rem;
background: #1a1e23;
border-radius: 6px;;
border: 1px solid #11141e;
`

const InfoWrapper = styled.div`
padding: 0.75rem;
border-radius: 6px;;
border: 1px solid #1a1e23;
margin-top: 10px;
`

const BurnWrapper = styled.div`
padding: 0.75rem;
border-radius: 6px;;
border: 1px solid #1a1e23;
margin-top: 3px;
margin-bottom: 15px;
`

interface PasswordModalProps {
  onDismiss?: () => void
  onDone?: () => void
}

const InputWrap = styled.div`
  position: relative;
  max-width: 240px;
`

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
    }};

  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.textSubtle};
    font-size: 22px;
  }

 ::placeholder::focus {
    color: purple;
}
`

const SetPassword: React.FC<React.PropsWithChildren<PasswordModalProps>> = ({ onDismiss, onDone }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { signMessageAsync } = useSignMessage()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const [password, setPasswordValue] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [error, setError] = useState(null);
  const [hasPassword, setHasPassword] = useState(false);
  const [userData, setUserData] = useState({_id: '', general_data: {recovery_email: ''}});
  const [passwordStrength, setPasswordStrength] = useState('');

  // Password strength checker function
  const checkPasswordStrength = (password: string): string => {
    if (password.length < 3) {
      return 'Password must be at least 3 characters long';
    }
    if (password.length > 33) {
      return 'Password must be at most 33 characters long';
    }
    if (password.match(/[a-zA-Z]/) && password.match(/[0-9]/) && password.match(/[^a-zA-Z0-9]/)) {
      return 'Very Strong';
    }
    if (password.match(/[a-zA-Z]/) && password.match(/[0-9]/)) {
      return 'OK';
    }
    return 'Not Strong';
  };

  // Retrieve ID + recovery email
  const fetchData = async() => {
    await axios.get(`${getUserData}/${account}`).then((response) => {
      setUserData(response.data)
    });
  }

  // Fetch
  useEffect(() => {
    fetchData()
  }, [])

  // Handle password change
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPasswordValue(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  // Handle confirmed password change
  const handleConfirmedPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmedPassword = event.target.value;
    setConfirmedPassword(newConfirmedPassword);
  };

  // Handle recovery email change
  const handleRecoveryEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRecoveryEmail = event.target.value;
    setRecoveryEmail(newRecoveryEmail);
  };

// Handle set password call (1st time)
const activatePassword = async () => {
  // Additional text to include before the account address
  const messagePrefix = `Kazama DeFi - Set New Password\n(ID: ${userData._id})\n\nSign this message with the address below to verify you are the owner:\n`;

  // Concatenate the additional text with the account address
  const message = messagePrefix + account;

  try {
    const signature = await signMessageAsync({ message })
    const response = await fetch(setPassword, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: account,
        password: password,
        recoveryEmail: recoveryEmail,
        signature
      }),
    });

    // Log the response data for debugging
    const responseData = await response.text();
    console.log(`email: ${recoveryEmail}`);

    // Handle the response appropriately based on the response status
    if (!response.ok) {
      // Handle server error
      console.error('Server error:', responseData);
      return;
    }

    // Process the response data if needed
  } catch (error) {
    console.log(error);
    // Handle error
  }
}

  // Check if passwords match
  const passwordsMatch = password === confirmedPassword;

  return (
    <StyledModal title={t('Set username')} onDismiss={onDismiss} >
      <StyledInputWrapper>
        <InputWrap>
          <Input
            type="password"
            placeholder={t('Password')}
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordStrength && <InfoWrapper>{passwordStrength}</InfoWrapper>}
        </InputWrap>
      </StyledInputWrapper>

      {/* Confirm password input */}
      <StyledInputWrapper>
        <InputWrap>
          <Input
            type="password"
            placeholder={t('Confirm Password')}
            value={confirmedPassword}
            onChange={handleConfirmedPasswordChange}
          />
          {/* Show message if passwords don't match */}
          {!passwordsMatch && <InfoWrapper>Passwords do not match</InfoWrapper>}
        </InputWrap>
      </StyledInputWrapper>

      <StyledInputWrapper>
        <InputWrap>
          <Input
            type="text"
            placeholder={t('Recovery Email')}
            value={recoveryEmail}
            onChange={handleRecoveryEmailChange}
          />
          {/* You can add validation message here if needed */}
        </InputWrap>
      </StyledInputWrapper>
      {userData.general_data.recovery_email} - {userData._id} - {account}

      {/* Confirm button */}
      <CommitButton onClick={activatePassword}>{t('Confirm')}</CommitButton>
    </StyledModal>
  )
}

export default SetPassword
