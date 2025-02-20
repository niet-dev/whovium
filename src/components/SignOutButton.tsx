import { signout } from "@/lib/actions";

import { Button } from "./ui/button";

export default function SignOutButton() {
  return (
    <form action={signout}>
      <Button variant="ghost" className="w-full">
        Sign out
      </Button>
    </form>
  );
}
