import { Button } from '@kazamaswap/uikit'
import { NextLinkFromReactRouter } from '@kazamaswap/widgets-internal'

import { ContextApi } from '@kazamaswap/localization'
import { UserStatusEnum } from 'views/PancakeSquad/types'

type ActivateProfileButtonProps = {
  t: ContextApi['t']
  userStatus: UserStatusEnum
}

const ActivateProfileButton: React.FC<React.PropsWithChildren<ActivateProfileButtonProps>> = ({ t, userStatus }) => (
  <>
    {(userStatus === UserStatusEnum.NO_PROFILE || userStatus === UserStatusEnum.UNCONNECTED) && (
      <Button as={NextLinkFromReactRouter} to="/create-profile" mr="4px">
        {t('Activate Profile')}
      </Button>
    )}
  </>
)

export default ActivateProfileButton
