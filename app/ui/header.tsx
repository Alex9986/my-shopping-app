import Link from "next/link";
import { getSessionUser } from "@/app/lib/dal";
import { CartClientHeader } from "./cart-client-header";
import { LogoutForm } from "./logout-form";

export async function Header() {
  const user = await getSessionUser();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur
                       dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-zinc-900 dark:text-zinc-100"
        >
          🛒 Shopping
        </Link>

        {/* 右侧 */}
        <div className="flex items-center gap-4">
          {/* 购物车 — 数量从 CartProvider Context 实时读取 */}
          <CartClientHeader />

          {/* 用户菜单 */}
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400
                           dark:hover:text-zinc-100"
              >
                {user.name}
              </Link>
              <LogoutForm />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400
                           dark:hover:text-zinc-100"
              >
                登录
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white
                           transition-colors hover:bg-zinc-700 dark:bg-zinc-100
                           dark:text-zinc-900 dark:hover:bg-zinc-300"
              >
                注册
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
