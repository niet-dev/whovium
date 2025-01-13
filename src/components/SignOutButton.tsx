import { redirect } from "next/navigation";

import {
  deleteSessionTokenCookie,
  getCurrentSession,
  invalidateSession,
} from "@/lib/session";

import { Button } from "./ui/button";

export default async function SignOutButton() {
  return (
    <form action={signout}>
      <Button variant="outline">Sign out</Button>
    </form>
  );
}

async function signout(): Promise<ActionResult> {
  "use server";
  const { session } = await getCurrentSession();
  if (!session) {
    return { error: "Unauthorized" };
  }

  await invalidateSession(session.id);
  await deleteSessionTokenCookie();
  return redirect("/login");
}

interface ActionResult {
  error: string | null;
}
