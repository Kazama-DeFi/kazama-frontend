import { kazamaDarkColors, kazamaLightColors } from "../../theme/colors";

export type ToggleTheme = {
  handleBackground: string;
};

export const light: ToggleTheme = {
  handleBackground: kazamaLightColors.backgroundAlt,
};

export const dark: ToggleTheme = {
  handleBackground: kazamaDarkColors.backgroundAlt,
};
