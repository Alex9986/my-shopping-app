import Database from "better-sqlite3";
import path from "path";
import { mkdirSync } from "fs";

const dataDir = path.join(process.cwd(), ".data");
mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, "shopping.db");
const db = new Database(dbPath);

// 性能优化：WAL 模式 + 外键约束
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// 自动建表
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, product_id)
  );
`);

export default db;
