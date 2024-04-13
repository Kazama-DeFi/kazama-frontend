import { tokens } from '@kazamaswap/uikit/tokens'
import { modeVars } from '@kazamaswap/uikit/css/vars.css'
import { createGlobalTheme } from '@vanilla-extract/css'

createGlobalTheme('[data-theme="light"]', modeVars, {
  colors: {
    ...tokens.colors.light,
    gradientKazamaStyle: 'linear-gradient(180deg, #F7F7F8 22.88%, #D6F2EB 99.79%, #2ED8A7 99.87%, #00A380 100%);',
  },
})

createGlobalTheme('[data-theme="dark"]', modeVars, {
  colors: {
    ...tokens.colors.dark,
    gradientKazamaStyle: 'linear-gradient(139.73deg, #2F4F60 0%, #323853 100%);',
  },
})
