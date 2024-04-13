import * as React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 512 512" {...props}>
<path d="m98 190.06 139.78 163.12a24 24 0 0 0 36.44 0l139.78-163.12c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z"/>
    </Svg>
  );
};

export default Icon;
