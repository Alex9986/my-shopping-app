import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "姓名至少 2 个字符" })
    .trim(),
  email: z
    .string()
    .email({ message: "请输入有效的邮箱地址" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "密码至少 8 个字符" })
    .regex(/[a-zA-Z]/, { message: "需要包含至少一个字母" })
    .regex(/[0-9]/, { message: "需要包含至少一个数字" })
    .regex(/[^a-zA-Z0-9]/, { message: "需要包含至少一个特殊字符" })
    .trim(),
});

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "请输入有效的邮箱地址" })
    .trim(),
  password: z.string().min(1, { message: "请输入密码" }),
});

export type FormState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string;
  success?: boolean;
} | undefined;

export type User = {
  id: number;
  name: string;
  email: string;
};
