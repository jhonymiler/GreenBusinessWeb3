// src/components/ConnectWallet/index.tsx

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSignMessage, useAccount } from "wagmi";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ConnectWallet() {
    const { data: session } = useSession();
    const { signMessageAsync } = useSignMessage();
    const { isConnected, address, isDisconnected } = useAccount();

    useEffect(() => {
        const handleLogin = async () => {
            if (!isConnected || session) return;

            try {
                const message = "Autenticar-se com a carteira para acessar a plataforma."; // Message to sign
                const signature = await signMessageAsync({ message });

                // Log in using NextAuth with signature
                const result = await signIn("credentials", {
                    message,
                    signature,
                    address,
                    redirect: false,
                });

                console.log("SignIn result:", result);
            } catch (error) {
                console.error("Erro na assinatura:", error);
            }
        };

        handleLogin(); // Trigger authentication when the user connects the wallet
    }, [isConnected, signMessageAsync, session, address]);

    useEffect(() => {
        const logout = async () => {
            if (isDisconnected && session) {
                await signOut();
            }
        }
        logout();
    }, [isConnected, session, isDisconnected]);

    return (
        <div>
            <ConnectButton chainStatus="icon" />
        </div>
    );
}
