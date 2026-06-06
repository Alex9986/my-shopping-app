import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/app/lib/products";
import { AddToCartButton } from "@/app/ui/add-to-cart-button";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "商品未找到" };
  return {
    title: `${product.name} - Shopping App`,
    description: product.description,
  };
}

const categoryLabels: Record<string, string> = {
  electronics: "电子产品",
  clothing: "服装",
  home: "家居",
  books: "图书",
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="py-8">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-zinc-500 hover:underline dark:text-zinc-400"
      >
        ← 返回商品列表
      </Link>
      <div className="grid gap-8 md:grid-cols-2">
        {/* 商品图片 */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* 商品信息 */}
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {categoryLabels[product.category]}
          </span>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {product.name}
          </h1>
          <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            ¥{product.price}
          </p>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {product.description}
          </p>

          {/* Add to Cart Button */}
          <div className="mt-4">
            <AddToCartButton
              productId={product.id}
              productName={product.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
