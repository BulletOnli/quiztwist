import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

//todo This middleware checks the auth and redirect to the sign-in page (default sign in page from next auth) there is no user found
//todo Note: Unfortuantely cant figure out how to customize callback url
// export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard", "/room/:path*"],
};
