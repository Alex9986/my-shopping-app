import type { CartItemWithProduct } from "@/app/actions/cart";
import { getCartItems } from "@/app/actions/cart";
import { getSessionUser } from "@/app/lib/dal";
import { CartClient } from "./cart-client";

export default async function CartPage() {
  const user = await getSessionUser();
  let cartItems: CartItemWithProduct[];

  if (user) {
    cartItems = await getCartItems();
  } else {
    cartItems = [];
  }

  return <CartClient user={user} initialCartItems={cartItems} />;
}
