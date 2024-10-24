// middleware.ts
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

console.log('secret', secret);

export async function middleware(req: NextApiRequest) {
    const token = await getToken({ req, secret });
    if (!token) {

        const signInUrl = new URL("/", req.url);
        signInUrl.searchParams.set("callbackUrl", req.url!);
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/articles/:path*"],
};
