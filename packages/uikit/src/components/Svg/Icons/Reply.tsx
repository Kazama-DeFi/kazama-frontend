import * as React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 32 32" {...props}>
<path d="m25.7 12.3-7.6-7.9c-.3-.3-.7-.4-1.1-.2s-.6.5-.6.9v3.2c-5.8.3-10.4 5.1-10.4 10.9 0 3.3 1.5 6.4 4.1 8.5.1.1.3.2.5.2s.3-.1.5-.2c.3-.2.3-.6.2-1-.5-.9-.8-1.9-.8-3 0-3.3 2.7-6 6-6v3.1c0 .4.3.8.6.9.4.2.8.1 1.1-.2l7.6-7.9c.3-.3.3-.9-.1-1.3z"/>
    </Svg>
  );
};

export default Icon;
