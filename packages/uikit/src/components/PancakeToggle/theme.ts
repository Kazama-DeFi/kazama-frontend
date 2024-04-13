import { kazamaDarkColors, kazamaLightColors } from "../../theme/colors";
import { PancakeToggleTheme } from "./types";

export const light: PancakeToggleTheme = {
  handleBackground: kazamaLightColors.backgroundAlt,
  handleShadow: kazamaLightColors.textDisabled,
};

export const dark: PancakeToggleTheme = {
  handleBackground: kazamaDarkColors.backgroundAlt,
  handleShadow: kazamaDarkColors.textDisabled,
};
