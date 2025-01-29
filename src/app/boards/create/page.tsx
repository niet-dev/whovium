import { redirect } from "next/navigation";

import { getCurrentSession } from "@/lib/session";
import BoardForm from "@/components/BoardForm";

export default async function Page() {
  const { user } = await getCurrentSession();
  if (user === null) {
    return redirect("/login");
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl">Create a new board</h1>
      <BoardForm />
    </div>
  );
}
