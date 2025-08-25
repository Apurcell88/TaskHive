import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// Specifyy which routes the middleware applies to
export const config = {
  matcher: ["/projects/:path*", "/tasks/:path*", "/api/:path*"],
};
