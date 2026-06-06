"use client";

import { useState, useCallback } from "react";
import { useCart } from "@/app/ui/cart-provider";
import { addToCart as serverAddToCart } from "@/app/actions/cart";

export function AddToCartButton({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const { addToCart, refreshCart, isLoggedIn } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAdd = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (isLoggedIn) {
        await serverAddToCart(productId, 1);
        // 即时更新购物车数量，无需整页刷新
        await refreshCart();
      } else {
        addToCart(productId, 1);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [productId, isLoggedIn, loading, addToCart, refreshCart]);

  return (
    <button
      onClick={handleAdd}
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-6
                 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700
                 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>
      {loading ? "添加中..." : "加入购物车"}
    </button>
  );
}
