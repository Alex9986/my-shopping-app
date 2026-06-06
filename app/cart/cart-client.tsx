"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/app/ui/cart-provider";
import { CartItem } from "@/app/ui/cart-item";
import type { CartItemWithProduct } from "@/app/actions/cart";
import { mergeCart, getCartItems } from "@/app/actions/cart";
import type { User } from "@/app/lib/definitions";
import { getProductById } from "@/app/lib/products";

export function CartClient({
  user,
  initialCartItems,
}: {
  user: User | null;
  initialCartItems: CartItemWithProduct[];
}) {
  const router = useRouter();
  const { cartItems: guestItems, clearCart } = useCart();
  const [serverItems, setServerItems] = useState(initialCartItems);

  // Sync server data when the prop changes (after router.refresh)
  useEffect(() => {
    setServerItems(initialCartItems);
  }, [initialCartItems]);

  // Merge guest cart on mount if logged in
  useEffect(() => {
    if (user && guestItems.length > 0) {
      const merge = async () => {
        await mergeCart(guestItems);
        clearCart();
        const items = await getCartItems();
        setServerItems(items);
        router.refresh();
      };
      merge();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const refreshServerItems = useCallback(async () => {
    const items = await getCartItems();
    setServerItems(items);
    router.refresh();
  }, [router]);

  // Logged-in user: show server cart
  if (user) {
    const total = serverItems.reduce(
      (sum, item) => sum + (item.product?.price || 0) * item.quantity,
      0
    );

    return (
      <div className="py-8">
        <h1 className="mb-8 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          我的购物车
        </h1>

        {serverItems.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="h-16 w-16 text-zinc-300 dark:text-zinc-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <p className="text-zinc-500">购物车是空的</p>
            <Link
              href="/"
              className="text-sm font-medium text-zinc-900 underline dark:text-zinc-100"
            >
              去逛逛
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {serverItems.map((item) => (
              <CartItem
                key={item.productId}
                productId={item.productId}
                product={item.product}
                quantity={item.quantity}
                isLoggedIn
                onCartChange={refreshServerItems}
              />
            ))}

            <div className="mt-4 flex items-center justify-between rounded-lg border border-zinc-200 p-4
                            dark:border-zinc-700">
              <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                合计：¥{total}
              </span>
              <span className="text-sm text-zinc-500">
                ({serverItems.length} 件商品)
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Guest user: show local cart
  const guestCartWithProducts = guestItems
    .map((item) => ({
      ...item,
      product: getProductById(item.productId) || null,
    }))
    .filter((item) => item.product !== null);

  const guestTotal = guestCartWithProducts.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <div className="py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          我的购物车
        </h1>
        <p className="text-sm text-zinc-500">
          <Link href="/login" className="underline hover:text-zinc-900">
            登录
          </Link>{" "}
          后同步购物车到云端
        </p>
      </div>

      {guestCartWithProducts.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="h-16 w-16 text-zinc-300 dark:text-zinc-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          <p className="text-zinc-500">购物车是空的</p>
          <Link
            href="/"
            className="text-sm font-medium text-zinc-900 underline dark:text-zinc-100"
          >
            去逛逛
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {guestCartWithProducts.map((item) => (
            <CartItem
              key={item.productId}
              productId={item.productId}
              product={item.product}
              quantity={item.quantity}
              isLoggedIn={false}
            />
          ))}

          <div className="mt-4 flex items-center justify-between rounded-lg border border-zinc-200 p-4
                          dark:border-zinc-700">
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              合计：¥{guestTotal}
            </span>
            <span className="text-sm text-zinc-500">
              ({guestItems.length} 件商品)
            </span>
          </div>

          <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            您当前未登录，购物车数据存储在本地浏览器中。请{" "}
            <Link href="/login" className="font-medium underline">
              登录
            </Link>{" "}
            以同步购物车到云端。
          </div>
        </div>
      )}
    </div>
  );
}
