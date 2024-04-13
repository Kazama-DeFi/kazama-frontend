import { kazamaDarkColors, kazamaLightColors } from "../../theme/colors";

export interface NavThemeType {
  background: string;
}

export const light: NavThemeType = {
  background: kazamaLightColors.backgroundAlt,
};

export const dark: NavThemeType = {
  background: kazamaDarkColors.backgroundAlt,
};
