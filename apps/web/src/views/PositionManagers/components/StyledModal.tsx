import { styled } from 'styled-components'
import { Modal } from '@kazamaswap/uikit'

export const StyledModal = styled(Modal)`
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 350px;
  }
`
