import { redirect } from "next/navigation";

import { getCurrentSession } from "@/lib/session";
import BoardForm from "@/components/boards/create/board-form";

export default async function Page() {
  const { user } = await getCurrentSession();
  if (user === null) {
    return redirect("/login");
  }

  return (
    <div className="container mx-auto">
      <BoardForm userId={user.id} />
    </div>
  );
}
