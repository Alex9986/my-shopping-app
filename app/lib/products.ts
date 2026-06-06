export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "electronics" | "clothing" | "home" | "books";
};

export const products: Product[] = [
  // 电子产品
  {
    id: "e-001",
    name: "无线蓝牙耳机",
    description:
      "高品质降噪蓝牙耳机，续航 30 小时，支持快速充电，佩戴舒适。",
    price: 299,
    image: "https://picsum.photos/seed/earbuds/400/400",
    category: "electronics",
  },
  {
    id: "e-002",
    name: "智能手表 Pro",
    description:
      "健康监测、运动追踪、消息提醒，AMOLED 屏幕，IP68 防水等级。",
    price: 899,
    image: "https://picsum.photos/seed/smartwatch/400/400",
    category: "electronics",
  },
  {
    id: "e-003",
    name: "便携式蓝牙音箱",
    description:
      "360°环绕立体声，便携设计，20 小时续航，IPX7 防水。",
    price: 199,
    image: "https://picsum.photos/seed/speaker/400/400",
    category: "electronics",
  },
  {
    id: "e-004",
    name: "机械键盘 RGB",
    description:
      "Cherry MX 青轴，全键无冲，RGB 背光，铝合金面板。",
    price: 499,
    image: "https://picsum.photos/seed/keyboard/400/400",
    category: "electronics",
  },
  {
    id: "e-005",
    name: "USB-C 扩展坞",
    description:
      "12 合 1 多功能扩展坞，支持 4K 输出、千兆网口、SD 卡读取。",
    price: 259,
    image: "https://picsum.photos/seed/dock/400/400",
    category: "electronics",
  },
  // 服装
  {
    id: "c-001",
    name: "经典款纯棉 T 恤",
    description:
      "100% 有机棉，亲肤舒适，不易变形，多色可选。",
    price: 89,
    image: "https://picsum.photos/seed/tshirt/400/400",
    category: "clothing",
  },
  {
    id: "c-002",
    name: "修身牛仔裤",
    description:
      "弹力棉质牛仔面料，修身剪裁，经典五袋设计。",
    price: 259,
    image: "https://picsum.photos/seed/jeans/400/400",
    category: "clothing",
  },
  {
    id: "c-003",
    name: "连帽卫衣",
    description:
      "加绒内里，柔软保暖，宽松版型，适合秋冬穿搭。",
    price: 189,
    image: "https://picsum.photos/seed/hoodie/400/400",
    category: "clothing",
  },
  {
    id: "c-004",
    name: "休闲运动鞋",
    description:
      "轻质 EVA 中底，透气网面，防滑耐磨大底。",
    price: 349,
    image: "https://picsum.photos/seed/sneakers/400/400",
    category: "clothing",
  },
  {
    id: "c-005",
    name: "羊毛围巾",
    description:
      "100% 美利奴羊毛，柔软保暖，经典格纹设计。",
    price: 159,
    image: "https://picsum.photos/seed/scarf/400/400",
    category: "clothing",
  },
  // 家居
  {
    id: "h-001",
    name: "北欧风台灯",
    description:
      "极简设计，三档调光，柔和不刺眼，适合书桌床头。",
    price: 199,
    image: "https://picsum.photos/seed/lamp/400/400",
    category: "home",
  },
  {
    id: "h-002",
    name: "记忆棉枕头",
    description:
      "慢回弹记忆棉，颈椎支撑，透气面料，助眠好帮手。",
    price: 169,
    image: "https://picsum.photos/seed/pillow/400/400",
    category: "home",
  },
  {
    id: "h-003",
    name: "陶瓷餐具套装",
    description:
      "16 件套，高温烧制，安全健康，适合 4-6 人家庭。",
    price: 329,
    image: "https://picsum.photos/seed/dishes/400/400",
    category: "home",
  },
  {
    id: "h-004",
    name: "香薰加湿器",
    description:
      "超声波雾化，超静音，定时功能，可添加精油。",
    price: 149,
    image: "https://picsum.photos/seed/diffuser/400/400",
    category: "home",
  },
  {
    id: "h-005",
    name: "实木书架",
    description:
      "天然橡木打造，五层收纳，稳固耐用，清新自然风。",
    price: 599,
    image: "https://picsum.photos/seed/bookshelf/400/400",
    category: "home",
  },
  // 图书
  {
    id: "b-001",
    name: "JavaScript 高级程序设计",
    description:
      "全面讲解 JS 核心概念、DOM、事件、Ajax 等，前端开发必备。",
    price: 89,
    image: "https://picsum.photos/seed/jsbook/400/400",
    category: "books",
  },
  {
    id: "b-002",
    name: "深入理解计算机系统",
    description:
      "从程序员的视角看计算机系统，帮助你写出更好的代码。",
    price: 139,
    image: "https://picsum.photos/seed/csbook/400/400",
    category: "books",
  },
  {
    id: "b-003",
    name: "设计模式：可复用面向对象软件的基础",
    description:
      "GoF 经典之作，23 种设计模式详解，软件工程师案头必备。",
    price: 79,
    image: "https://picsum.photos/seed/patterns/400/400",
    category: "books",
  },
  {
    id: "b-004",
    name: "人类简史",
    description:
      "从认知革命到科学革命，一部宏大的人类历史叙事。",
    price: 68,
    image: "https://picsum.photos/seed/history/400/400",
    category: "books",
  },
  {
    id: "b-005",
    name: "三体全集",
    description:
      "刘慈欣科幻巨著，雨果奖获奖作品，中国科幻文学里程碑。",
    price: 99,
    image: "https://picsum.photos/seed/threebody/400/400",
    category: "books",
  },
];

export const categories = [
  { key: "all", label: "全部" },
  { key: "electronics", label: "电子产品" },
  { key: "clothing", label: "服装" },
  { key: "home", label: "家居" },
  { key: "books", label: "图书" },
] as const;

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(
  category: string
): Product[] {
  if (category === "all" || !category) return products;
  return products.filter((p) => p.category === category);
}
