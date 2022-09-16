import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      console.log("USERLOOGGED", session);

      const data = JSON.stringify({
        email: session.user.email,
        name: session.user.name,
      });

      const response = await fetch(
        process.env.NODE_ENV === "production"
          ? `https://guanaco-rental-production.up.railway.app/log`
          : "http://localhost:3001/log",
        {
          method: "POST",
          body: data,
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const userLogged = await response.json();

      console.log("USERLOOGGED", userLogged);

      session.user.role = userLogged.role;
      session.user.petitionSent = userLogged.petitionSent;

      if (userLogged.message === "Logged in successfully") return session;
    },
  },
};

export default NextAuth(authOptions);
