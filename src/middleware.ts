import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const rolePaths = {
  user: "/home",
  owner: "/owner",
  admin: "/admin",
};

const publicPath = "/";

async function getUserRole(request: NextRequest): Promise<string | null> {
  const token = request.cookies.get("accessToken")?.value;
  if (!token) {
    return null;
  }

  try {
    const secret = new TextEncoder().encode(
      "f6d9b78fc5a897d7aef7bc99b90ad8b6cbab49a4c1a01d2b8531c23a2b034fdc"
    );
    const { payload } = await jwtVerify(token, secret);
    return payload.role as string | null;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}
//hello
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = await getUserRole(request);

  if (pathname === publicPath) {
    if (!role) {
      return NextResponse.next();
    }
    const redirectPath =
      rolePaths[role as keyof typeof rolePaths] || publicPath;
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  if (!role) {
    return NextResponse.redirect(new URL(publicPath, request.url));
  }

  const allowedPath = rolePaths[role as keyof typeof rolePaths];
  if (pathname.startsWith(allowedPath)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(allowedPath, request.url));
}

export const config = {
  matcher: ["/home/:path*", "/owner/:path*", "/admin/:path*", "/"],
};
