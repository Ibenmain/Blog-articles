import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import db from "@/lib/db";
import { JWT, Session, User } from "../../../../next-auth";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
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
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT; user: User }) {
            if (user) {
                token.id = user.id!;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.name = token.username;
                session.user.email = token.email;
            }
            return session;
        },
    },
});
