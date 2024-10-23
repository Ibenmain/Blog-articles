import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import db from "@/lib/db";

interface User {
    id: string;
    email: string;
    username: string | null;
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
                    console.log("No user found with this email");
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
    pages: {
        signIn: '/auth/sign-in',
    },
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
        async session({ session, token }) {
            if (token) {
                session.user!.id = token.id!;
            }
            return session;
        },
    },
});
