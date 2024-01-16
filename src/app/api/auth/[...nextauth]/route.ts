import User, { UserType } from "@/lib/models/user.model";
import connectToDB from "@/lib/mongoose";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
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
            const userFromDb = await User.findOne({
                email: session.user?.email,
            });

            if (userFromDb) {
                session.user.id = userFromDb?._id.toString();
                session.user.role = userFromDb?.role;
            }

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
                        role: "Guest",
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
