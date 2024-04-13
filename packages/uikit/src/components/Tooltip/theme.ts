import { kazamaDarkColors, kazamaLightColors } from "../../theme/colors";
import { vars } from "../../css/vars.css";
import { TooltipTheme } from "./types";

export const light: TooltipTheme = {
  background: kazamaLightColors.backgroundAlt,
  text: kazamaLightColors.text,
  boxShadow: vars.shadows.tooltip,
};

export const dark: TooltipTheme = {
  background: kazamaDarkColors.backgroundAlt,
  text: kazamaDarkColors.text,
  boxShadow: vars.shadows.tooltip,
};
