import NextAuth from "next-auth";
import {Session as authSession}  from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import db from "@/lib/db";
import { JWT as authJWT } from 'next-auth/jwt'

interface User {
    id: string;
    email: string;
    username: string | null;
}

export interface Session extends authSession {
    user?: {
      id?: string | null
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
  
  export interface JWT extends authJWT {
    id?: string
    username?: string
    email?: string
    password?: string
  }
  

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<User | null> {
                const user = await db.user.findUnique({
                    where: { email: credentials?.email },
                });

                if (!user) {
                    throw new Error("No user found with this email");
                }

                const isPasswordValid = await compare(credentials!.password, user.password);
                if (!isPasswordValid) {
                    throw new Error("Invalid password");
                }

                return { id: user.id.toString(), email: user.email, username: user.username };
            },
        }),
    ],
    // pages: {
    //     signIn: '/auth/signin',
    // },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id!;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: any }) {
            if (token) {
                session.user!.id = token.id!;
                session.user!.name = token.username!;
                session.user!.email = token.email!;

            }
            return session;
        },
    },
});
