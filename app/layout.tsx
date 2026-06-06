import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StarryBackground from "@/app/ui/starry-background";
import { Header } from "@/app/ui/header";
import { CartProvider } from "@/app/ui/cart-provider";
import { getSessionUser } from "@/app/lib/dal";
import { getCartCount } from "@/app/actions/cart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Shopping App - 发现好物",
    template: "%s - Shopping App",
  },
  description: "一站式购物平台，电子产品、服装、家居、图书应有尽有。",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSessionUser();
  let cartCount = 0;

  if (user) {
    try {
      cartCount = await getCartCount();
    } catch {
      // ignore
    }
  }

  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="relative min-h-full bg-zinc-950 text-zinc-100 antialiased">
        <StarryBackground />
        <div className="relative z-10">
          <CartProvider isLoggedIn={!!user} initialCount={cartCount}>
            <Header />
            <main className="mx-auto max-w-6xl px-4">{children}</main>
          </CartProvider>
        </div>
      </body>
    </html>
  );
}
