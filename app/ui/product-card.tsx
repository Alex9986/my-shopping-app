import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/app/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const categoryLabels: Record<string, string> = {
    electronics: "电子产品",
    clothing: "服装",
    home: "家居",
    books: "图书",
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm
                 transition-shadow hover:shadow-md dark:bg-zinc-900"
    >
      <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-1 p-4">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          {categoryLabels[product.category]}
        </span>
        <h3 className="text-sm font-semibold text-zinc-900 line-clamp-1 dark:text-zinc-100">
          {product.name}
        </h3>
        <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          ¥{product.price}
        </p>
      </div>
    </Link>
  );
}
