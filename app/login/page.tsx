import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/app/ui/login-form";

export const metadata: Metadata = {
  title: "登录 - Shopping App",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-sm
                      dark:bg-zinc-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            欢迎回来
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            登录您的账户继续购物
          </p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-zinc-500">
          <Link href="/" className="hover:underline">
            ← 返回首页
          </Link>
        </p>
      </div>
    </div>
  );
}
