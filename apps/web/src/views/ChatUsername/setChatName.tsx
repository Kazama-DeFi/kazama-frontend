import { CommitButton } from 'components/CommitButton';
import Page from 'components/Layout/Page';
import { ToastDescriptionWithTx } from 'components/Toast';
import useCatchTxError from 'hooks/useCatchTxError';
import { useKazamaBurn } from 'hooks/useContract';
import { useGetKazamaBalance } from 'hooks/useTokenBalance';
import { useRouter } from 'next/router';
/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useProfile } from 'state/profile/hooks';
import styled from 'styled-components';
import ProgressSteps from 'views/Swap/components/ProgressSteps';
import { useBalance } from 'wagmi';

import { parseUnits } from '@ethersproject/units';
import { useTranslation } from '@kazamaswap/localization';
import useToast, {
    ArrowDownIcon, AutoRenewIcon, BurnFlamesIcon, BurnIcon, Button, Card, CardBody, Checkbox,
    CheckmarkIcon, Flex, Heading, IconButton, Input as UIKitInput, Modal, Skeleton, Text, useModal,
    WarningIcon
} from '@kazamaswap/uikit';
import { useSignMessage, useWeb3React } from '@kazamaswap/wagmi';

import { isValidRoute, setUserNameRoute } from '../../utils/apiRoutes';

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

const SwitchIconButton = styled(IconButton)`
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1);
  .icon-down {
    fill: #fff !important;
  }
  .icon-up-down {
    display: none;
    fill: #fff !important;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    .icon-down {
      display: none;
      fill: white;
    }
    .icon-up-down {
      display: block;
      fill: white;
    }
  }
`

const StyledSwitchButton = styled(SwitchIconButton)`
border-radius: 50%;
background: #1a1e23;
z-index: 100;
border: 1px solid #11141e;
`

interface SetChatNameModalProps {
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

const Indicator = styled(Flex)`
  align-items: center;
  height: 24px;
  justify-content: center;
`

const ArrowWrapper = styled.div`
background-color: #201c29;
border-radius: 50px;
`

const StyledBurnIcon = styled(BurnFlamesIcon)`
margin-right: 3px !important;
`

const SetNameButton = styled(Button)`
box-shadow: rgb(238 26 121 / 40%) 0px 0px 15px, rgb(255 255 255 / 20%) 0px 1px 0px inset, rgb(0 0 0 / 15%) 0px -3px 0px inset, rgb(238 26 121) 0px 0px 12px inset;
    height: 40px;
    border-radius: 7px;
    background: rgb(238,26,120);
    font-family: 'Rajdhani',sans-serif;
    color: #fff;
    font-size: 15px;
`

const KAZAMA_TO_BURN = parseUnits('10000')
const DEAD_ADDRESS = '0x000000000000000000000000000000000000dEaD'

const SetChatName: React.FC<React.PropsWithChildren<SetChatNameModalProps>> = ({ onDismiss, onDone }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { isInitialized, hasProfile } = useProfile()
  const router = useRouter()
  const { signMessageAsync } = useSignMessage()
  const [userName, setUserName] = useState<string>(undefined)
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isBurned, setIsBurned] = useState(false)
  const [usernameToCheck, setUsernameToCheck] = useState<string>(undefined)
  const { toastError, toastSuccess } = useToast()
  const kazama = useKazamaBurn()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { data, isFetched } = useBalance({ addressOrName: account })
  const { balance: kazamaBalance } = useGetKazamaBalance()


  const handleChange = (event) => {
    const { value } = event.target
    setUserName(value)
    setUsernameToCheck(value)
  }

  // useEffect(() => {
  //   if (account && hasProfile) {
  //     router.push(`/profile/${account.toLowerCase()}`)
  //   }
  // }, [account, hasProfile, router])

  // if (!isInitialized || isLoading) {
  //   return <PageLoader />
  // }

