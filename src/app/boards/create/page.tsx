import { redirect } from "next/navigation";

import { getCurrentSession } from "@/lib/session";
import SignOutButton from "@/components/SignOutButton";

export default async function Page() {
  const { user } = await getCurrentSession();
  if (user === null) {
    return redirect("/login");
  }
  return (
    <>
      <h1>Hi, {user.username}!</h1>
      <SignOutButton />
    </>
  );
}
