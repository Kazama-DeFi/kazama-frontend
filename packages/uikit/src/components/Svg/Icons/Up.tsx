import * as React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 512 512" {...props}>
<path clip-rule="evenodd" d="m466.789 512v-143.559l-210.789-154.306-210.789 154.306v143.559l210.789-154.306zm0-214.135-210.789-154.306-210.789 154.306v-143.559l210.789-154.306 210.789 154.306z" fill-rule="evenodd"/>
    </Svg>
  );
};

export default Icon;
