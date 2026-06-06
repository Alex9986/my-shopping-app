import type { Metadata } from "next";
import { products, categories, getProductsByCategory } from "@/app/lib/products";
import { ProductCard } from "@/app/ui/product-card";

export const metadata: Metadata = {
  title: "Shopping App - 发现好物",
  description: "一站式购物平台，电子产品、服装、家居、图书应有尽有。",
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const filteredProducts = getProductsByCategory(category || "all");

  return (
    <div className="flex flex-col gap-8 py-8">
      {/* 分类筛选 */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = (category || "all") === cat.key;
          const href = cat.key === "all" ? "/" : `/?category=${cat.key}`;
          return (
            <a
              key={cat.key}
              href={href}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors
                ${isActive
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                }`}
            >
              {cat.label}
            </a>
          );
        })}
      </div>

      {/* 商品列表 */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="py-16 text-center text-zinc-500">暂无商品</p>
      )}
    </div>
  );
}
