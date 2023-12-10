import NextAuth from "next-auth";

export type NextAuthUser = {
    name: string;
    email: string;
    image: string;
    id: string;
    role: string;
};

declare module "next-auth" {
    interface Session {
        user: NextAuthUser;
    }
}
