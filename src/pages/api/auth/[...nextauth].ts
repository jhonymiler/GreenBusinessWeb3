// src/pages/api/auth/[...nextauth].ts

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyMessage } from "viem";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Definindo a interface do usuário
interface CustomUser {
  id: string;
  name: string;
  address: string;
  isRegistered: boolean;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        address: {
          label: "Endereço da Carteira",
          type: "text",
          placeholder: "0x...",
        },
        message: {
          label: "Mensagem",
          type: "text",
          placeholder: "Por favor, assine esta mensagem para se autenticar.",
        },
        signature: {
          label: "Assinatura",
          type: "text",
          placeholder: "Assinatura da mensagem",
        },
      },
      async authorize(credentials) {
        const { address, message, signature } = credentials as {
          address: string;
          message: string;
          signature: string;
        };

        try {
          // Verifica se o endereço é válido usando expressão regular
          if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
            throw new Error("Endereço de carteira inválido.");
          }

          // Verifica a assinatura usando viem
          const signerAddress = await verifyMessage({
            message,
            address: address as `0x${string}`,
            signature: signature as `0x${string}`,
          });

          // Verifica se o endereço do signatário corresponde ao endereço fornecido
          if (!signerAddress) {
            throw new Error("Assinatura inválida.");
          }

          // Busca a empresa no banco de dados

           const business = await prisma.business.findFirst({
                where: {
                    hash: {
                        equals: address
                    }
                }
            });


          if (!business) {
            // Empresa não cadastrada
            return {
              id: address,
              name: `User_${address.substring(0, 6)}`,
              address: address,
              isRegistered: false,
            };
          }

          // Empresa cadastrada
          return {
            id: business.hash,
            name: business.companyName,
            address: business.hash,
            isRegistered: true,
          } as CustomUser;
        } catch (error) {
          console.error("Erro na autenticação:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token,user}) {
      if (user) {
        token.address = user.address;
        token.name = user.name;
        token.isRegistered = user.isRegistered;
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.address = token.address;
        session.user.name = token.name;
        session.user.isRegistered = token.isRegistered;

        if (!session.user.email) {
          delete session.user.email;
        }
        if (!session.user.image) {
          delete session.user.image;
        }
      }
      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET!, // Asserção não nula
};

export default NextAuth(authOptions);
