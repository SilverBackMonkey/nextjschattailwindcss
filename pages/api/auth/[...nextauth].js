import NextAuth from "next-auth";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from "../../../client";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import CredentialProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.JWT_SECRET,
  providers: [
    // OAuth authentication providers
    /*
    CredentialProvider({
      name: "Email",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "Enter your Email",
        },
        // password:{label: 'password', type:'password'}
      },
      authorize: (credentials) => {
        if (
          credentials.username === "email" &&
          credentials.password === "test"
        ) {
          return {
            id: 2,
            name: "email",
            email: "test@test.com",
          };
        }
        return null;
      },
    }),
    */
    
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }),
   
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.JWT_SECRET,
  theme: {
    logo: "https://afc-redux.vercel.app/logo.png", // Absolute URL to image
  },
};

export default NextAuth(authOptions);
