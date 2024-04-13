import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2a2 2 0 0 1 2 2v15a2 2 0 1 1-4 0V4a2 2 0 0 1 2-2zM5 8a2 2 0 0 1 2 2v9a2 2 0 1 1-4 0v-9a2 2 0 0 1 2-2zm16 2a2 2 0 1 0-4 0v9a2 2 0 1 0 4 0z"
      />
    </g>
  </Svg>
);

export default Icon;