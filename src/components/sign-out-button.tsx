import { signout } from "@/lib/actions";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  return (
    <Button variant="ghost" className="w-full" onClick={signout}>
      Sign out
    </Button>
  );
}
