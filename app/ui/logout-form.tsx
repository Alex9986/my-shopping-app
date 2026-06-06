"use client";

import { logout } from "@/app/actions/auth";

export function LogoutForm() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="text-sm text-zinc-400 hover:text-red-600 transition-colors"
      >
        退出
      </button>
    </form>
  );
}
