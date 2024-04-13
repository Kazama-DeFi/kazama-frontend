import axios from 'axios';
import { CommitButton } from 'components/CommitButton';
import FoldableText from 'components/FoldableSection/FoldableText';
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

import Dots from '../../components/Loader/Dots';
import { connect, setIsActivated } from '../../utils/apiRoutes';

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
`

const ExpandedBox = styled.div`
padding: 0.75rem;
border-radius: 0px 0px 14px 14px;
border: 1px solid #1a1e23;
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

interface ActivateProfileModalProps {
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

const KazamaText = styled(Text)`
  font-size: 22px;
  font-family: 'Intro', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  /* Warning: no fallback */
  background: -webkit-linear-gradient(-360deg, #743ad5 5%, #ee1a78 91%);
  -webkit-background-clip: text;
  -webkit-text-stroke: 4px transparent;
  color: #1a1e23;
`

const KAZAMA_TO_BURN = parseUnits('15000')
const DEAD_ADDRESS = '0x000000000000000000000000000000000000dEaD'

const ActivateProfile: React.FC<React.PropsWithChildren<ActivateProfileModalProps>> = ({ onDismiss, onDone }) => {
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
  kazama = useKazamaBurn()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { data, isFetched } = useBalance({ addressOrName: account })
  const { balance: kazamaBalance } = useGetKazamaBalance()
  const message = 'KazamaSwap Profile Activation'


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
      const signature = await signMessageAsync({ message: message })
      const { data } = await axios.post(connect, {
        address: account,
        is_activated: true,
        signature
      })
      console.log(data)
      toastSuccess('Successfully activated your profile', data.message)
    } catch (error) {
      toastError(error instanceof Error && error?.message ? error.message : JSON.stringify(error))
    } finally {
      onDismiss()
    }
  }


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
    <StyledModal title={t('Activate Profile')} onDismiss={onDismiss} >
      <KazamaText>Decentralized!</KazamaText>
      Fully blockchain signed!

      <FoldableText title={t('Why activate my account?')} mt="24px">
        <ExpandedBox>
        <Text fontSize="12px" color="#a6a7aa">
              {t(
                "With an activated profile you can use current and future community utilities such as use the chat, set your own nickname and avatar, your own profile page and many more future fun utilities!",
              )}
            </Text>
        </ExpandedBox>
          </FoldableText>
          <FoldableText title={t('Why burn KAZAMA to activate?')} mt="2px">
          <ExpandedBox>
        <Text fontSize="12px" color="#a6a7aa">
              {t(
                "The main reason to burn KAZAMA as a requirement is to prevent as many spammers as possible in the chat. A profile can be deactivated if a user misbehaves, which needs to be reactivated with a burn by that user if not completely banned from the chat. In addition, it is an extra burn event in addition to the self-burning property of the token, which benefits the token holders.",
              )}
            </Text>
        </ExpandedBox>
          </FoldableText>
          <FoldableText title={t('Is deactivation possible?')} mt="2px" mb="24px">
          <ExpandedBox>
        <Text fontSize="12px" color="#a6a7aa">
              {t(
                "It is not yet possible for the user to deactivate his profile, but this could possibly be applied in the future. Only the platform admins can deactivate an account in case of multiple warnings of misconduct by a user.",
              )}
            </Text>
        </ExpandedBox>
          </FoldableText>          

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
      To activate a nickname you need to burn 1000 KAZAMA from your balance, so think carefully about your nickname.
      </Text>
      </BurnWrapper>

        <div style={{textAlign: "center"}}>
        {/* <div style={{ padding: '0 1rem', marginTop: '-1.25rem', marginBottom: '-1.25rem' }}>
          <StyledSwitchButton variant="light" scale="sm">
          <ArrowDownIcon />
          </StyledSwitchButton>
        </div> */}
        <StyledResultWrapper>
          <Indicator marginTop="10px" marginBottom="10px">
            {pendingTx && <><Dots style={{fontSize: "20px"}}>Confirming</Dots></>}
            {/* {isLoading && <AutoRenewIcon width={32} spin />}
            {!isLoading && isValid  && userName && <CheckmarkIcon width={32} color="success" />}
            {!isLoading && !isValid && userName && <WarningIcon width={32} color="failure" />} */}
          </Indicator>
</StyledResultWrapper>
{/* <InfoWrapper>
  <Text fontSize="12px" color="#a6a7aa">
  Please note that the activation will be set for this particular wallet address only!
  </Text>
</InfoWrapper> */}

    </div>
    {/* <div style={{marginTop: "15px", marginBottom: "10px"}}>
    <ProgressSteps steps={[balanceCheck === true, isValid === true, isBurned === true]} />
    </div> */}
    <Flex>
      <SetNameButton style={{marginTop: "15px", width: "100%"}}
      startIcon={<StyledBurnIcon width={18} paddingBottom="2px"/>}
      endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
      onClick={async () => {
        const receipt = await fetchWithCatchTxError(() => {
          return kazama.transfer(DEAD_ADDRESS, KAZAMA_TO_BURN)
        })
        if (receipt?.status) {
          toastSuccess(
            `${t('Burned successfully ..')}!`,
          )
          setIsBurned(true)
          handleConfirm()
        }
      }}
      >
      {pendingTx ? t('Burning') : t('Burn Kazama')}
      </SetNameButton> 
        </Flex>
    </StyledModal>
  )
}

export default ActivateProfile
