import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "@/app/lib/session";
import db from "@/app/lib/db";
import type { User } from "@/app/lib/definitions";

type UserRow = {
  id: number;
  name: string;
  email: string;
};

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  return { isAuth: true, userId: session.userId };
});

export const getSessionUser = cache(async (): Promise<User | null> => {
  try {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    if (!session?.userId) {
      return null;
    }

    const row = db
      .prepare("SELECT id, name, email FROM users WHERE id = ?")
      .get(session.userId) as UserRow | undefined;

    return row || null;
  } catch {
    return null;
  }
});

export async function getUserById(userId: number): Promise<User | null> {
  const row = db
    .prepare("SELECT id, name, email FROM users WHERE id = ?")
    .get(userId) as UserRow | undefined;
  return row || null;
}
