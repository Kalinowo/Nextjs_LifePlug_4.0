import HistoryContainer from "@/components/history/HistoryContainer";
import { auth } from "@/auth";

export default async function HistoryPage() {
  const session = await auth();

  return (
    <div className="relative w-full px-5">
      <div className="text-gray-300 text-2xl mb-1">觀看紀錄：</div>
      <HistoryContainer session={session} />
    </div>
  );
}
