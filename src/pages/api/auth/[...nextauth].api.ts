import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

interface User {
  id: string;
  name: string;
  birthDate: string;
  email: string;
  cell: string;
}

export const authOptions: NextAuthOptions = {

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {

        const res: any = await axios
          .post("https://handovenapi.onrender.com/user/login", {
            email: credentials?.email, 
            password: credentials?.password,
            headers: {
              "Content-Type": "application/json",
              "X-HandOven-Service": true,
              "X-HandOven-Family": "111111111111111111111111",
              "X-HandOven-User": "111111111111111111111111",
            },
          })
          console.log(res)
            return res
        },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope:
            "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ account }) {
      return true;
    },
  },
};

export default NextAuth(authOptions);
