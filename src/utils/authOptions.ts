import User from "@/lib/models/user.model";
import connectToDB from "@/lib/mongoose";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/navigation";

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
        session.user.subscription = userFromDb?.subscription;
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
          });
        }

        return true;
      } catch (error) {
        console.log("Error from auth options", error);
        return false;
      }
    },
  },
};

export default authOptions;
