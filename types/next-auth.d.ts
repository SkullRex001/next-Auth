import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    id: string;
    role: string;
    isTwoFactorEnabled  : boolean,
    isOAuth : boolean
  }

  interface User {
    id: string;
    role: string;
    isTwoFactorEnabled  : boolean,
    isOAuth : boolean
  }

}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    isTwoFactorEnabled  : boolean,
    isOAuth : boolean
  }
}


//??