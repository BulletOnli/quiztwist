import NextAuth from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

export type NextAuthUser = {
  name: string;
  email: string;
  image: string;
  id: string;
  role: string;
  subscription: string;
};

declare module "next-auth" {
  interface Session {
    user: NextAuthUser;
    accessToken: string;
  }
}
