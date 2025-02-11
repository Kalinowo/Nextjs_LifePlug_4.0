import { auth } from "@/auth";

export default async function ProfilePage() {
  const session = await auth();
  return (
    <div className="relative w-full">
      <div className="p-10 text-4xl text-textSecondary">
        登入狀態：{session?.user.role}
      </div>
    </div>
  );
}
