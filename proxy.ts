import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";
import { cookies } from "next/headers";

// 需要登录才能访问的路由
const protectedRoutes = ["/cart", "/profile"];
// 已登录用户不应访问的路由
const publicOnlyRoutes = ["/login", "/signup"];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isPublicOnlyRoute = publicOnlyRoutes.some((route) => path.startsWith(route));

  // 从 cookie 解密会话
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  // 未登录用户访问受保护路由 → 重定向到登录
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 已登录用户访问登录/注册页 → 重定向到首页
  if (isPublicOnlyRoute && session?.userId) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

// Proxy 不应在以下路径运行
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
