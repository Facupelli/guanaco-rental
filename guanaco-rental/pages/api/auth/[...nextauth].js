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
    callbacks: {
      async redirect({ url, baseUrl }) {
        // Allows relative callback URLs
        if (url.startsWith("/")) return `${baseUrl}${url}`;
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) return url;
        return baseUrl;
      },
    },
    async session({ session }) {
      const data = JSON.stringify({
        email: session.user.email,
        name: session.user.name,
      });

      const response = await fetch(
        process.env.NODE_ENV === "production"
          ? `https://www.guanacorental.shop/rentalapi/login`
          : "http://localhost:3001/login",
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

      session.user.role = userLogged.role;
      session.user.petitionSent = userLogged.petitionSent;
      session.user.token = userLogged.token;

      if (userLogged.message === "Logged in successfully") return session;
    },
  },
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOptions);
