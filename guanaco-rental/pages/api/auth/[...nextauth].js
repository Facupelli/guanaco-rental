import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { getUniqueUser } from "../../../utils/fetch_users";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  // callbacks: {
  //   async signIn({ user }) {
  //     console.log("CALLBACK", user);
  //     const userData = await getUniqueUser(user.email);
  //     if (!userData.petitionSent) {
  //       return "/newClient";
  //     }
  //   },
  // },
};

export default NextAuth(authOptions);
