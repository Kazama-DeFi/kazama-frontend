import React from 'react';

import Svg from '../Svg';
import { SvgProps } from '../types';

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 29 29" {...props}>
<path       fillRule="evenodd"
      stroke="none"
      fillOpacity="1" d="m18 2c2.206 0 4 1.794 4 4v12c0 2.206-1.794 4-4 4h-12c-2.206 0-4-1.794-4-4v-12c0-2.206 1.794-4 4-4zm0-2h-12c-3.314 0-6 2.686-6 6v12c0 3.314 2.686 6 6 6h12c3.314 0 6-2.686 6-6v-12c0-3.314-2.686-6-6-6z"/><path d="m12 18c-.552 0-1-.447-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10c0 .553-.448 1-1 1z"/><path d="m6 12c0-.552.447-1 1-1h10c.552 0 1 .448 1 1s-.448 1-1 1h-10c-.553 0-1-.448-1-1z"/>
    </Svg>
  );
};

export default Icon;
