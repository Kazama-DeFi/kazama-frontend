import { vars } from "../../css/vars.css";
import { kazamaDarkColors, kazamaLightColors } from "../../theme/colors";
import { CardTheme } from "./types";

export const light: CardTheme = {
  background: kazamaLightColors.backgroundAlt,
  boxShadow: vars.shadows.level1,
  boxShadowActive: vars.shadows.active,
  boxShadowSuccess: vars.shadows.success,
  boxShadowWarning: vars.shadows.warning,
  cardHeaderBackground: {
    default: kazamaLightColors.gradientCardHeader,
    blue: kazamaLightColors.gradientBlue,
    bubblegum: kazamaLightColors.gradientKazamaStyle,
    violet: kazamaLightColors.gradientViolet,
  },
  dropShadow: "drop-shadow(0px 1px 4px rgba(25, 19, 38, 0.15))",
};

export const dark: CardTheme = {
  background: kazamaDarkColors.backgroundAlt,
  boxShadow: vars.shadows.level1,
  boxShadowActive: vars.shadows.active,
  boxShadowSuccess: vars.shadows.success,
  boxShadowWarning: vars.shadows.warning,
  cardHeaderBackground: {
    default: kazamaDarkColors.gradientCardHeader,
    blue: kazamaDarkColors.gradientBlue,
    bubblegum: kazamaLightColors.gradientKazamaStyle,
    violet: kazamaDarkColors.gradientViolet,
  },
  dropShadow: "drop-shadow(0px 1px 4px rgba(25, 19, 38, 0.15))",
};
