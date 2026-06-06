import type { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "@/app/ui/signup-form";

export const metadata: Metadata = {
  title: "注册 - Shopping App",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-sm
                      dark:bg-zinc-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            创建账户
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            注册后即可享受完整购物体验
          </p>
        </div>
        <SignupForm />
        <p className="text-center text-sm text-zinc-500">
          <Link href="/" className="hover:underline">
            ← 返回首页
          </Link>
        </p>
      </div>
    </div>
  );
}
