import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

//todo This middleware checks the auth and redirect to the sign-in page there is no user found
//todo Note: Unfortuantely cant figure out how to customize callback url
// export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const pathname = request.nextUrl.pathname;

    if (!token) {
        // If no token and pathname is not equal to auth routes, redirect the user to login page
        if (pathname !== "/login" && pathname !== "/register") {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    } else {
        switch (pathname) {
            case "/login":
                return NextResponse.redirect(
                    new URL("/dashboard", request.url)
                );
            case "/register":
                return NextResponse.redirect(
                    new URL("/dashboard", request.url)
                );
            default:
                break;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/s/:path*", "/dashboard", "/login", "/register"],
};
