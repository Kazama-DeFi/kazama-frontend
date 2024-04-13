import styled from 'styled-components'
import { useTranslation } from '@kazamaswap/localization'
import { WalletModalV2 } from '@kazamaswap/ui-wallets'
import { Button, ButtonProps } from '@kazamaswap/uikit'
import { createWallets, getDocLink } from 'config/wallet'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useAuth from 'hooks/useAuth'
// @ts-ignore
// eslint-disable-next-line import/extensions
import { useActiveHandle } from 'hooks/useEagerConnect.bmp.ts'
import { useMemo, useState } from 'react'
import { useConnect } from 'wagmi'
import { logGTMWalletConnectEvent } from 'utils/customGTMEventTracking'
import Trans from './Trans'

const ConnectWalletButton = ({ children, ...props }: ButtonProps) => {
  const handleActive = useActiveHandle()
  const { login } = useAuth()
  const {
    t,
    currentLanguage: { code },
  } = useTranslation()
  const { connectAsync } = useConnect()
  const { chainId } = useActiveChainId()
  const [open, setOpen] = useState(false)

  const docLink = useMemo(() => getDocLink(code), [code])

  const handleClick = () => {
    if (typeof __NEZHA_BRIDGE__ !== 'undefined' && !window.ethereum) {
      handleActive()
    } else {
      setOpen(true)
    }
  }

  const wallets = useMemo(() => createWallets(chainId, connectAsync), [chainId, connectAsync])

  const ConnectButton = styled(Button)`
    box-shadow: rgb(238 26 121 / 40%) 0px 0px 15px, rgb(255 255 255 / 20%) 0px 1px 0px inset, rgb(0 0 0 / 15%) 0px -3px 0px inset, rgb(238 26 121) 0px 0px 12px inset;
    height: 40px;
    border-radius: 7px;
    background: rgb(238, 26, 120);
    font-family: 'Rajdhani',sans-serif;
    color: #fff;
    font-size: 15px;
`

  return (
    <>
      <ConnectButton onClick={handleClick} {...props}>
        {children || <Trans>Connect To Chat</Trans>}
      </ConnectButton>
      <style jsx global>{`
        w3m-modal {
          position: relative;
          z-index: 99;
        }
      `}</style>
      <WalletModalV2
        docText={t('Learn How to Connect')}
        docLink={docLink}
        isOpen={open}
        wallets={wallets}
        login={login}
        onDismiss={() => setOpen(false)}
        onWalletConnectCallBack={logGTMWalletConnectEvent}
      />
    </>
  )
}

export default ConnectWalletButton
