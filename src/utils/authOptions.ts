import User from "@/lib/models/user.model";
import connectToDB from "@/lib/mongoose";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import environments from "./environments";

const authOptions: NextAuthOptions = {
  secret: environments.NEXTAUTH_SECRET!,
  providers: [
    GoogleProvider({
      clientId: environments.GOOGLE_ID!,
      clientSecret: environments.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      await connectToDB();
      const userFromDb = await User.findOne({
        email: session.user?.email,
      }).lean();

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
        const isUserExist = await User.findOne({ email: user?.email }).lean();

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
