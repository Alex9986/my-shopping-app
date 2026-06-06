"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getCartCount } from "@/app/actions/cart";

type GuestCartItem = {
  productId: string;
  quantity: number;
};

type CartContextType = {
  cartCount: number;
  cartItems: GuestCartItem[];
  isLoggedIn: boolean;
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "guest_cart";

function getGuestCart(): GuestCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveGuestCart(items: GuestCartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function CartProvider({
  children,
  isLoggedIn: initialLoggedIn,
  initialCount = 0,
}: {
  children: React.ReactNode;
  isLoggedIn: boolean;
  initialCount?: number;
}) {
  const [cartItems, setCartItems] = useState<GuestCartItem[]>([]);
  const [cartCount, setCartCount] = useState(initialCount);
  const [isLoggedIn] = useState(initialLoggedIn);

  // Initialize guest cart from localStorage
  useEffect(() => {
    if (!isLoggedIn) {
      const items = getGuestCart();
      setCartItems(items);
      setCartCount(items.reduce((sum, item) => sum + item.quantity, 0));
    }
  }, [isLoggedIn]);

  const addToCart = useCallback(
    (productId: string, quantity: number) => {
      if (isLoggedIn) return; // Server action handles it

      setCartItems((prev) => {
        const existing = prev.find((i) => i.productId === productId);
        let next: GuestCartItem[];
        if (existing) {
          next = prev.map((i) =>
            i.productId === productId
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        } else {
          next = [...prev, { productId, quantity }];
        }
        saveGuestCart(next);
        return next;
      });
      setCartCount((c) => c + quantity);
    },
    [isLoggedIn]
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      if (isLoggedIn) return; // Server action handles it

      setCartItems((prev) => {
        const item = prev.find((i) => i.productId === productId);
        const next = prev.filter((i) => i.productId !== productId);
        saveGuestCart(next);
        if (item) {
          setCartCount((c) => c - item.quantity);
        }
        return next;
      });
    },
    [isLoggedIn]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (isLoggedIn) return;

      setCartItems((prev) => {
        let next: GuestCartItem[];
        if (quantity <= 0) {
          next = prev.filter((i) => i.productId !== productId);
        } else {
          next = prev.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          );
        }
        saveGuestCart(next);
        return next;
      });

      setCartCount((c) => {
        const item = cartItems.find((i) => i.productId === productId);
        if (!item) return c;
        return c - item.quantity + quantity;
      });
    },
    [isLoggedIn, cartItems]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
    setCartCount(0);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const refreshCart = useCallback(async () => {
    if (isLoggedIn) {
      try {
        const count = await getCartCount();
        setCartCount(count);
      } catch {
        // ignore
      }
    }
  }, [isLoggedIn]);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        cartItems,
        isLoggedIn,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
