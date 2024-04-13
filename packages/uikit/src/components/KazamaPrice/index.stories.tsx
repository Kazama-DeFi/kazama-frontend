import React from 'react';

import { Flex } from '../Box';
import { KazamaPrice, KazamaPriceProps } from './';

export default {
  title: "Components/KazamaPrice",
  component: KazamaPrice,
};

const Template: React.FC<React.PropsWithChildren<KazamaPriceProps>> = ({ ...args }) => {
  return (
    <Flex p="10px">
      <KazamaPrice {...args} />
    </Flex>
  );
};

export const Default = Template.bind({});
Default.args = {
  cakePriceUsd: 20.0,
};
