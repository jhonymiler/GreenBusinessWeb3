import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
    appName: 'Empresa Verde',
    chains: [polygon],
    projectId: 'empresa-verde',
});

type RanbowKitProps = {
    children: React.ReactNode;
};

export default function RainbowKit({ children }: RanbowKitProps) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={new QueryClient()}>
                <RainbowKitProvider >
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}