import User from "@/lib/models/user.model";
import connectToDB from "@/lib/mongoose";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/navigation";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET!,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],
    callbacks: {
        async session({ session }) {
            await connectToDB();
            const sessionUser = await User.findOne({
                email: session.user?.email,
            });
            session.user.id = sessionUser._id;

            // todo Checks if the user is in the db also check if they have a role, if not redirect to the onboarding page

            return session;
        },
        async signIn({ user }) {
            try {
                await connectToDB();
                const isUserExist = await User.findOne({ email: user?.email });

                if (!isUserExist) {
                    await User.create({
                        email: user?.email,
                        username: user?.name,
                        profilePic: user?.image,
                    });
                }

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
