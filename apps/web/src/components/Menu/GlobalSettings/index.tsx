import { Flex, IconButton, CogIcon, useModal } from '@kazamaswap/uikit'
import SettingsModal from 'views/Profile/components/Settings/SettingsModal'

type Props = {
  color?: string
  mr?: string
  mode?: string
}

const GlobalSettings = ({ color, mr = '8px', mode }: Props) => {
  const [onPresentSettingsModal] = useModal(<SettingsModal />)

  return (
    <Flex>
      <IconButton
        onClick={onPresentSettingsModal}
        variant="text"
        scale="sm"
        mr={mr}
        id={`open-settings-dialog-button-${mode}`}
      >
        <CogIcon height={24} width={24} color={color || 'textSubtle'} />
      </IconButton>
    </Flex>
  )
}

export default GlobalSettings
