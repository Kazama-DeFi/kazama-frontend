import React from 'react';
import Svg from '../Svg';
import { SvgProps } from '../types';

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => (
  <Svg viewBox="0 0 682.66669 682.66669" {...props}>
    <defs id="defs439">
      <clipPath clipPathUnits="userSpaceOnUse" id="clipPath453">
        <path d="M 0,512 H 512 V 0 H 0 Z" id="path451" />
      </clipPath>
    </defs>
    <mask id="custom">
      <rect id="bg" x="0" y="0" width="100%" height="100%" fill="white" />
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)" />
    </mask>
    <g mask="url(#custom)">
      <g id="g441" transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        <g id="g443" transform="translate(355.0234,323.0869)">
          <path
            d="m 0,0 -134.174,-134.174 -63.873,63.872"
            style={{ fill: 'none', stroke: '#fff', strokeWidth: 40, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 10, strokeDasharray: 'none', strokeOpacity: 1 }}
            id="path445"
          />
        </g>
        <g id="g447">
          <g id="g449" clipPath="url(#clipPath453)">
            <g id="g455" transform="translate(492,256)">
              <path
                d="m 0,0 c 0,-130.339 -105.661,-236 -236,-236 -130.339,0 -236,105.661 -236,236 0,130.339 105.661,236 236,236 C -105.661,236 0,130.339 0,0 Z"
                style={{ fill: 'none', stroke: '#fff', strokeWidth: 40, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 10, strokeDasharray: 'none', strokeOpacity: 1 }}
                id="path457"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </Svg>
);

export default Icon;