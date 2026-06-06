"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/ui/cart-provider";
import { removeFromCart as serverRemove } from "@/app/actions/cart";
import { updateCartQuantity as serverUpdate } from "@/app/actions/cart";
import type { Product } from "@/app/lib/products";

type Props = {
  productId: string;
  product: Product | null;
  quantity: number;
  isLoggedIn: boolean;
  onCartChange?: () => void;
};

export function CartItem({
  productId,
  product,
  quantity,
  isLoggedIn,
  onCartChange,
}: Props) {
  const { removeFromCart, updateQuantity } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRemove = useCallback(async () => {
    setLoading(true);
    if (isLoggedIn) {
      await serverRemove(productId);
      onCartChange?.();
    } else {
      removeFromCart(productId);
      router.refresh();
    }
    setLoading(false);
  }, [productId, isLoggedIn, removeFromCart, onCartChange, router]);

  const handleQuantityChange = useCallback(async (newQty: number) => {
    if (newQty < 1) return;
    setLoading(true);
    if (isLoggedIn) {
      await serverUpdate(productId, newQty);
      onCartChange?.();
    } else {
      updateQuantity(productId, newQty);
      router.refresh();
    }
    setLoading(false);
  }, [productId, isLoggedIn, updateQuantity, onCartChange, router]);

  if (!product) {
    return (
      <div className="flex items-center gap-4 rounded-lg border border-zinc-200 p-4
                      dark:border-zinc-700">
        <p className="text-sm text-zinc-500">商品信息不可用</p>
      </div>
    );
  }

  const subtotal = product.price * quantity;

  return (
    <div
      className={`flex items-center gap-4 rounded-lg border border-zinc-200 p-4
                  transition-opacity dark:border-zinc-700 ${
                    loading ? "pointer-events-none opacity-50" : ""
                  }`}
    >
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {product.name}
        </h3>
        <p className="text-sm text-zinc-500">¥{product.price}</p>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= 1 || loading}
          className="flex h-7 w-7 items-center justify-center rounded border border-zinc-300
                     text-sm hover:bg-zinc-100 disabled:opacity-30
                     dark:border-zinc-600 dark:hover:bg-zinc-800"
        >
          -
        </button>
        <span className="w-8 text-center text-sm font-medium">{quantity}</span>
        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={loading}
          className="flex h-7 w-7 items-center justify-center rounded border border-zinc-300
                     text-sm hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-800"
        >
          +
        </button>
      </div>

      <span className="w-20 text-right text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        ¥{subtotal}
      </span>

      <button
        onClick={handleRemove}
        disabled={loading}
        className="flex-shrink-0 p-1 text-zinc-400 transition-colors hover:text-red-600 disabled:opacity-30"
        title="删除"
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
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
}
