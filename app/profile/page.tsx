import { getSessionUser } from "@/app/lib/dal";
import { LogoutForm } from "@/app/ui/logout-form";

export default async function ProfilePage() {
  const user = await getSessionUser();

  if (!user) return null;

  return (
    <div className="py-8">
      <h1 className="mb-8 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        个人中心
      </h1>
      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-500">姓名：</span>
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {user.name}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-500">邮箱：</span>
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {user.email}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-500">用户 ID：</span>
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {user.id}
            </span>
          </div>
        </div>
        <div className="mt-6 border-t border-zinc-200 pt-4 dark:border-zinc-700">
          <LogoutForm />
        </div>
      </div>
    </div>
  );
}
