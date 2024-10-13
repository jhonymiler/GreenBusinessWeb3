// src/types/next-auth.d.ts

import  { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** O endereço da carteira Ethereum do usuário */
      address: string;
      /** Indica se a empresa está registrada */
      isRegistered: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    /** O endereço da carteira Ethereum do usuário */
    address: string;
    /** Indica se a empresa está registrada */
    isRegistered: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** O endereço da carteira Ethereum do usuário */
    address: string;
    /** Indica se a empresa está registrada */
    isRegistered: boolean;
  }
}
