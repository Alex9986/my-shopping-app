"use server";

import bcrypt from "bcryptjs";
import { SignupFormSchema, LoginFormSchema, type FormState } from "@/app/lib/definitions";
import { createSession, deleteSession } from "@/app/lib/session";
import db from "@/app/lib/db";

export async function signup(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  // 检查邮箱是否已注册
  const existing = db
    .prepare("SELECT id FROM users WHERE email = ?")
    .get(email);

  if (existing) {
    return {
      errors: { email: ["该邮箱已被注册"] },
    };
  }

  // 哈希密码并创建用户
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = db
    .prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)")
    .run(name, email, hashedPassword);

  // 创建会话
  await createSession(Number(result.lastInsertRowid));

  return { success: true };
}

export async function login(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  // 查找用户
  const user = db
    .prepare("SELECT id, password_hash FROM users WHERE email = ?")
    .get(email) as { id: number; password_hash: string } | undefined;

  if (!user) {
    return {
      errors: { email: ["邮箱或密码错误"] },
    };
  }

  // 验证密码
  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatch) {
    return {
      errors: { email: ["邮箱或密码错误"] },
    };
  }

  // 创建会话
  await createSession(user.id);

  return { success: true };
}

export async function logout() {
  await deleteSession();
}
