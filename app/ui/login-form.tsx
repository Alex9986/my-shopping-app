"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/actions/auth";
import { mergeCart } from "@/app/actions/cart";
import { useCart } from "@/app/ui/cart-provider";
import Link from "next/link";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  const router = useRouter();
  const { clearCart } = useCart();

  // 登录成功后合并购物车
  useEffect(() => {
    if (state?.success) {
      const mergeAndRedirect = async () => {
        try {
          const raw = localStorage.getItem("guest_cart");
          if (raw) {
            const guestItems = JSON.parse(raw);
            if (guestItems.length > 0) {
              await mergeCart(guestItems);
            }
          }
        } catch {
          // ignore
        }
        localStorage.removeItem("guest_cart");
        clearCart();
        router.push("/");
        router.refresh();
      };
      mergeAndRedirect();
    }
  }, [state?.success]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <form action={action} className="flex flex-col gap-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          邮箱
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="请输入邮箱"
          className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm
                     focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500
                     dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
        />
        {state?.errors?.email && (
          <p className="mt-1 text-sm text-red-600">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          密码
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="请输入密码"
          className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm
                     focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500
                     dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
        />
        {state?.errors?.password && (
          <p className="mt-1 text-sm text-red-600">{state.errors.password[0]}</p>
        )}
      </div>

      {state?.message && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white
                   transition-colors hover:bg-zinc-700 disabled:opacity-50
                   dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {pending ? "登录中..." : "登录"}
      </button>

      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        还没有账户？{" "}
        <Link
          href="/signup"
          className="font-medium text-zinc-900 underline dark:text-zinc-100"
        >
          立即注册
        </Link>
      </p>
    </form>
  );
}
