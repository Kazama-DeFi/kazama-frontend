import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import truncateHash from '@kazamaswap/utils/truncateHash'
import { Modal } from '@kazamaswap/uikit'
import { useAccount } from 'wagmi'
import { useSignMessage, useWeb3React } from '@kazamaswap/wagmi'
import { tipUser, getBalance } from 'utils/apiRoutes'

const StyledModal = styled(Modal)`
  ${({ theme }) => theme.mediaQueries.md} {
    width: 425px;
    max-width: 425px;
    border-radius: 16px;
    background: #21252b;
    border-bottom: 2px solid #11141e;
  }
`

// Set props
interface OptionsModalProps {
    onDismiss?: () => void
    onDone?: () => void
    receiverUsername: string;
}

const OptionsModal: React.FC<OptionsModalProps> = ({ onDismiss, onDone, receiverUsername }) => {

    // Set consts
    const { signMessageAsync } = useSignMessage()
    const { address: account } = useAccount()
    const [balance, setBalance] = useState(0)

    // Fetch balance
    const fetchBalance = async() => {
        await axios.get(`${getBalance}/${account}`).then((response) => {
            setBalance(response.data.platform_balance.balance)
        })
    }

    // Get balance
    useEffect(() => {
        fetchBalance()
    }, [account])

    // Return modal
    return (
        <StyledModal title={(`${receiverUsername.length > 20 ? truncateHash(receiverUsername) : receiverUsername}`)} onDismiss={onDismiss} >
            {balance}
        </StyledModal>
    )
}

export default OptionsModal