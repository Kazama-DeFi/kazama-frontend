import { useMatchBreakpoints } from '@kazamaswap/uikit'

import {
  ControlsContainer,
  ControlGroup,
  LiveSwitch,
  // ViewSwitch,
  StakeOnlyToggle,
  SortFilter,
  SearchFilter,
} from '../components'

export function Controls() {
  const { isDesktop } = useMatchBreakpoints()

  const controls = isDesktop ? (
    <ControlsContainer>
      <ControlGroup>
        {/* <ViewSwitch /> */}
        <StakeOnlyToggle />
        <LiveSwitch />
      </ControlGroup>
      <ControlGroup justifyContent="flex-end">
        <SortFilter />
        <SearchFilter />
      </ControlGroup>
    </ControlsContainer>
  ) : (
    <ControlsContainer justifyContent="flex-start" flexDirection="column">
      <ControlGroup>
        {/* <ViewSwitch /> */}
        <StakeOnlyToggle />
      </ControlGroup>
      <ControlGroup justifyContent="flex-start">
        <LiveSwitch />
      </ControlGroup>
      <ControlGroup>
        <SortFilter />
        <SearchFilter />
      </ControlGroup>
    </ControlsContainer>
  )

  return controls
}
