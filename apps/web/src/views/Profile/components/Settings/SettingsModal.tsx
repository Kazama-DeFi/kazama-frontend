import styled from 'styled-components'
import { Modal } from '@kazamaswap/uikit'

interface ModalProps {
    onDismiss?: () => void
  }

const StyledModal = styled(Modal)`
  ${({ theme }) => theme.mediaQueries.md} {
    width: 425px;
    max-width: 425px;
    border-radius: 8px;
    background: #21252b;
    border-bottom: 2px solid #11141e;
  }
`

const SettingsModal: React.FC<React.PropsWithChildren<ModalProps>> = ({ onDismiss }) => {
    return (
        <StyledModal title={('Account Settings')} onDismiss={onDismiss} >
            Some shit
        </StyledModal>
    )
}

export default SettingsModal