"use server";

import { verifySession } from "@/app/lib/dal";
import db from "@/app/lib/db";
import { getProductById, type Product } from "@/app/lib/products";

export type CartItemWithProduct = {
  id: number;
  userId: number;
  productId: string;
  quantity: number;
  product: Product | null;
};

type CartRow = {
  id: number;
  user_id: number;
  product_id: string;
  quantity: number;
};

export async function getCartItems(): Promise<CartItemWithProduct[]> {
  const { userId } = await verifySession();

  const rows = db
    .prepare("SELECT id, user_id, product_id, quantity FROM cart_items WHERE user_id = ?")
    .all(userId) as CartRow[];

  return rows.map((row) => ({
    id: row.id,
    userId: row.user_id,
    productId: row.product_id,
    quantity: row.quantity,
    product: getProductById(row.product_id) || null,
  }));
}

export async function addToCart(productId: string, quantity: number = 1) {
  const { userId } = await verifySession();

  db.prepare(
    `INSERT INTO cart_items (user_id, product_id, quantity)
     VALUES (?, ?, ?)
     ON CONFLICT(user_id, product_id) DO UPDATE SET quantity = quantity + excluded.quantity`
  ).run(userId, productId, quantity);
}

export async function removeFromCart(productId: string) {
  const { userId } = await verifySession();

  db.prepare("DELETE FROM cart_items WHERE user_id = ? AND product_id = ?").run(
    userId,
    productId
  );
}

export async function updateCartQuantity(productId: string, quantity: number) {
  const { userId } = await verifySession();

  if (quantity <= 0) {
    db.prepare("DELETE FROM cart_items WHERE user_id = ? AND product_id = ?").run(
      userId,
      productId
    );
    return;
  }

  db.prepare(
    "UPDATE cart_items SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ? AND product_id = ?"
  ).run(quantity, userId, productId);
}

export async function mergeCart(
  items: { productId: string; quantity: number }[]
) {
  const { userId } = await verifySession();

  const stmt = db.prepare(
    `INSERT INTO cart_items (user_id, product_id, quantity)
     VALUES (?, ?, ?)
     ON CONFLICT(user_id, product_id) DO UPDATE SET quantity = quantity + excluded.quantity`
  );

  for (const item of items) {
    stmt.run(userId, item.productId, item.quantity);
  }
}

export async function getCartCount(): Promise<number> {
  try {
    const { userId } = await verifySession();

    const row = db
      .prepare("SELECT SUM(quantity) AS count FROM cart_items WHERE user_id = ?")
      .get(userId) as { count: number | null };
    return row?.count || 0;
  } catch {
    return 0;
  }
}
