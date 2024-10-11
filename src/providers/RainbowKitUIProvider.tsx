import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { darkTheme, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { polygon, mainnet } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
    appName: 'Empresa Verde',
    chains: [polygon, mainnet],
    projectId: '35f812c4964ad150854e578fcb2792fb',
});

type RanbowKitProps = {
    children: React.ReactNode;
};

export default function RainbowKitUIProvider({ children }: RanbowKitProps) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={new QueryClient()}>
                <RainbowKitProvider theme={darkTheme()} >
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}