  const handleConfirm = async () => {
    try {
      setIsLoading(true)
      const signature = await signMessageAsync({ message: userName })
      const response = await fetch(setUserNameRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: account,
          username: userName,
          signature
        }),
      })
      const data = await response.json();
      console.log(data)
      toastSuccess('Success', data.message)
      onDone?.()
    } catch (error) {
      toastError(error instanceof Error && error?.message ? error.message : JSON.stringify(error))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const fetchUsernameToCheck = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(isValidRoute, {
          method: 'post',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: userName,
          })
        })
        const data = await res.json();

        if (data.status) {
          setIsValid(true)
        } else {
          setIsValid(false)
        }        
      } catch (e) {
        setIsValid(false)
        console.log(e)
      } finally {
        setIsLoading(false)
      }
    }

    if (userName?.length > 2) {
      fetchUsernameToCheck()
    } else {
      setIsValid(false)
    }
  }, [userName])

  let balanceCheck: boolean;
  const BalanceMessage = () => {
  if (kazamaBalance >= KAZAMA_TO_BURN) {
    balanceCheck = true;
    return (
      <Flex style={{background: "rgba(16, 217, 96, 0.74)",border: "1px solid #10D960", borderRadius: "7px", display: "inline-block", width: "100px", height: "20px"}}>
       <Text textAlign="center" fontSize="12px" color="#fff"> Check passed
       </Text>
      </Flex>
    )
  } else {
    return (
      <Flex style={{background: "#FF5958", borderRadius: "7px", display: "inline-block", width: "155px", height: "20px"}}>
      <Text textAlign="center" fontSize="12px" color="#fff"> Failed: not enough balance
      </Text>
     </Flex>
    )
  }
}

  return (
    <StyledModal title={t('Set username')} onDismiss={onDismiss} >
        <Flex flexDirection="row" justifyContent="space-between">
          <Flex>
          <Text>
        1. Check balance
        </Text>
          </Flex>
          <Flex>
          {BalanceMessage()}
          </Flex>
        </Flex>
      <BurnWrapper>
      <Text fontSize="12px" color="#a6a7aa" textAlign="center">
      To activate a nickname you need to burn 10.000 KAZAMA from your balance, so think carefully about your nickname.
      </Text>
      </BurnWrapper>
      <div style={{marginBottom: "3px"}}>
      <Text>
        2. Enter a unique name
        </Text>
      </div>
 
        <div style={{textAlign: "center"}}>
        <StyledInputWrapper>

        <Flex style={{alignItems: "center", justifyContent: "center", width: "100%"}}>
        <InputWrapper>
          <Input
            disabled={!balanceCheck}
            onChange={handleChange}
            isWarning={userName && !isValid}
            isSuccess={userName && isValid}
            minLength={3}
            maxLength={20}
            // disabled={isUserCreated}
            placeholder={'Enter nickname ..'}
            value={userName}
          />
        </InputWrapper>

      </Flex>
        </StyledInputWrapper>
        <div style={{ padding: '0 1rem', marginTop: '-1.25rem', marginBottom: '-1.25rem' }}>
          <StyledSwitchButton variant="light" scale="sm">
          <ArrowDownIcon />
          </StyledSwitchButton>
        </div>
        <StyledResultWrapper>
          <Indicator marginTop="10px" marginBottom="10px">
            {isLoading && <AutoRenewIcon width={32} spin />}
            {!isLoading && isValid  && userName && <CheckmarkIcon width={32} color="success" />}
            {!isLoading && !isValid && userName && <WarningIcon width={32} color="failure" />}
          </Indicator>
</StyledResultWrapper>
<InfoWrapper>
  <Text fontSize="12px" color="#a6a7aa">
  Please note that your chat nickname will also be your future profile name. If you wish to change your nickname in the future you will have to burn KAZAMA again and your old nickname will become available for others to use, please keep this in mind.
  </Text>
</InfoWrapper>

    </div>
    {/* <div style={{marginTop: "15px", marginBottom: "10px"}}>
    <ProgressSteps steps={[balanceCheck === true, isValid === true, isBurned === true]} />
    </div> */}
    <Flex>
    {isBurned ? 
        <SetNameButton onClick={handleConfirm} startIcon={<StyledBurnIcon width={18} fill="#BDC2C4 !important" paddingBottom="2px"/>} disabled={!isValid || isLoading || !isBurned} style={{marginTop: "15px", width: "100%"}}>
        {'Burn Kazama And Set Username'}
      </SetNameButton>
      :
      <SetNameButton style={{marginTop: "15px", width: "100%"}} disabled={!isValid || isLoading}
      startIcon={<StyledBurnIcon width={18} paddingBottom="2px"/>}
      endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
      onClick={async () => {
        const receipt = await fetchWithCatchTxError(() => {
          return kazama.transfer(DEAD_ADDRESS, KAZAMA_TO_BURN)
        })
        if (receipt?.status) {
          toastSuccess(
            `${t('Burned successfully ..')}!`,
            <ToastDescriptionWithTx txHash={receipt.transactionHash}>
              {t('You can resume to step four ..')}
            </ToastDescriptionWithTx>,
          )
          setIsBurned(true)
          handleConfirm()
        }
      }}
      >
      {pendingTx ? t('Burning') : t('Burn Kazama And Set Username')}
      </SetNameButton> 
  }
        </Flex>
    </StyledModal>
  )
}

export default SetChatName
