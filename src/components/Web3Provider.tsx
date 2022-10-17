import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import React, { FC, ReactNode } from 'react';
import { WagmiConfig, createClient } from 'wagmi';

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;

const client = createClient(
  getDefaultClient({
    appName: 'hexcolor.club',
    alchemyId,
  })
);

interface Props {
  children?: ReactNode;
}

const Web3Provider = ({ children }: Props) => (
  <WagmiConfig client={client}>
    <ConnectKitProvider>{children}</ConnectKitProvider>
  </WagmiConfig>
);

export default Web3Provider;
