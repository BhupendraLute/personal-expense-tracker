import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/models/User";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectToDatabase();
        const existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          await UserModel.create({
            email: user.email,
            name: user.name,
            avatar: user.image,
            provider: "google",
          });
        }
      }
      return true;
    },
    async session({ session }) {
      if (session.user) {
        await connectToDatabase();
        const dbUser = await UserModel.findOne({ email: session.user.email });
        if (dbUser) {
          // @ts-ignore
          session.user.id = dbUser._id.toString();
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET || process.env.JWT_SECRET,
};
