import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { darkTheme, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { polygon, mainnet } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const localChain = {
    id: Number(process.env.NEXT_PUBLIC_CHAIN_ID), // Conversão explícita para número
    name: 'Ganache',
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: { http: [process.env.NEXT_PUBLIC_RPC_URL as string] },
    },
};


const config = getDefaultConfig({
    appName: 'Empresa Verde',
    chains: [localChain, polygon, mainnet,],
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_KEY as string,
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